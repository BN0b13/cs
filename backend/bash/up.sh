#!/bin/bash

source ./.env

echo Spinning up database for site: $SITE

docker-compose -f ./docker-compose.yml -p $NAME up -d