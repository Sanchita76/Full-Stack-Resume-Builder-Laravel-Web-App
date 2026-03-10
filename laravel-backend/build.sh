#!/usr/bin/env bash
echo "Running composer install..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

echo "Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear

echo "Caching config..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Running migrations..."
php artisan migrate --force

echo "Creating storage symlink..."
php artisan storage:link