FROM nginx

EXPOSE 80

ADD _site/ /usr/share/nginx/html
