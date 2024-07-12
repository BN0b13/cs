#! /bin/bash

URL=admin.$1

# NGINX sites-available set-up
echo  Setting up NGINX sites-available files for $URL

cd /etc/nginx/sites-available

echo "server {
    root ~/cs/admin/build;

    server_name $URL;
    location / {
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/$URL/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/$URL/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
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

sudo certbot --nginx --domain $URL

cd ~/cs/pi