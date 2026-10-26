// Creates or promotes the initial administrator from ADMIN_EMAIL / ADMIN_PASSWORD.
// Usage: node --env-file-if-exists=.env.development.local scripts/create-admin.mjs
import { randomUUID } from 'node:crypto'
import pg from 'pg'
import { hashPassword } from 'better-auth/crypto'

const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('DATABASE_URL, ADMIN_EMAIL and ADMIN_PASSWORD must be set')
  process.exit(1)
}
if (ADMIN_PASSWORD.length < 10) {
  console.error('ADMIN_PASSWORD must be at least 10 characters')
  process.exit(1)
}

const email = ADMIN_EMAIL.trim().toLowerCase()
const client = new pg.Client({ connectionString: DATABASE_URL })
await client.connect()
try {
  await client.query('BEGIN')
  const existing = await client.query('SELECT id FROM "user" WHERE email = $1', [email])
  let userId = existing.rows[0]?.id
  if (!userId) {
    userId = randomUUID()
    await client.query(
      `INSERT INTO "user" (id, name, email, "emailVerified", role) VALUES ($1, 'Administrator', $2, true, 'admin')`,
      [userId, email],
    )
  } else {
    await client.query(`UPDATE "user" SET role = 'admin', "updatedAt" = now() WHERE id = $1`, [userId])
  }
  const hash = await hashPassword(ADMIN_PASSWORD)
  const credential = await client.query(
    `SELECT id FROM account WHERE "userId" = $1 AND "providerId" = 'credential'`,
    [userId],
  )
  if (credential.rows[0]) {
    await client.query(`UPDATE account SET password = $1, "updatedAt" = now() WHERE id = $2`, [
      hash,
      credential.rows[0].id,
    ])
  } else {
    await client.query(
      `INSERT INTO account (id, "accountId", "providerId", "userId", password) VALUES ($1, $2, 'credential', $2, $3)`,
      [randomUUID(), userId, hash],
    )
  }
  // Revoke existing sessions so the new password takes effect everywhere.
  await client.query('DELETE FROM session WHERE "userId" = $1', [userId])
  await client.query('COMMIT')
  console.log(`Administrator ready: ${email}`)
} catch (error) {
  await client.query('ROLLBACK')
  console.error('Failed to create admin:', error.message)
  process.exitCode = 1
} finally {
  await client.end()
}
