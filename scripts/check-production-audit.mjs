import { spawnSync } from 'node:child_process';

const result = spawnSync('pnpm', ['audit', '--prod', '--json'], { encoding: 'utf8' });

if (!result.stdout) {
  console.error(result.stderr || 'pnpm audit did not return a report.');
  process.exit(1);
}

const report = JSON.parse(result.stdout);
const blocked = Object.values(report.advisories ?? {}).filter(
  (advisory) =>
    ['high', 'critical'].includes(advisory.severity) &&
    advisory.findings.some((finding) =>
      finding.paths.some((dependencyPath) => !dependencyPath.startsWith('apps__native-storybook>')),
    ),
);

if (blocked.length > 0) {
  for (const advisory of blocked) {
    console.error(`${advisory.severity}: ${advisory.module_name} — ${advisory.title}`);
  }
  process.exit(1);
}

console.log('Production dependency audit passed. Native Storybook advisories are excluded.');
