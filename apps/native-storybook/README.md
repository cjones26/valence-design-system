# native-storybook

This app hosts `@storybook/react-native` on a real device or emulator, giving `@valence/react-native`'s components a real running environment to be checked against. It's a verification harness for that package, kept unpublished.

```bash
pnpm android
```

Stories live under `.rnstorybook/stories/`, one file per component, mirroring the coverage in `@valence/react`'s own Storybook so the two catalogs stay easy to compare side by side.

## How this gets verified in CI

Type-checking this app runs through the root `pnpm typecheck`, the same as every other package in the workspace. A separate `verify-bundle` script adds coverage for real bundler failures specifically — a case like two components accidentally declared under the same name — by running a non-interactive Expo export for Android. That forces Metro through the exact module-resolution and bundling process a real launch would go through, and fails loudly if anything in that chain breaks. It runs as its own step in CI, independent of the rest of the workspace's build.
