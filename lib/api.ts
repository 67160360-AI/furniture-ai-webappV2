import 'server-only'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { HttpError } from '@/lib/session'

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status })
}

export function handleApiError(error: unknown, context: string) {
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'ข้อมูลไม่ถูกต้อง', issues: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) },
      { status: 400 },
    )
  }
  console.error(`[api] ${context} failed:`, error instanceof Error ? error.message : error)
  return NextResponse.json({ error: 'เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่อีกครั้ง' }, { status: 500 })
}

function hostOf(value: string | undefined | null) {
  if (!value) return null
  try {
    return new URL(value.includes('://') ? value : `https://${value}`).host
  } catch {
    return null
  }
}

/**
 * CSRF defence for cookie-authenticated mutations: the request Origin must be this app.
 * Browsers always send Origin on cross-site and same-site POST/PATCH/DELETE fetches.
 */
export function assertSameOrigin(request: Request) {
  const origin = hostOf(request.headers.get('origin'))
  const allowed = new Set(
    [
      request.headers.get('x-forwarded-host'),
      request.headers.get('host'),
      process.env.VERCEL_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      process.env.BETTER_AUTH_URL,
      ...(process.env.NODE_ENV === 'development'
        ? [process.env.V0_RUNTIME_URL, process.env.V0_DEV_APP_URL, process.env.V0_BUILD_URL, process.env.V0_SANDBOX_URL]
        : []),
    ]
      .map(hostOf)
      .filter(Boolean),
  )
  if (!origin || !allowed.has(origin)) throw new HttpError(403, 'คำขอไม่ได้มาจากเว็บไซต์นี้')
}

/** Fixed-window limiter stored in Postgres so it works across serverless instances. */
export async function enforceRateLimit(key: string, limit: number, windowSeconds: number) {
  const result = await db.execute<{ count: number }>(sql`
    INSERT INTO api_rate_limits (key, window_start, count)
    VALUES (${key}, now(), 1)
    ON CONFLICT (key) DO UPDATE SET
      count = CASE WHEN api_rate_limits.window_start < now() - make_interval(secs => ${windowSeconds})
                   THEN 1 ELSE api_rate_limits.count + 1 END,
      window_start = CASE WHEN api_rate_limits.window_start < now() - make_interval(secs => ${windowSeconds})
                   THEN now() ELSE api_rate_limits.window_start END
    RETURNING count
  `)
  const count = Number(result.rows[0]?.count ?? 0)
  if (count > limit) throw new HttpError(429, 'มีการเรียกใช้งานถี่เกินไป กรุณารอสักครู่แล้วลองใหม่')
}
