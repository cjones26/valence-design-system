// Fails CI if any component is marked "done" on one platform without the
// other — enforces component availability and Storybook state parity.
// Shared props remain enforced by @valence/types and platform tests.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const registry = JSON.parse(readFileSync(path.join(rootDir, 'parity-registry.json'), 'utf8'));

const INDEX_FILE = {
  react: path.join(rootDir, 'packages/react/src/index.ts'),
  reactNative: path.join(rootDir, 'packages/react-native/src/index.ts'),
};
const indexSource = Object.fromEntries(
  Object.entries(INDEX_FILE).map(([platform, file]) => [platform, readFileSync(file, 'utf8')]),
);

function isExported(platform, name) {
  return new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from`).test(indexSource[platform]);
}

// Value exports only (skips `export type { ... }`) — catches a component
// that's exported but was never added to the registry at all, which the
// registry-driven checks below can't see since they only look at names the
// registry already knows about.
const NON_COMPONENT_EXPORTS = new Set([
  'ThemeProvider',
  'useTheme',
  'useValenceFonts',
  'TYPOGRAPHY_VARIANTS',
]);
function getExportedNames(source) {
  const names = new Set();
  const regex = /export\s+(type\s+)?\{([^}]*)\}\s*from/g;
  for (const match of source.matchAll(regex)) {
    if (match[1]) {
      continue;
    }
    for (const raw of match[2].split(',')) {
      const name = raw.trim();
      if (name && !NON_COMPONENT_EXPORTS.has(name)) {
        names.add(name);
      }
    }
  }

  return names;
}

function findFile(directory, fileName) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const match = findFile(entryPath, fileName);
      if (match) {
        return match;
      }
    } else if (entry.name === fileName) {
      return entryPath;
    }
  }
}

function getStoryNames(file) {
  if (!file) {
    return new Set();
  }

  return new Set(
    [...readFileSync(file, 'utf8').matchAll(/export const (\w+)/g)].map((match) => match[1]),
  );
}

const VALID_STATUS = new Set(['done', 'pending']);
const failures = [];

for (const [platform, source] of Object.entries(indexSource)) {
  for (const name of getExportedNames(source)) {
    if (!registry.components[name]) {
      failures.push(
        `${name}: exported from ${platform}'s index.ts but has no parity-registry.json entry`,
      );
    }
  }
}

for (const [name, platforms] of Object.entries(registry.components)) {
  for (const platform of ['react', 'reactNative']) {
    if (!VALID_STATUS.has(platforms[platform])) {
      failures.push(`${name}: invalid or missing status for "${platform}"`);
    }
    if (platforms[platform] === 'done' && !isExported(platform, name)) {
      failures.push(
        `${name}: registry says "done" on ${platform}, but it isn't exported from ${platform}'s index.ts`,
      );
    }
  }
  if (platforms.react === 'done' && platforms.reactNative !== 'done') {
    failures.push(
      `${name}: released on react but not reactNative (status: ${platforms.reactNative})`,
    );
  }
  if (platforms.reactNative === 'done' && platforms.react !== 'done') {
    failures.push(`${name}: released on reactNative but not react (status: ${platforms.react})`);
  }
  if (platforms.react === 'done' && platforms.reactNative === 'done') {
    if (!findFile(path.join(rootDir, 'packages/react/src'), `${name}.test.tsx`)) {
      failures.push(`${name}: done on react but has no platform test`);
    }
    if (!findFile(path.join(rootDir, 'packages/react-native/src'), `${name}.test.tsx`)) {
      failures.push(`${name}: done on reactNative but has no platform test`);
    }
    const webStories = getStoryNames(
      findFile(path.join(rootDir, 'packages/react/src'), `${name}.stories.tsx`),
    );
    const nativeStories = getStoryNames(
      findFile(
        path.join(rootDir, 'apps/native-storybook/.rnstorybook/stories'),
        `${name}.stories.tsx`,
      ),
    );
    for (const story of new Set([...webStories, ...nativeStories])) {
      if (!webStories.has(story)) {
        failures.push(`${name}: "${story}" story exists on native but not web`);
      }
      if (!nativeStories.has(story)) {
        failures.push(`${name}: "${story}" story exists on web but not native`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Parity check failed:\n' + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}

console.log(`Parity check passed for ${Object.keys(registry.components).length} components.`);
