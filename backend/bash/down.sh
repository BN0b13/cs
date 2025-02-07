#!/bin/bash

source ./.env

echo Spinning down database for site: $SITE

docker-compose -f ./docker-compose.yml -p $NAME down