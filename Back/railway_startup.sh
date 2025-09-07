#!/bin/bash
# Script to run Django migrations and create admin user on Railway deployment

echo "Applying database migrations..."
python manage.py migrate

echo "Creating admin user if ADMIN_PASSWORD is set..."
python manage.py create_admin_user

echo "Starting Gunicorn server..."
exec gunicorn egy_sun_tours.wsgi --log-file -
