
# Set up a dev build of the kira website

# This has the platform resources we need for our containers (Node, NPM etc)
FROM node:16-alpine AS builder

RUN true \
  && echo -n node && node --version \
  && echo -n npm && npm --version \
  && true
# To get updated package-lock.json when you have changed packages in package.json:
#  $ ./build
#  $ ../tools/package-lock.sh   # this pulls the newly-built package-lock.json out of the container
# Then add and commit new package-lock.json and package.json
COPY package*.json /kira/

RUN cd /kira && npm --version && npm ci

# Dockerfile COPY semantics are a PITA vis-a-vis directories.  It does
# the unexpected when copying named directories to a target directory,
# so you cannot easily finese things in one line...
COPY e2e /kira/e2e/

# Revisit this set of copied files, e.g. proxy-remote.conf.json
COPY angular.json .eslintrc.json karma.conf.js protractor.conf.js tsconfig*.json tslint.json /kira/

WORKDIR /kira

COPY src /kira/src

# This CMD only works if
# - when appropriate source directories have been mounted under ./src/shared
RUN npm run build
