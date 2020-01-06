FROM node:12.13.0-alpine
MAINTAINER Gilles Perreymond <gperreymond@gmail.com>

# prepare the destination
RUN mkdir -p /home/app
WORKDIR /home/app

# add source files
COPY . /home/app

# root user used in docker:dind during CI, cf https://docs.npmjs.com/misc/config
RUN npm config set unsafe-perm true

# make the install in the container to avoid compilation problems
RUN yarn install --production && \
    yarn autoclean --init && \
    yarn autoclean --force
