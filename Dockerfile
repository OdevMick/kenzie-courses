FROM node:14.18.2
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . . 
ENV NODE_PATH=./src