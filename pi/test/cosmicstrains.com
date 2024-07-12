server {
        root ~/cs/frontend/build;

        server_name cosmicstrains.com www.cosmicstrains.com;
        location / {
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/cosmicstrains.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/cosmicstrains.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.cosmicstrains.com) {
        return 301 https://$host$request_uri;
    }

    if ($host = cosmicstrains.com) {
        return 301 https://$host$request_uri;
    }

    server_name cosmicstrains.com www.cosmicstrains.com;

    listen 80;

    return 301 https://$host$request_uri;
}
