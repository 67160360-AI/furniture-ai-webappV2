// Usage: node --env-file-if-exists=.env.development.local scripts/migrate.mjs [file.sql ...]
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import pg from 'pg'

const files = process.argv.slice(2)
if (files.length === 0) files.push('scripts/001-schema.sql')

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()
try {
  for (const file of files) {
    const sql = await readFile(path.resolve(file), 'utf8')
    await client.query(sql)
    console.log(`Applied ${file}`)
  }
} finally {
  await client.end()
}
