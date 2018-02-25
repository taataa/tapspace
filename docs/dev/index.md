# Developer's Cheat Sheet

Here you find a quick introduction how to develop and contribute to Tapspace project.

## Architecture

The code is separated by three major aspects: model, layout, and interaction. The *model* consists of the items, like `SpaceImage`, and does not depend on the layout or the interaction. The *layout* is capsuled into `SpaceView` and defines how the model and its changes are rendered in the browser. Layout depends on the model but not on the interaction. The *interaction* is capsuled into `Touchable` and defines how user actions on the layout affect the model.


## Developing example apps

Most of the example apps are targeted for touch screens. Therefore, when developing and testing an interactive app, it is necessary to serve it for touch screen devices in the same **local area network**. To make this easy, we have `examples/server.js`, a static file server that serves the apps. The server displays a QR code of the URL to the apps when started. Read the QR code with your touch device and you are ready to go. Start the `examples/server` by:

    $ npm start

Finished example apps load the `tapspace` bundle from [unpkg CDN](https://unpkg.com/). This way we avoid storing compiled files to the repository, although we still need to publish them to NPM. Bundles served by unpkg have URLs similar to `unpkg.com/tapspace@5.0.0/dist/tapspace.min.js`. Although the version tag can be omitted, the most robust practice is to specify the version which for the example app has been designed.

Example apps can also be used for **manual testing** while developing tapspace core. In this case, however, the unpkg URL needs to be *temporarily* replaced with a local URL `../tapspace.min.js`. The bundle at the local URL is served from `dist/` by the `examples/server.js`. But first, **build the bundle** into `dist/` by:

    $ npm run build

To repeat the build every time you make a change, use `npm run build:watch` instead. When this is the case, it is often necessary to have two terminals open. The first is running the examples server (`npm start`) and the second is repeatedly building the bundle (`npm run build:watch`).


## Testing

Tests are run in a browser and built on [tape](https://github.com/substack/tape).

### npm run build

Build a minified, standalone bundle at `dist/tapspace.min.js` and source maps at `dist/tapspace.min.js.map`.

### npm run lint

Lint source against [standardJS](https://standardjs.com/) style. To fix automatically fixable issues, use `npm run lint:fix`.

### npm run test:headless

Run the test suite once in a headless *Electron* browser and output results to console. In case of a failed test, the output is so poor for debugging that it is better to use `npm run test:browser:watch`.

### npm run test:browser:watch

Run the test suite in a real browser every time a file changes. Real browsers usually have good debugging tools.

Steps:

1. Start building of the test suite by `$ npm run test:browser:watch`.
1. Then open a test runner `test/index.html` with your browser of choice.
1. Open the development tool to view the test results and to start debugging.

Features:

- The build uses `webpack --watch` under the hood so any change to lib or test code rebuilds the suite.
- The runner `test/index.html` uses `webpack-livereload-plugin` so expect automatic page refresh at each webpack rebuild.


## Release

First, in your local environment:

1. Ensure you are in the `development` branch.
1. Ensure the correct new version in `package.json`.
1. Copy the version into source by `npm run gv`.
1. Run `npm run lint` and `npm run test:headless`.
1. Commit changes.

Then, go to GitHub:

1. Create a pull request from `development` to `master`.
1. Merge the pull request to `master`
1. Tag the `master` head with the new version as the tag name.

Finally, back in your local environment:

1. Pull `master` by `git pull --all`.
1. Switch to `master` by `git checkout master`.
1. Publish by `npm run release`. It will run the test to double-check everything, build the bundle, and then publish.
1. Switch back to `development` by `git checkout development` to avoid accidentally committing to `master` next time you commit something.
1. Celebrate your fresh published package version!

See also [a successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/).


## Maintenance

Upgrade dependencies:

    $ npm install -g npm-check-updates
    $ ncu     # to view available upgrades
    $ ncu -u  # to upgrade
