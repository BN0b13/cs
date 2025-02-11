#! /bin/bash

URL=$1

# NGINX sites-available set-up
echo  Setting up NGINX sites-available files for $URL

cd /etc/nginx/sites-available

echo "server {
        listen 127.0.0.1:4500;
        root /var/www/frontend/build;

        server_name $URL www.$URL;
        location / {
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}" > $URL

sudo ln -s /etc/nginx/sites-available/$URL /etc/nginx/sites-enabled/$URL

cd ~/cs/pi