ARG PORT=3000
ARG NODE_TAG=16.14-alpine

FROM node:${NODE_TAG} AS base
ARG PORT
EXPOSE ${PORT}
RUN apk add --no-cache tini
ENTRYPOINT ["tini", "--"]

FROM node:${NODE_TAG} AS dependecies
WORKDIR /app
COPY package.json yarn.lock* ./
RUN rm -rf node_modules && yarn install --frozen-lockfile --ignore-script --production

FROM dependecies AS build
RUN yarn install --frozen-lockfile --ignore-script
COPY . .
RUN yarn build

FROM base
RUN mkdir ./app && chown -R node:node ./app
WORKDIR /app
USER node
COPY --from=dependecies --chown=node:node /app/node_modules/ ./node_modules
COPY --from=build --chown=node:node /app/dist .
COPY --from=build --chown=node:node /app/healthcheck.js .
HEALTHCHECK --interval=80s --timeout=60s --start-period=5s --retries=3 \
  CMD node ./healthcheck.js
CMD ["node", "main.js"]
