FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .  .

RUN  nest build

CMD [ "node", "dist/main" ]

EXPOSE 5000