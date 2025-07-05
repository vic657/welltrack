# Dockerfile
FROM php:8.2-cli

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpq-dev \
    libonig-dev libxml2-dev libpng-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

RUN composer install --no-dev --optimize-autoloader

COPY start.sh /start.sh
RUN chmod +x /start.sh

ENV PORT=8080
EXPOSE ${PORT}


ENTRYPOINT ["/start.sh"]
