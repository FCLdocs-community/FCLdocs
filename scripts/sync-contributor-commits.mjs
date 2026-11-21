import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'FCLdocs-community/FCLdocs';
const LIMIT = 8;
const MAX_PAGES = 10;
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(SCRIPT_DIR, '..', 'static', 'data', 'contributor-commits.json');

async function github(pathname) {
  const res = await fetch(`https://api.github.com${pathname}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'FCLdocs-contributor-sync',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const remaining = res.headers.get('x-ratelimit-remaining');
    const reset = res.headers.get('x-ratelimit-reset');
    const details = remaining ? ` (remaining ${remaining}, reset ${reset})` : '';
    throw new Error(`GitHub API ${res.status}${details}`);
  }

  return res.json();
}

async function main() {
  const contributors = {};

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const commits = await github(`/repos/${REPO}/commits?per_page=100&page=${page}`);
    if (!Array.isArray(commits) || commits.length === 0) break;

    for (const commit of commits) {
      const login = commit.author?.login;
      if (!login) continue;

      const list = contributors[login] || (contributors[login] = []);
      if (list.length >= LIMIT) continue;

      list.push({
        sha: commit.sha,
        message: (commit.commit?.message || '').split('\n')[0],
        date: commit.commit?.author?.date || commit.commit?.committer?.date || '',
      });
    }

    if (commits.length < 100) break;
  }

  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(
    OUTPUT,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        repo: REPO,
        limit: LIMIT,
        contributors,
      },
      null,
      2
    )}\n`,
    'utf8'
  );

  const total = Object.values(contributors).reduce((sum, list) => sum + list.length, 0);
  console.log(
    `Synced ${total} commits for ${Object.keys(contributors).length} contributors -> ${path.relative(
      process.cwd(),
      OUTPUT
    )}`
  );
}

main().catch(async (error) => {
  console.warn(`Contributor commit sync failed: ${error.message}`);
  try {
    await readFile(OUTPUT, 'utf8');
    console.warn('Keeping the existing snapshot.');
    process.exitCode = 0;
  } catch {
    process.exitCode = 1;
  }
});
