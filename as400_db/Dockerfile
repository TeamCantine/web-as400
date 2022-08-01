
FROM node:16.14

WORKDIR /app

COPY package.json .

RUN apt-get update -y

RUN apt-get install default-jdk -y

RUN npm install

COPY . .

EXPOSE 3300

CMD [ "npm", "start" ]

#docker run -it --rm -d -v "C:\\Users\\tommal\\Documents\\web-as400\\as400_db:/app" -v /app/node_modules -p 330:3300 backend

# sudo docker build -t backend .
# sudo docker run --name backend -it --rm -v "/home/tommal/Scrivania/web-as400/as400_db:/app" -v /app/node_modules -p 3300:3300 backend

