# Developer's Cheat Sheet

## Architecture

Dependency tree:

- Touchable
  - Manager
    - taaspace
    - nudged
    - Recognizer

## Build example apps

Play with the apps on devices in the same local network by starting a local static file server. It will give you a QR code of the URL to the examples.

    $ npm start

For testing purposes, it is helpful to watch-build taaspace bundle in another terminal:

    $ npm run build:watch

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
