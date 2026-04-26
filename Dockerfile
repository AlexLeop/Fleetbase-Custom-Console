# ══════════════════════════════════════════════════════════════════════════════
# Dockerfile para Console Fleetbase com Financeiro Engine
# Multi-stage: Build do Ember + Serve com Nginx
# ══════════════════════════════════════════════════════════════════════════════

# ── STAGE 1: Build ──────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

RUN apk add --no-cache git python3 make g++ && \
    npm install -g pnpm@9.5.0

WORKDIR /build
RUN git clone --depth 1 https://github.com/fleetbase/fleetbase.git .

COPY . /build/packages/financeiro-engine/

WORKDIR /build/console

RUN node -e " \
    const fs = require('fs'); \
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8')); \
    pkg.dependencies['@fleetbase/financeiro-engine'] = 'file:../packages/financeiro-engine'; \
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4)); \
    console.log('Added @fleetbase/financeiro-engine to dependencies'); \
"

RUN pnpm install --no-frozen-lockfile 2>&1 | tail -20

RUN echo "=== Verifying engine installation ===" && \
    ls node_modules/@fleetbase/financeiro-engine/package.json && \
    echo "=== Engine found ==="

RUN npx ember build --environment=production 2>&1 | tail -30

RUN echo "=== Checking engines-dist ===" && \
    ls -la dist/engines-dist/ 2>/dev/null || echo "No engines-dist" && \
    ls -la dist/engines-dist/@fleetbase/ 2>/dev/null || echo "No @fleetbase in engines-dist"

# ── STAGE 2: Serve ──────────────────────────────────────────────────────────
FROM nginx:1.25-alpine

COPY --from=builder /build/console/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
CMD ["sh", "-c", "echo '{\"API_HOST\":\"\",\"SOCKETCLUSTER_HOST\":\"\",\"SOCKETCLUSTER_PORT\":\"4200\",\"SOCKETCLUSTER_PATH\":\"/socketcluster/\"}' > /usr/share/nginx/html/fleetbase.config.json && nginx -g 'daemon off;'"]
