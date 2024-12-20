FROM node:16 AS build

WORKDIR /usr/bookstore/client

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install 
COPY ./ ./

CMD ["npm", "start"]