
FROM node:16.14

WORKDIR /app

COPY package.json .

RUN npm inatall

COPY . .

EXPOSE 3300

CMD [ "node", "server.js" ]

