FROM node:argon

# Create app directory
RUN mkdir /code
WORKDIR /code

# Install app dependencies
ADD . /code/
RUN npm install