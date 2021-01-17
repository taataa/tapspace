# Developer's Cheat Sheet

Here you find a quick introduction how to develop and contribute to Tapspace project.

## Architecture

The code is separated by three major aspects: model, layout, and interaction. The *model* consists of the items, like `SpaceImage`, and does not depend on the layout or the interaction. The *layout* is capsuled into `SpaceView` and defines how the model and its changes are rendered in the browser. Layout depends on the model but not on the interaction. The *interaction* is capsuled into `Touchable` and defines how user actions on the layout affect the model. The architecture is loosely based on [Jazz](http://www.cs.umd.edu/hcil/piccolo/learn/jazz/doc-1.3/), [libgdx.scene2d](https://github.com/libgdx/libgdx/wiki/Scene2d), and [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

## Developing example apps

Most of the example apps are targeted for touch screens. Therefore, when developing and testing an interactive app, it is necessary to serve it for touch screen devices in the same **local area network**. To make this easy, we have `examples/server.js`, a static file server that serves the apps. The server displays a QR code of the URL to the apps when started. Read the QR code with your touch device and you are ready to go. Start the `examples/server` by:

    $ npm start

Finished example apps load the `tapspace` bundle from [unpkg CDN](https://unpkg.com/). This way we avoid storing compiled files to the repository, although we still need to publish them to NPM. Bundles served by unpkg have URLs similar to `unpkg.com/tapspace@1.2.3/dist/tapspace.min.js`. Although the version tag can be omitted, the most robust practice is to specify the version which for the example app has been designed.

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

1. Ensure you are in a `feature-myfeat` branch.
1. Run `npm run lint` and `npm run test:headless`.
1. Commit changes.

Then, go to GitHub:

1. Create a pull request from `feature-myfeat` to `master`.
1. Merge the pull request to `master`

Then, back in your local environment:

1. Switch to `master` by `git checkout master`
1. Pull changes by `git pull --all`.
1. Bump new version in `package.json`.
1. Copy the version into source by `npm run gv`.
1. Commit the version bump.
1. Publish to npm with `npm run release`. It will run the test to double-check everything, build the bundle, and then publish.

Finally, go to GitHub:

1. Tag the `master` head with the new version as the tag name.

Now you can celebrate your freshly published package!

See also [a successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/).


## Continuous integration

Travis CI configuration is located at `.travis.yml`. Travis CI detects changes in GitHub `master` branch. For each change it runs `npm install` and `npm test`. Travis does not publish to npm as we decide to release manually.


## Maintenance

Upgrade dependencies:

    $ npm install -g npm-check-updates
    $ ncu     # to view available upgrades
    $ ncu -u  # to upgrade
