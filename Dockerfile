FROM node:18-alpine as builder

COPY . /app

WORKDIR /app
RUN npm install -g pnpm && pnpm install && pnpm run build

FROM node:18-alpine

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml

WORKDIR /app
RUN npm install -g pnpm && pnpm install --prod

ENV REDIS_URL=

CMD ["node", "dist/index.js"]
