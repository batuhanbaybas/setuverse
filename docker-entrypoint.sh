#!/bin/sh
set -e

(
  sleep "${DB_MIGRATE_DELAY_SECONDS:-5}"
  echo "Running database migrations..."
  yarn db:deploy
) &

echo "Starting application..."
exec yarn start
