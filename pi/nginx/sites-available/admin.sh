#! /bin/bash

URL=admin.$1

# NGINX sites-available set-up
echo  Setting up NGINX sites-available files for $URL

cd /etc/nginx/sites-available

echo "server {
    root ~/cs/admin/build;

    server_name admin.cosmicstrains.com;
    location / {
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}

server {
    if ($host = admin.cosmicstrains.com) {
        return 301 https://$host$request_uri;
    }

    server_name admin.cosmicstrains.com;

    listen 80;

    return 301 https://$host$request_uri;
}" > $URL

sudo ln -s /etc/nginx/sites-available/$URL /etc/nginx/sites-enabled/$URL

cd ~/cs/pi