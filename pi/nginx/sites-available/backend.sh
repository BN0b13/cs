#! /bin/bash

URL=api.$1

# NGINX sites-available set-up
echo  Setting up NGINX sites-available files for $URL

cd /etc/nginx/sites-available

echo "upstream $URL {
server 127.0.0.1:8050;
}
server {
server_name $URL;
    location / {
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://$URL/;
        proxy_redirect off;
    }
}

server {
    if (\$host = $URL) {
        return 301 https://\$host\$request_uri;
    }

    server_name $URL;

    listen 80;

    return 301 https://\$host\$request_uri;
}" > $URL

sudo ln -s /etc/nginx/sites-available/$URL /etc/nginx/sites-enabled/$URL

cd ~/cs/pi