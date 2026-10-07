# Valence Design System

Valence is the shared component library used by Valence Software products. It supports React on the web and React Native on mobile.

The web and native components are separate implementations. They share design tokens and TypeScript prop definitions, but each component uses the controls and behavior expected on its platform.

## Packages

| Package                                                      | Purpose                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------- |
| [`@valencesoftwareio/tokens`](./packages/tokens)             | Colors, typography, spacing, sizing, shadows, and theme presets |
| [`@valencesoftwareio/types`](./packages/types)               | Shared component prop definitions                               |
| [`@valencesoftwareio/react`](./packages/react)               | React components and the web Storybook                          |
| [`@valencesoftwareio/react-native`](./packages/react-native) | React Native components                                         |
| [`native-storybook`](./apps/native-storybook)                | Expo app for viewing native components on a device or emulator  |

The four `@valencesoftwareio/*` packages are private and published through GitHub Packages. The native Storybook app is not published.

## Setup

Use Node 24 and pnpm 11.

```bash
nvm use
pnpm install
pnpm build
```

## Storybook

Start the web Storybook:

```bash
pnpm storybook
```

Start the native Storybook on Android:

```bash
pnpm storybook:android
```

On macOS, you can start it on iOS with:

```bash
pnpm storybook:ios
```

## Visual changes

Every pull request runs the `Visual Web` workflow. It builds the web Storybook and compares each story with the screenshots in `tests/visual/web/baselines`. The suite covers desktop and mobile widths in the `hi-vis` light and dark themes. Open overlays and focused controls are captured through their Storybook stories, so they go through the same public interactions a user would.

When a comparison fails, download the `visual-web-differences` artifact from the failed workflow run. Its HTML report shows the saved screenshot, the current result, and the pixels that changed.

If the change is intentional:

1. Push the finished component and story changes to the pull request.
2. Open **Actions**, choose **Update Visual Web Baselines**, and run it with the pull request number.
3. The workflow adds the new screenshots to that pull request and starts the comparison again.
4. Review the screenshot commit and wait for the pull request checks to pass.

Do not update the screenshots until the rendered change has been reviewed. A new Storybook story is included automatically unless it has the `visual-skip` tag.

To run the same comparison locally:

```bash
pnpm test:visual:web
```

To update screenshots locally:

```bash
pnpm test:visual:web:update
```

## Validation

Run the complete local check before opening a pull request:

```bash
pnpm verify
```

This runs the parity and theme contrast checks, audits production dependencies for critical advisories, lints and type-checks the workspace, enforces test coverage, builds every package, and creates an Android production bundle.

The individual commands are also available:

```bash
pnpm check-parity
pnpm check-contrast
pnpm check-audit
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
```

## Platform parity

The parity check compares the public exports, tests, and Storybook stories on both platforms.

Both implementations use the prop definitions from `@valencesoftwareio/types`. This keeps their public APIs aligned while allowing the internal code to remain platform-specific.

The parity check does not prove that two components behave identically. Interaction and accessibility still need to be reviewed on both platforms.

## Themes

Theme tokens are maintained in `packages/tokens/tokens`. The token build produces CSS variables for the web package and typed theme objects for React Native.

`ThemeProvider` defaults to the `hi-vis` preset. A nested provider is a new theme boundary, so pass its `preset` explicitly when it should match its parent.

## Fonts

Geist font files are stored in `@valencesoftwareio/tokens/fonts`. The web package registers them through CSS. Native applications load them with the `useValenceFonts()` hook from `@valencesoftwareio/react-native`.

The native type scale is slightly larger than the web scale. This is intentional and accounts for normal phone viewing distance. Web font sizes use `rem` so browser text-size preferences continue to work.

## Releases

Package versions are managed together. Conventional pull request titles set the release type: `fix:` for patch, `feat:` for minor, and `!` for major. Release Please prepares the version and changelog pull request automatically.
