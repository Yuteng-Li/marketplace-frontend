# Build using node as base image
FROM node AS build
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN pwd
RUN ls -a
RUN npm install
RUN npm run build


# Pack
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/
# # Test to see current directory
# RUN pwd
# RUN ls -a
# COPY */nginx.conf /etc/nginx/conf*/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
