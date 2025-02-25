#!/bin/bash

cd ~

mkdir -p backups

cd backups

find . -mtime +30 -type f -delete

docker exec -t $NAME pg_dumpall -c -U admin > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql

echo Postgresql DB backup completed