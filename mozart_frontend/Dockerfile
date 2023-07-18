FROM node:alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /app
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx","-g","daemon off;"]