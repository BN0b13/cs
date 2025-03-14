#!/bin/bash

source ./.env

echo Destroying database for site: $SITE

rm -r public

docker-compose -f ./docker-compose.yml down