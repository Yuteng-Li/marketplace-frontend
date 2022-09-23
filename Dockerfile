# Build using node as base image
FROM node AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY . ./
RUN npm install
RUN npm run build

# Run
FROM nginx:1.22.0-alpine
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
