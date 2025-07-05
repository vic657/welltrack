#!/bin/sh

echo "🔁 Running migrations..."
php artisan migrate --force

echo "🚀 Starting Laravel server..."
php -S 0.0.0.0:${PORT} -t public

