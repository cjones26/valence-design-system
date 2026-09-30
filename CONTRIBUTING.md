# Contributing

Install Node 24 and pnpm 11, then run `pnpm install`. Before opening a pull
request, run `pnpm verify`.

## Package releases

The four published packages use the same version. A release updates and
publishes all four together.

Choose the release impact in the pull request template. Package changes require
a Changeset:

```sh
pnpm changeset
```

Select any affected package and choose the release type. Because the packages
are a fixed group, Changesets applies the highest selected release type to the
whole group. Use a short summary that will make sense in the changelog.

After the pull request merges, the release workflow opens or updates a Version
Packages pull request. That pull request contains the version and changelog
changes. Merging it publishes the packages to GitHub Packages after CI passes.

Documentation, Storybook, test, and repository tooling changes do not need a
Changeset unless they change a published package.
