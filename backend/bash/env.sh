#!/bin/bash

ENVIRONMENT="prod"

if [[ $1 == "dev" ]];
    then ENVIRONMENT=$1
fi

if [ -f "./.env" ]; 
    then echo "File exists"
    rm ./.env
fi

cp ./.env.$ENVIRONMENT ./.env

echo Set up .env for $ENVIRONMENT completed

source ./.env

echo SITE: $SITE