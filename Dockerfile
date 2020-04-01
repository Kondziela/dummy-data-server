FROM node:10
USER root
WORKDIR /home/node
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]