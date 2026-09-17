# Valence Design System

Valence is the shared component library used by Valence Software products. It supports React on the web and React Native on mobile.

The web and native components are separate implementations. They share design tokens and TypeScript prop definitions, but each component uses the controls and behavior expected on its platform.

## Packages

| Package                                            | Purpose                                                         |
| -------------------------------------------------- | --------------------------------------------------------------- |
| [`@valence/tokens`](./packages/tokens)             | Colors, typography, spacing, sizing, shadows, and theme presets |
| [`@valence/types`](./packages/types)               | Shared component prop definitions                               |
| [`@valence/react`](./packages/react)               | React components and the web Storybook                          |
| [`@valence/react-native`](./packages/react-native) | React Native components                                         |
| [`native-storybook`](./apps/native-storybook)      | Expo app for viewing native components on a device or emulator  |

The four `@valence/*` packages are public and MIT licensed. The native Storybook app is private and is not published.

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

## Validation

Run the complete local check before opening a pull request:

```bash
pnpm verify
```

This runs the parity and theme contrast checks, audits dependencies used by published packages, lints and type-checks the workspace, enforces test coverage, builds every package, and creates an Android production bundle.

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

Components are listed in [`parity-registry.json`](./parity-registry.json). A component marked as complete must be exported, tested, and represented in Storybook on both platforms.

Both implementations use the prop definitions from `@valence/types`. This keeps their public APIs aligned while allowing the internal code to remain platform-specific.

The parity check does not prove that two components behave identically. Interaction and accessibility still need to be reviewed on both platforms.

## Themes

Theme tokens are maintained in `packages/tokens/tokens`. The token build produces CSS variables for the web package and typed theme objects for React Native.

`ThemeProvider` defaults to the `hi-vis` preset. A nested provider is a new theme boundary, so pass its `preset` explicitly when it should match its parent.

## Fonts

Geist font files are stored in `@valence/tokens/fonts`. The web package registers them through CSS. Native applications load them with the `useValenceFonts()` hook from `@valence/react-native`.

The native type scale is slightly larger than the web scale. This is intentional and accounts for normal phone viewing distance. Web font sizes use `rem` so browser text-size preferences continue to work.

## Releases

Published package changes need a Changeset:

```bash
pnpm changeset
```

Choose the affected packages and the appropriate version change. After the change reaches `main`, the release workflow updates package versions and publishes them to npm.
