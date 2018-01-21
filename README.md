# Kleros Dapp Front Boilerplate

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

(Build Status Badge) (Test Coverage Status Badge)

## Get Started

1. Clone this repo.
2. Install and set up the MetaMask chrome extension.
3. Create a .env file in the root of the repo.

```sh
# Development
DEV_ETHEREUM_PROVIDER=http://localhost:8545
DEV_STORE_PROVIDER=https://kleros.in
DEV_ARBITRATOR_ADDRESS=0xaea35f89f98996ae06aac344ab4b9ce1731059c4

# Production
PROD_ETHEREUM_PROVIDER=
PROD_STORE_PROVIDER=
PROD_ARBITRATOR_ADDRESS=
```

4. Run `yarn` to install dependencies and then `yarn start` to start the dev server.

## Other Scripts

* `yarn run prettify` - Applies prettier to the entire project.
* `yarn run lint` - Lints the entire project.
* `yarn test` - Runs the jest test suites + storyshots.
* `yarn run storybook` - Starts the storybook.
* `yarn run cz` - Runs commitizen.
* `yarn run build` - Creates a production build and a bundle analyzer file.

## Testing

Storybook Storyshots for `components` and jest integration tests for `containers`.
