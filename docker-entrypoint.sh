#!/bin/sh
set -eu

echo "Applying database schema and seed data..."
node scripts/migrate.mjs scripts/001-schema.sql scripts/002-seed.sql

exec pnpm start
