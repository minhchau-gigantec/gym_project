FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 
COPY src ./

EXPOSE 8006
CMD ["npm", "run", "start:dev"]