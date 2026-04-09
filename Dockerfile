# ── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
# Use npm install with --legacy-peer-deps to bypass Sanity v6/v7 peer dep
# conflict that breaks the strict `npm ci` lockfile check.
RUN npm install --legacy-peer-deps --no-audit --no-fund

# ── Stage 2: Build the Next.js app ───────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# .env.production is copied here — Next.js reads it at build time to
# inline NEXT_PUBLIC_* variables into the client bundle.
# No secrets are in .env.production (those live in GCP Secret Manager).

RUN npm run build

# ── Stage 3: Minimal production image ────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only the standalone output (no node_modules, no source)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

USER nextjs

# Cloud Run injects PORT=8080 at runtime; Next.js standalone respects PORT.
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
