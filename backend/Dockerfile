FROM node:16 AS build

WORKDIR /usr/bookstore/server

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

ENV MONGO_URI=mongodb+srv://goyal-Dushi:Mongo@123$@learning.ic9hwwy.mongodb.net/?retryWrites=true&w=majority&appName=Learning

CMD ["npm", "start"]