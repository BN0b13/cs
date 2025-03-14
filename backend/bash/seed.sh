#!/bin/bash

source ./.env

echo Seeding database for site: $SITE

npx sequelize-cli db:seed:all --seeders-path ./seeders/$ENV
