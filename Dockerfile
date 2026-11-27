FROM node:22-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL=https://api.mptazalyk.kg/api
ARG NEXT_PUBLIC_SITE_URL=https://mptazalyk.kg
ARG NEXT_PUBLIC_API_TIMEOUT=30000
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_TIMEOUT=$NEXT_PUBLIC_API_TIMEOUT \
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
RUN test -n "$NEXT_PUBLIC_RECAPTCHA_SITE_KEY" || (echo "Нужен --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY" && exit 1)

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]