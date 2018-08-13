FROM node:8.7

ADD ./src /app

WORKDIR /app

RUN npm install

EXPOSE 80

CMD node index.js
