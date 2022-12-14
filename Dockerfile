# Use node offical image with alpine
FROM node:14.21-alpine

# EXPOSE PORT OF BRIDGE NETWORK
EXPOSE 3000

# Create the app folder and set it as workdir
WORKDIR /usr/src/app

# Copy the files that contain the project's dependencies
COPY package.json package.json
COPY yarn.lock yarn.lock

# Install all dependencies
RUN apk --update-cache add redis
RUN yarn install

# Copy other files/folders
COPY . .

# Create a command to run the app
CMD [ "sh", "-c", "redis-server --daemonize yes && yarn run dev" ]
