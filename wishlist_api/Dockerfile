FROM oven/bun:latest

WORKDIR /wishlist_api

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

ENV PORT=2000
EXPOSE 2000

CMD ["bun", "start"]