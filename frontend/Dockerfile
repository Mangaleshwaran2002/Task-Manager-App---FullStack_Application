FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# No need for second Nginx stage since we’ll use a shared Nginx container
