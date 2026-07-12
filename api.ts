/**
 * Plugin REST API middleware for the Vite dev server.
 *
 * Endpoints (all on the same port as the dev UI):
 *   GET  /api/plugins                            – list all plugins
 *   GET  /api/plugin/:id/popular?page=1&latest=false
 *   GET  /api/plugin/:id/search?q=...&page=1
 *   POST /api/plugin/:id/novel    body: { "path": "..." }
 *   POST /api/plugin/:id/chapter  body: { "path": "..." }
 */

import type { ViteDevServer, Connect } from 'vite';
import type { Plugin } from './src/types/plugin';

let cached: Plugin.PluginBase[] | null = null;

async function loadPlugins(server: ViteDevServer): Promise<Plugin.PluginBase[]> {
  if (!cached) {
    // ssrLoadModule runs the module in Node context with Vite's alias resolution.
    // Plugins use native fetch + cheerio — both work fine in Node 22.
    const mod = await server.ssrLoadModule('/plugins/index.ts');
    cached = mod.default as Plugin.PluginBase[];
  }
  return cached;
}

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise(resolve => {
    let data = '';
    req.on('data', (chunk: Buffer) => (data += chunk.toString()));
    req.on('end', () => resolve(data));
  });
}

export function createApiMiddleware(
  server: ViteDevServer,
): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const rawUrl = req.url ?? '/';
    if (!rawUrl.startsWith('/api/')) return next();

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    try {
      const url = new URL(rawUrl, 'http://localhost');
      const allPlugins = await loadPlugins(server);

      // GET /api/plugins
      if (url.pathname === '/api/plugins') {
        res.end(
          JSON.stringify(
            allPlugins.map(p => ({
              id: p.id,
              name: p.name,
              site: p.site,
              version: p.version,
            })),
            null,
            2,
          ),
        );
        return;
      }

      // /api/plugin/:id/:method
      const match = url.pathname.match(/^\/api\/plugin\/([^/]+)\/(\w+)$/);
      if (!match) return next();

      const [, pluginId, method] = match;
      const plugin = allPlugins.find(p => p.id === pluginId);
      if (!plugin) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: `Plugin '${pluginId}' not found` }));
        return;
      }

      const body =
        req.method === 'POST' || req.method === 'PUT'
          ? await readBody(req)
          : '';
      const qs = Object.fromEntries(url.searchParams);
      const args: Record<string, string> = body
        ? { ...qs, ...JSON.parse(body) }
        : qs;

      let result: unknown;

      switch (method) {
        case 'popular':
          result = await plugin.popularNovels(Number(args.page ?? 1), {
            showLatestNovels: args.latest === 'true',
            filters: plugin.filters as never,
          });
          break;

        case 'search':
          result = await plugin.searchNovels(
            args.q ?? '',
            Number(args.page ?? 1),
          );
          break;

        case 'novel':
          if (!args.path) throw new Error("Missing required param: 'path'");
          result = await plugin.parseNovel(args.path);
          break;

        case 'chapter':
          if (!args.path) throw new Error("Missing required param: 'path'");
          result = await plugin.parseChapter(args.path);
          break;

        default:
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              error: `Unknown method '${method}'. Valid: popular | search | novel | chapter`,
            }),
          );
          return;
      }

      res.end(JSON.stringify(result, null, 2));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: message }));
    }
  };
}
