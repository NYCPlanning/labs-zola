############################
# ---- Build stage ----
############################
FROM node:18-slim AS build

WORKDIR /app

# --- install git & clean up ---
RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ARG BUILDPLATFORM
RUN if [ "$BUILDPLATFORM" = "linux/amd64" ]; then \
      echo "nameserver 8.8.8.8" > /etc/resolv.conf ; \
    fi

# Make Yarn more patient and single‑threaded (helps under QEMU)
ENV YARN_NETWORK_TIMEOUT=600000 \
    YARN_NETWORK_CONCURRENCY=1 \
    YARN_RETRY_MAX=5

# Disable Husky hooks & progress bar noise
ENV HUSKY=0 \
    YARN_ENABLE_PROGRESS_BARS=0

# Copy lockfiles, install deps, build …
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn ember build --environment=production \
 && echo "Build output contents:" && ls -al dist

############################
# ---- Runtime stage ----
############################
FROM nginx:alpine 

# 6. Remove default nginx website and copy Ember dist
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ /usr/share/nginx/html/

# 2. Copy our SPA‑aware nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 8. Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
