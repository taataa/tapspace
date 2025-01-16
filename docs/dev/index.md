# Developer's Cheat Sheet

Here you find an introduction how to develop and contribute to Tapspace project.

Table of Contents:
- [Architecture](#architecture)
- [Coding style](#coding-style)
- [Documentation style](#documentation-style)
- [Developing example apps](#developing-example-apps)
- [Building](#building)
- [Testing](#testing)
- [Continuous integration](#continuous-integration)
- [Release](#release)
- [Maintenance](#maintenance)


## Architecture

Tapspace enhances a part of DOM tree to become an affine space; something that can be panned and zoomed without limits and has no fixed world origin.

The main components are Space, Viewport, Plane, and Element. The Viewport is the root element of a tapspace in DOM. The Viewport contains one Space which contains one or more origin planes. An origin plane can be thought as a layer that is being moved within the Space relative to the Viewport.

The architecture is loosely based on [Jazz](http://www.cs.umd.edu/hcil/piccolo/learn/jazz/doc-1.3/), [libgdx.scene2d](https://github.com/libgdx/libgdx/wiki/Scene2d), and [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

For more detailed notes on architecture and the tough processes behind the design decisions, see [dev/design](./design.md). Also, there exists hundreds of pages of drawings, writings, and sketches on paper that are not publicly available but can be made available per-request basis.


## Coding style

We use StandardJS linter. Therefore:
- use camelCase naming.
- avoid semicolons.
- max 80 characters per line.

We should follow conventions apparent in browser DOM API:
- begin each function name with a verb.
- begin each variable and property name with a noun.
- names should be descriptive but minimal.

Guidelines for commenting:
- Comments should answer to the question "why" instead of "what" especially when the code makes latter obvious.
- Use proper sentences whenever applicable.
- Use comments to title sections of code.
- Do not fear to write long comments if it is necessary for understanding.
- "No uncommon abbr." Better: Avoid uncommon abbreviations.


## Documentation style

See [Documentation Style Guide](docstyle.md) for styling of illustrations, symbols, example apps and such.


## Developing example apps

Most of the example apps are targeted for touch screens. Therefore, when developing and testing an interactive app, it is necessary to serve it for touch screen devices in the same **local area network**. To make this easy, we have `examples/server.js`, a static file server that serves the apps. The server displays a QR code of the URL to the apps when started. Read the QR code with your touch device and you are ready to go. Start the `examples/server` by:

    $ npm start

Finished example apps load the `tapspace` bundle from [unpkg CDN](https://unpkg.com/). This way we avoid storing compiled files to the repository, although we still need to publish them to NPM. Bundles served by unpkg have URLs similar to `unpkg.com/tapspace@1.2.3/dist/tapspace.min.js`. Although the version tag can be omitted, the most robust practice is to specify the version which for the example app has been designed.

Example apps can also be used for **manual testing** while developing tapspace core. In this case, however, the unpkg URL needs to be *temporarily* replaced with a local URL `../tapspace.min.js`. The bundle at the local URL is served from `dist/` by the `examples/server.js`. But first, **build the bundle** into `dist/` by:

    $ npm run build

To repeat the build every time you make a change, use `npm run build:watch` instead. When this is the case, it is often necessary to have two terminals open. The first is running the examples server (`npm start`) and the second is repeatedly building the bundle (`npm run build:watch`).


## Building

Tapspace.js is a package and thus needs to be packed with a build tool. Tapspace uses [webpack](https://webpack.js.org/) for this. We have separate builds for testing and production purposes. Each build has a script in package.json. The builds output files into `dist/` directory, standalone bundle at `dist/tapspace.min.js` and source maps at `dist/tapspace.min.js.map`.

Minified bundle for production:

    $ npm run build:production

Development bundle:

    $ npm run build

Automatic development build after a file change:

    $ npm run build:watch

Documentation needs a build too.

    $ npm run build:docs

A build is necessary before running tests.


## Testing

Tapspace.js is a user interface library. Therefore its test suite runs in a headless web browser. Use command line to run the test suite. The test suite hosts unit tests for each Tapspace component and geometry. You can open a particular unit in a web browser for deeper inspection.

To check the code syntax and style against [standardJS](https://standardjs.com/):

    $ npm run lint

To fix common lint issues automatically:

    $ npm run lint:fix

To run the test suite:

    $ npm test

Unit tests are built on [tape](https://github.com/substack/tape) framework and run in a headless chromium via [puppeteer](https://github.com/puppeteer/puppeteer). Each test unit has the tests written in one or multiple HTML pages. Each page loads the current tapspace build bundle in `/dist`, loads a tape-like test tool `testlib.js`, and executes a small test script. The test pages are executed in mass by puppeteer and results output to terminal in tape format. Pages can be opened manully in a normal web browser for deeper debug.


## Release

When a new Tapspace version is ready for the release, we must ensure its correctness.

First, in your local environment:

1. Ensure you are in a `feature-myfeat` branch.
1. Run `npm run lint` and `npm run test:browser`.
1. Commit repairs if any.

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
