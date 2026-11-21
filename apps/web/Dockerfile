# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Install deps first for layer caching
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
# This image builds only the web app; copy its source
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---- runtime ----
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV DATA_DIR=/data

# Non-root user
RUN groupadd -r gus && useradd -r -g gus -d /app gus \
	&& mkdir -p /data && chown -R gus:gus /data /app

COPY --from=build --chown=gus:gus /app/build ./build
COPY --from=build --chown=gus:gus /app/package.json ./package.json

# adapter-node needs production node_modules for runtime deps
COPY --from=build --chown=gus:gus /app/node_modules ./node_modules

USER gus
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "build"]