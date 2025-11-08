FROM node:22.21.1-alpine

RUN npm i -g maildev@2.2.1

CMD maildev
