FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]