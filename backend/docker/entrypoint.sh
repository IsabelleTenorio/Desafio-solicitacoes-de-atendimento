#!/bin/bash
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

php artisan key:generate --force

echo "Aguardando o PostgreSQL aceitar conexões..."
until php artisan db:show > /dev/null 2>&1; do
  sleep 2
done
echo "PostgreSQL disponível."

php artisan migrate --force
php artisan db:seed --force

php artisan serve --host=0.0.0.0 --port=8000