FROM node:16 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY .env ./

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
