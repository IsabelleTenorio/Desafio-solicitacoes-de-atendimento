FROM php:8.3-cli-alpine

RUN apk add --no-cache postgresql-dev $PHPIZE_DEPS bash \
    && docker-php-ext-install pdo pdo_pgsql \
    && apk del $PHPIZE_DEPS

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock* ./

RUN composer install --no-scripts --no-interaction --prefer-dist --no-autoloader || true

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

RUN chmod +x docker/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["docker/entrypoint.sh"]