#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "PostgreSQL is up - running migrations..."

# Run database migrations
python3 manage.py migrate --noinput

# Collect static files if needed (optional)
python3 manage.py collectstatic --noinput

# Check if data.json exists, and load data if it does
if [ -f "/usr/app/data.json" ]; then
    echo "Loading initial data from data.json..."
    python3 manage.py loaddata data.json
else
    echo "data.json not found, skipping data load."
fi

echo "Starting Django application..."
exec python3 manage.py runserver 0.0.0.0:8000

