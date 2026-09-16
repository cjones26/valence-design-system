# Valence Design System

Valence Software's public design system spans two completely separate codebases — one for the web, built on React, and one for mobile, built on React Native — rather than a single shared-runtime library that tries to serve both. That separation is a deliberate architectural choice: a shared-runtime approach would mean every component is written once against an abstraction layer that has to paper over real differences between a browser and a native mobile shell, and in practice that abstraction layer either becomes its own maintenance burden or quietly limits what either platform can actually do well. Building two implementations costs more up front, but each one gets to use its platform properly, and the two are kept honest against each other by a shared prop contract and a parity check described further down.

The base packages here — tokens, the shared type contracts, and both component libraries — are MIT-licensed and public. Any per-client theming or application code built on top of them lives elsewhere and stays private.

## What's in this repo

| Package | What it is |
|---|---|
| [`@valence/tokens`](./packages/tokens) | The design tokens — color, type, spacing, radius, and platform-specific sizing — authored once and compiled by Style Dictionary into CSS custom properties for web and a typed theme object for native. |
| [`@valence/types`](./packages/types) | The prop contracts every component conforms to on both platforms, so a `Button` on web and a `Button` on native accept the same shape of props even though nothing else about their implementations is shared. |
| [`@valence/react`](./packages/react) | The web component library. Styling is CSS Modules referencing the generated token custom properties directly, and interaction logic is hand-rolled per component, the same as it is on native. Storybook hosts the catalog for development and review. |
| [`@valence/react-native`](./packages/react-native) | The native component library. See its own README for the font-loading setup and the handful of things that are deliberately sized differently than web. |
| [`apps/native-storybook`](./apps/native-storybook) | A small, unpublished Expo app whose only job is hosting `@storybook/react-native` against a real device or emulator, giving `@valence/react-native` a real running environment to be verified against. |

The built-in `Icon` component contains the small set of glyphs defined by the design itself. Props that accept a consumer-provided icon use a render function that receives the correct semantic color, so applications can use their icon library of choice without Valence taking a dependency on it.

## What "parity" actually means here

Every component that ships on one platform has to exist on the other; there's no such thing as a web-only or native-only component in this system. That's enforced structurally, not just by convention: [`parity-registry.json`](./parity-registry.json) is the live, authoritative record of what exists and its status on each platform, and `pnpm check-parity` — which also runs in CI — fails the build if either platform exports something the registry doesn't know about, or if a component is marked done on one side without a matching entry on the other.

It's worth being precise about what that check actually guarantees, because it's easy to read more into "parity" than is really there. `check-parity` confirms that a component exists, under the same name, on both platforms, matching what `@valence/types` requires of its props. Interaction behavior and accessibility semantics are a matter of per-component review, the same as they would be in any two independently-implemented codebases — the registry is the source of truth for what's available where, and the shared type contract is the source of truth for the shape of its props.

The one intentional root-export difference is `useTheme`, which native consumers need to style application compositions with the active theme object. Web compositions use the generated CSS custom properties through the browser cascade instead, so exporting a JavaScript theme hook there would create a second, conflicting styling path.

`ThemeProvider` is an explicit theme boundary: a nested provider without a `preset` starts at the default `hi-vis` preset rather than inheriting its parent. Pass the preset to keep a nested subtree on the same theme.

Components that render arbitrary content, like `Card`, own their surface and their one primary action by design: the whole card is the tap target, and that's the only independently-interactive element it exposes. Stacking a second, separately-tappable element inside the same surface is a real usability hazard on touch devices specifically — competing hit areas and ambiguous focus order are the most common ways that goes wrong — so this is a constraint the API holds to consistently on both platforms.

## Working in this repo

```bash
pnpm install
pnpm build          # tokens → types → react/react-native, in dependency order
pnpm typecheck
pnpm lint
pnpm test
pnpm check-parity
pnpm check-contrast
pnpm verify          # complete local release gate, including the native bundle
pnpm storybook       # opens @valence/react's component catalog
```

The workspace is managed with pnpm and orchestrated with Turborepo, which is what makes `pnpm build` resolve the dependency order automatically rather than requiring each package to be built by hand in sequence. Versioning goes through Changesets, and a merge to `main` triggers the release workflow, which publishes whatever's been versioned to npm under the `@valence` scope. Toolchain floors — the Node version, the React and React Native peer ranges — live in each package's own `package.json` rather than being restated here; treat those files as current, since a number written into prose like this is exactly the kind of thing that goes stale the first time someone bumps a dependency and forgets there was a second copy to update.

## Fonts

The real Geist font files, licensed under OFL-1.1, are bundled inside `@valence/tokens/fonts` and are the actual source both platforms load from. Web registers them via `@font-face`; native loads them through `expo-font`, via a `useValenceFonts()` hook exported from `@valence/react-native/useValenceFonts` that an app calls once at its root. Both platforms, including the on-device Storybook host, have been checked against a real running instance to confirm text renders in Geist.

Type sizes are shared between platforms at the token level — one scale, authored once — but native renders slightly larger than web at every tier, as a deliberate platform convention: mobile body text sitting at typical desktop web sizes reads small given normal phone viewing distance, and both of the major mobile platforms already default their own system text noticeably larger than typical web body copy. The ratio is applied uniformly across the whole scale specifically so the relative hierarchy between, say, a title and a body size stays intact, rather than being picked per tier by hand. On web, those same type tokens are expressed in `rem`, so a reader who has changed their browser's default text size — a real accessibility setting, distinct from full-page zoom — gets that preference honored here too.

## Motion and reduced-motion

When a user requests reduced motion, Valence removes nonessential movement: state transitions jump to their end state, press-scale feedback is suppressed, and continuously animated indicators render statically. Components must use the platform preference (`prefers-reduced-motion` on web and the internal native reduced-motion hook) instead of implementing their own policy.
