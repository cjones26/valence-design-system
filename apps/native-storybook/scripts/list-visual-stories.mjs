import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { storyNameFromExport, toId } from 'storybook/internal/csf';

const storiesDirectory = path.resolve('.rnstorybook/stories');
const stories = [];

for (const fileName of readdirSync(storiesDirectory).sort()) {
  if (!fileName.endsWith('.stories.tsx')) {
    continue;
  }

  const source = readFileSync(path.join(storiesDirectory, fileName), 'utf8');
  const title = source.match(/title:\s*['"]([^'"]+)['"]/)?.[1];

  if (!title) {
    throw new Error(`${fileName} has no static Storybook title.`);
  }

  for (const match of source.matchAll(/export const (\w+)/g)) {
    stories.push(toId(title, storyNameFromExport(match[1])));
  }
}

process.stdout.write(`${stories.join('\n')}\n`);
