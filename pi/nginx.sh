#! /bin/bash

echo $1
if [[ $1 != *"."* ]];
    then echo Please enter in a valid url as an argument.
    exit
fi

if [[ $1 = "www"* ]];
    then echo Please remove www from the url.
    exit
fi

# NGINX sites-available set-up
echo Setting up frontend, admin and backend sites-available config files for NGINX

mkdir config
cd config

echo "server {
        root /var/www/frontend/build;

        server_name $1 www.$1;
        location / {
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/$1/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/$1/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if (\$host = www.$1) {
        return 301 https://\$host\$request_uri;
    }

    if (\$host = $1) {
        return 301 https://\$host\$request_uri;
    }

    server_name $1 www.$1;

    listen 80;

    return 301 https://\$host\$request_uri;
}" > $1

echo "server {
root /var/www/admin/build;

server_name admin.$1;
location / {
index index.html;
try_files \$uri \$uri/ /index.html;
}



    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/$1/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/$1/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
if (\$host = admin.$1) {
return 301 https://\$host\$request_uri;
}

server_name admin.$1;

listen 80;

return 301 https://\$host\$request_uri;


}" > admin.$1

echo "upstream api.$1 {
server 127.0.0.1:8050;
}
server {
server_name api.$1;
location / {
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header Host \$http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://api.$1/;
    proxy_redirect off;
}

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/$1/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/$1/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if (\$host = api.$1) {
        return 301 https://\$host\$request_uri;
    }


server_name api.$1;

listen 80;

return 301 https://\$host\$request_uri;


}

server {
    if (\$host = api.$1) {
        return 301 https://\$host\$request_uri;
    }
}" > api.$1