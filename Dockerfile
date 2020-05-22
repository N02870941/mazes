FROM nginx

ADD _site/ /usr/share/nginx/html/mazes

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
