# taaspace

[![NPM Version](https://badge.fury.io/js/taaspace.svg)](https://www.npmjs.com/package/taaspace)

We dream **touch user interfaces** to be minimalistic, natural to use, and physical as paper. Taaspace is a **JavaScript** library for that kind of interfaces. It is designed for modern UI concepts such as **zoomable UIs** and **graph-based UIs** with **pure direct manipulation**. Taaspace provides an **infinite, transformable space** for you to represent **HTML content** and for your users to directly explore and interact with it. Taaspace uses **pure CSS3 and DOM** and therefore supports any HTML content, including iframe, svg, and Canvas- and WebGL-rendered elements. It provides clean API for you to build cool, **zoomable, and dynamic front-ends**.

![taaspace.js Logo](docs/taaspace-logo-256.png?raw=true)


## Tutorials

The tutorials are written into source code of the following apps!

- Your first minimal Space [[App]](https://rawgit.com/taataa/taaspace/development/examples/minimal/index.html) [[Source]](examples/minimal/index.html)
- SpaceHTML and transformations [[App]](https://rawgit.com/taataa/taaspace/development/examples/html/index.html) [[Source]](examples/html/index.html)
- A SpaceGroup of SpacePixels [[App]](https://rawgit.com/taataa/taaspace/development/examples/pixels/index.html) [[Source]](examples/pixels/index.html)
- Multiple SpaceViews [[App]](https://rawgit.com/taataa/taaspace/development/examples/multiview/index.html) [[Source]](examples/multiview/index.html)

<!---
- [HTML elements](https://rawgit.com/taataa/taaspace/development/examples/html/index.html)
- [Interaction](https://rawgit.com/taataa/taaspace/development/examples/play/index.html)
- [Hammer.js integration](https://rawgit.com/taataa/taaspace/development/examples/hammerjs/index.html)
- [Canvas animation](https://rawgit.com/taataa/taaspace/development/examples/canvas/index.html)
--->


## Install

With [npm](https://www.npmjs.com/package/taaspace):

    $ npm install taaspace

<!---
## Documentation

- [API](docs/api.md)
--->

## Developers

Tests are run in a browser and built on [tape](https://github.com/substack/tape).

### npm run test:browser:watch

Steps:

1. Start building of the test suite by `$ npm run test:browser:watch`.
1. Then open a test runner `test/index.html` with your browser of choice.

Features:

- The build uses `webpack --watch` under the hood so any change to lib or test code rebuilds the suite.
- The runner uses `webpack-livereload-plugin` so expect automatic page refresh at each webpack rebuild.


## License

[MIT](LICENSE)
