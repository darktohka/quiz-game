FROM oven/bun:alpine AS build

WORKDIR /srv
COPY . /srv/

RUN sed -Ei 's/^\s+"frontend".+$//' package.json && bun install --no-cache && cd /srv/backend && bun build --target=bun --outfile=main.js --production src/main.ts && rm -rf /srv/node_modules

FROM oven/bun:alpine AS production

WORKDIR /srv
ENV NODE_ENV=production

RUN apk add jpegoptim oxipng && rm -rf /var/cache/apk
COPY --from=build /srv/backend/main.js /srv/main.js

ENTRYPOINT ["bun", "run", "main.js"]