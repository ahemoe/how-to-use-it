FROM node:11-stretch

RUN mkdir -p /home/node/static/public /home/node/apps/frontEnd /home/node/node_modules
COPY . /home/node/configuration
RUN chown -R node:node /home/node

USER node

WORKDIR /home/node
RUN ln -s /home/node/configuration/package.json && \
    ln -s /home/node/configuration/package-lock.json
