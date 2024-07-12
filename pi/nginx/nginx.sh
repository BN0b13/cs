#! /bin/bash

echo "NGINX Bash script setting up url $1"

# NGINX

sudo apt remove apache2
sudo apt install nginx -y
sudo systemctl start nginx

# # Certbot

sudo apt install certbot -y

for f in ./nginx/sites-available/*.sh; do
    bash "$f" $1
done