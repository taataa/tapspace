# Developer's Cheat Sheet

## Testing

Tests are run in a browser and built on [tape](https://github.com/substack/tape).

### npm run build:min

Build a minified, standalone bundle at `dist/taaspace.min.js`.

### npm run lint

Lint source against [standardJS](https://standardjs.com/) style.

### npm run test:browser:watch

Steps:

1. Start building of the test suite by `$ npm run test:browser:watch`.
1. Then open a test runner `test/index.html` with your browser of choice.

Features:

- The build uses `webpack --watch` under the hood so any change to lib or test code rebuilds the suite.
- The runner uses `webpack-livereload-plugin` so expect automatic page refresh at each webpack rebuild.
