# First stage: Building the Vue app
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# Second stage: Setting up Nginx to serve the built app
FROM nginx:1.21-alpine

WORKDIR /var/www

COPY --from=0 /app/dist /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]
