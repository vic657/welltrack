#!/bin/sh

echo "🧹 Clearing and caching config..."
php artisan config:clear
php artisan config:cache

echo "🔁 Running migrations..."
php artisan migrate --force

echo "🚀 Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=8000
