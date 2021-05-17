FROM node:lts-alpine as builder

WORKDIR /app
COPY ./package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:lts-alpine

RUN apk add --no-cache bash
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder  /app/dist ./dist
COPY --from=builder  /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
