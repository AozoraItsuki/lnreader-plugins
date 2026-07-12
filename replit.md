# LNReader Plugins

Community-driven plugin repository for [LNReader](https://github.com/LNReader/lnreader). Hosts plugins and provides a web-based playground to test them interactively.

## Stack

- **Runtime:** Node.js 22
- **Frontend:** React 18 + Vite 6 + Tailwind CSS v4
- **Language:** TypeScript

## Running the Dev Server

```bash
npm run dev:start
```

This generates multi-source plugins, builds the plugin index, and starts Vite on **port 3000**.

The workflow **Dev Server** runs this automatically.

## Replit-specific fixes applied

- Removed `lightningcss-android-arm64` (Android/arm64-only package, incompatible with Linux/x64)
- Upgraded Node.js module to v22 (required by project; `zstdDecompressSync` added in v22)
- `vite.config.ts`: set `host: '0.0.0.0'`, `allowedHosts: true`, `open: false` for Replit preview
- `src/main.tsx`: replaced hardcoded `http://localhost:3000/` with `window.location.origin` in fetch override
- `proxy.ts`: set `CLIENT_HOST` to `'*'` so CORS headers don't block Replit's proxied origin
- `plugins/indonesian/wtrlab.ts`: fixed `const` → `let` reassignment compile error

## Key Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev:start` | Start interactive dev server |
| `npm run build:full` | Compile plugins + build manifest |
| `npm run build:icons` | Full build including icon download |
| `npm run serve:dev` | Build + serve compiled plugins for mobile testing |

## User preferences

<!-- Add user preferences here -->
