#!/bin/bash

cd ..

if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

sleep 10

cd /tmp

cat "$(ls -1rt | tail -n1)" | docker exec -i $PG_CONTAINER_NAME psql -U $PG_USERNAME $PG_DATABASE_NAME

#Prod
cd cs/backend

#local
# cd ~/webDev/express/cs-backend

pm2 restart all --time


# copy docker .sql file from local computer to raspberry pi. .sql file lives on Desktop
# sudo scp ~/Desktop/backup.sql bnoble@192.168.5.9:~/backup.sql

# ssh into raspberry pi
# ssh 192.168.5.9

# copy docker .sql file from raspberry pi to docker container
# sudo docker cp ./backup.sql cosmic_strains:/tmp

# ssh into docker from raspberry pi
# sudo docker exec -it cosmic_strains sh

# cd into docker container folder that now has backup.sql
# cd tmp

# reseed database
# psql -U admin -d postgres < backup.sql