#!/usr/bin/env node
/**
 * CLI for testing LNReader plugins against the running dev server API.
 *
 * Requires: npm run dev:start (dev server must be running)
 *
 * Usage:
 *   npx tsx scripts/test-plugin.ts plugins
 *   npx tsx scripts/test-plugin.ts <pluginId> popular [--page N] [--latest]
 *   npx tsx scripts/test-plugin.ts <pluginId> search "<query>" [--page N]
 *   npx tsx scripts/test-plugin.ts <pluginId> novel "<path>" [--summary]
 *   npx tsx scripts/test-plugin.ts <pluginId> chapter "<path>"
 *
 * Examples:
 *   npx tsx scripts/test-plugin.ts plugins
 *   npx tsx scripts/test-plugin.ts WTRLAB popular --page 1
 *   npx tsx scripts/test-plugin.ts WTRLAB popular --latest
 *   npx tsx scripts/test-plugin.ts WTRLAB search "magical girl"
 *   npx tsx scripts/test-plugin.ts WTRLAB novel "en/serie-52287/retired-magical-girl" --summary
 *   npx tsx scripts/test-plugin.ts WTRLAB chapter "en/serie-52287/retired-magical-girl/chapter-1"
 *
 * Override the server URL:
 *   API_URL=http://localhost:3000 npx tsx scripts/test-plugin.ts ...
 */

const BASE = (process.env.API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

// ─── argument parsing ───────────────────────────────────────────────────────

function parseArgs(argv: string[]): {
  positional: string[];
  flags: Record<string, string | true>;
} {
  const positional: string[] = [];
  const flags: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

// ─── helpers ────────────────────────────────────────────────────────────────

async function apiFetch(path: string, body?: object): Promise<unknown> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response (${res.status}): ${text.slice(0, 200)}`);
  }
}

function printUsage(): void {
  console.log(`
Plugin Test CLI  —  requires dev server (npm run dev:start)

Usage:
  npx tsx scripts/test-plugin.ts plugins
  npx tsx scripts/test-plugin.ts <id> popular  [--page N] [--latest]
  npx tsx scripts/test-plugin.ts <id> search   "<query>"  [--page N]
  npx tsx scripts/test-plugin.ts <id> novel    "<path>"   [--summary]
  npx tsx scripts/test-plugin.ts <id> chapter  "<path>"

Examples:
  npx tsx scripts/test-plugin.ts plugins
  npx tsx scripts/test-plugin.ts WTRLAB popular --latest
  npx tsx scripts/test-plugin.ts WTRLAB search "magical girl"
  npx tsx scripts/test-plugin.ts WTRLAB novel "en/serie-52287/retired-magical-girl" --summary
  npx tsx scripts/test-plugin.ts WTRLAB chapter "en/serie-52287/retired-magical-girl/chapter-1"

Flags:
  --page N     Page number (default: 1)
  --latest     Show latest novels (popular only)
  --summary    Print condensed novel info instead of full JSON
  `);
}

// ─── main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { positional, flags } = parseArgs(process.argv.slice(2));

  if (positional.length === 0 || positional[0] === 'plugins') {
    const data = await apiFetch('/api/plugins');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (positional[0] === '--help' || positional[0] === 'help') {
    printUsage();
    return;
  }

  const [pluginId, method, value] = positional;

  if (!method) {
    printUsage();
    process.exit(1);
  }

  let data: unknown;

  switch (method) {
    case 'popular': {
      const page = Number(flags.page ?? 1);
      const latest = flags.latest === true || flags.latest === 'true';
      data = await apiFetch(
        `/api/plugin/${pluginId}/popular?page=${page}&latest=${latest}`,
      );
      break;
    }

    case 'search': {
      const page = Number(flags.page ?? 1);
      if (!value) {
        console.error('Error: search requires a query string as second argument');
        process.exit(1);
      }
      data = await apiFetch(
        `/api/plugin/${pluginId}/search?q=${encodeURIComponent(value)}&page=${page}`,
      );
      break;
    }

    case 'novel': {
      if (!value) {
        console.error('Error: novel requires a path as second argument');
        process.exit(1);
      }
      data = await apiFetch(`/api/plugin/${pluginId}/novel`, { path: value });

      if (flags.summary) {
        const n = data as Record<string, unknown>;
        const chapters = Array.isArray(n.chapters) ? n.chapters : [];
        console.log(`Name     : ${n.name ?? 'N/A'}`);
        console.log(`Author   : ${n.author ?? 'N/A'}`);
        console.log(`Status   : ${n.status ?? 'N/A'}`);
        console.log(`Genres   : ${n.genres ?? 'N/A'}`);
        console.log(`Chapters : ${chapters.length}`);
        console.log(`Cover    : ${n.cover ?? 'N/A'}`);
        console.log(
          `Summary  : ${String(n.summary ?? '').replace(/\n/g, ' ').slice(0, 300)}${String(n.summary ?? '').length > 300 ? '…' : ''}`,
        );
        return;
      }
      break;
    }

    case 'chapter': {
      if (!value) {
        console.error('Error: chapter requires a path as second argument');
        process.exit(1);
      }
      data = await apiFetch(`/api/plugin/${pluginId}/chapter`, { path: value });
      break;
    }

    default:
      console.error(
        `Error: unknown method '${method}'. Valid: popular | search | novel | chapter`,
      );
      printUsage();
      process.exit(1);
  }

  console.log(JSON.stringify(data, null, 2));
}

main().catch(err => {
  const msg: string = err instanceof Error ? err.message : String(err);
  if (msg.includes('ECONNREFUSED') || msg.includes('fetch failed')) {
    console.error(
      `\nCould not reach dev server at ${BASE}.\nRun "npm run dev:start" first.\n`,
    );
  } else {
    console.error('Error:', msg);
  }
  process.exit(1);
});
