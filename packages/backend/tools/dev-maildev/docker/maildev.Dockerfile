FROM node:24.11.0-alpine

RUN npm i -g maildev@2.2.1

CMD maildev
