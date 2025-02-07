#!/bin/bash

source ./.env

echo Destroying database for site: $SITE

rm -r public

mkdir public

cd public

mkdir img video

cd img

mkdir categories icons products themes welcome

cd ..

cd ..

docker-compose -f ./docker-compose.yml -p $NAME down -v --remove-orphans