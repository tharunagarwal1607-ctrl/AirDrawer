const fs = require('fs');
const path = require('path');

const OWNER = 'tharunagarwal1607-ctrl';
const REPO = 'AirDrawer';
const BASE_DIR = path.resolve(__dirname);

const SKIP = new Set([
  'node_modules', '.git', 'push-to-github.js', 'package-lock.json', '.DS_Store'
]);

async function getToken() {
  const { execSync } = require('child_process');
  return execSync('gh auth token', { encoding: 'utf8' }).trim();
}

async function apiRequest(token, method, endpoint, body) {
  const url = `https://api.github.com${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, data: json };
}

function getAllFiles(dir, base = '') {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (SKIP.has(item)) continue;
    const fullPath = path.join(dir, item);
    const relPath = base ? `${base}/${item}` : item;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllFiles(fullPath, relPath));
    } else {
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

async function uploadFile(token, fullPath, relPath) {
  const content = fs.readFileSync(fullPath);
  const b64 = content.toString('base64');

  const existing = await apiRequest(token, 'GET', `/repos/${OWNER}/${REPO}/contents/${relPath}`);
  const sha = existing.data?.sha;

  const body = {
    message: `Add ${relPath}`,
    content: b64,
  };
  if (sha) body.sha = sha;

  const res = await apiRequest(token, 'PUT', `/repos/${OWNER}/${REPO}/contents/${relPath}`, body);
  if (res.status === 200 || res.status === 201) {
    console.log(`✅ ${relPath}`);
  } else {
    console.error(`❌ ${relPath} — ${JSON.stringify(res.data?.message)}`);
  }
}

async function main() {
  const token = await getToken();
  console.log(`Uploading files to github.com/${OWNER}/${REPO} ...\n`);
  const files = getAllFiles(BASE_DIR);
  console.log(`Found ${files.length} files to upload\n`);

  for (const file of files) {
    await uploadFile(token, file.fullPath, file.relPath);
    await new Promise(r => setTimeout(r, 200)); // Sleep to prevent rate limit
  }

  console.log('\n🎉 Done! Visit: https://github.com/' + OWNER + '/' + REPO);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
