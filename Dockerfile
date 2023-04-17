FROM node:18.16.0-alpine3.17@sha256:44aaf1ccc80eaed6572a0f2ef7d6b5a2982d54481e4255480041ac92221e2f11 as BUILD
WORKDIR /app
COPY preact/src/ src/
COPY preact/package.json .
COPY preact/yarn.lock .
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM nginx:1.24.0@sha256:f3c37d8a26f7a7d8a547470c58733f270bcccb7e785da17af81ec41576170da8
COPY --from=BUILD /app/build/ /usr/share/nginx/html/

EXPOSE 80
