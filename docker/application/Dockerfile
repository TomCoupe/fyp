# PHP
FROM php:7.3-fpm-buster

# update APT sources
RUN apt-get update

# PHP extensions
RUN apt-get install -y libpq-dev libpng-dev git zip unzip
RUN docker-php-ext-install pdo_mysql gd

# Kafka
RUN apt-get install -y librdkafka-dev
RUN pecl install rdkafka-3.1.3 && docker-php-ext-enable rdkafka

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer