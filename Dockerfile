##############
# Build docs #
##############
FROM jekyll/jekyll as build-docs

ADD ./ /mazes
WORKDIR /mazes/docs
RUN bundle install && bundle exec jekyll build

##############
# Build page #
##############
FROM node:8.7 as build-page

COPY --from=build-docs /mazes /mazes
WORKDIR /mazes/src
RUN npm install

##############
# Build prod #
##############
FROM nginx:1.13.9-alpine

ENV NGINX_DIR /usr/share/nginx/html

COPY --from=build-page /mazes/src/node_modules ${NGINX_DIR}/scripts
COPY --from=build-page /mazes/src/static ${NGINX_DIR}
COPY --from=build-docs /mazes/docs/_site ${NGINX_DIR}/docs

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
