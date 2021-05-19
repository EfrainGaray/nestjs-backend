FROM node:lts-alpine as production
WORKDIR /prod
COPY ./package*.json ./
RUN yarn install --production=true


FROM node:lts-alpine as builder
WORKDIR /build
COPY ./package*.json ./
RUN yarn
COPY . .
RUN yarn build


FROM node:lts-alpine
WORKDIR /app

COPY --from=builder  /build/dist ./dist
COPY --from=production  /prod/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
