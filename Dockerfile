FROM node:8.7 as builder

ADD ./src /src

WORKDIR /src

RUN npm install

FROM nginx:1.13.9-alpine

COPY --from=builder src/node_modules /usr/share/nginx/html/scripts
COPY --from=builder src/static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
