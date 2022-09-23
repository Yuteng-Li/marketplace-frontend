# Build using node as base image
FROM node AS build
WORKDIR /usr/src/app
COPY package.json ./
COPY . ./
RUN npm update
RUN npm install
RUN npm run build

# Run
FROM nginx:stable
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/
COPY */*.conf /etc/nginx/conf*/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
