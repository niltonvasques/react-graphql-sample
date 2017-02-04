FROM node:6.9.5
MAINTAINER Nilton Vasques "nilton.vasques@gmail.com" 

RUN apt-get update && apt-get install python

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install
RUN npm i -g webpack

RUN NODE_ENV=production webpack -p --config webpack.config.js

# Expose the app port
EXPOSE 8000

# Start the app

CMD npm run prod
