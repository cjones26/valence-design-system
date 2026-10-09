import { execFileSync } from 'node:child_process';

const [platform, outputDirectory] = process.argv.slice(2);

if (!['android', 'ios'].includes(platform) || !outputDirectory) {
  throw new Error('Usage: generate-visual-flow <android|ios> <output-directory>');
}

const storyIds = execFileSync(process.execPath, ['scripts/list-visual-stories.mjs'], {
  cwd: process.cwd(),
  encoding: 'utf8',
})
  .trim()
  .split('\n');
const commands = [];

for (const storyId of storyIds) {
  for (const mode of ['light', 'dark']) {
    commands.push(
      `- openLink: valence-storybook://storybook?STORYBOOK_STORY_ID=${storyId}&preset=hi-vis&mode=${mode}`,
      '- extendedWaitUntil:',
      '    visible:',
      `      id: visual-story-${storyId}-${mode}`,
      '    timeout: 15000',
      '- waitForAnimationToEnd',
      `- takeScreenshot: ${outputDirectory}/${storyId}-${mode}`,
    );
  }
}

process.stdout.write(`appId: io.valencesoftware.storybook\n---\n${commands.join('\n')}\n`);
