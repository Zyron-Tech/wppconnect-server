# -----------------------------
# Stage 1: Base / Build
# -----------------------------
FROM node:22.21.1-alpine AS base

# Set working directory
WORKDIR /usr/src/wpp-server

# Avoid Puppeteer downloading Chromium (we install system Chromium)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install build tools and libraries for sharp + Chromium runtime
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    gcc \
    libc6-compat \
    pkgconfig \
    bash \
    curl \
    git \
    vips-dev \
    fftw-dev \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Copy Yarn config and project lockfiles
COPY .yarnrc.yml package.json yarn.lock ./

# Enable Corepack and prepare Yarn 4.12.0
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Install all dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# Build project
RUN yarn build

# -----------------------------
# Stage 2: Runtime
# -----------------------------
FROM node:22.21.1-alpine AS runtime

WORKDIR /usr/src/wpp-server

# Install runtime dependencies only
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    ca-certificates \
    vips \
    fftw

# Copy built project + node_modules from base
COPY --from=base /usr/src/wpp-server/dist ./dist
COPY --from=base /usr/src/wpp-server/node_modules ./node_modules
COPY --from=base /usr/src/wpp-server/package.json ./package.json

# Set Chromium path for WPPConnect headless mode
ENV CHROMIUM_PATH=/usr/bin/chromium-browser

# Expose WPPConnect port
EXPOSE 21465

# Start server
ENTRYPOINT ["node", "dist/server.js"]
