# taaspace

[![Build Status](https://travis-ci.org/taataa/taaspace.svg?branch=development)](https://travis-ci.org/taataa/taaspace)
[![NPM Version](https://badge.fury.io/js/taaspace.svg)](https://www.npmjs.com/package/taaspace)

We dream touch user interfaces should be beautiful, easy to use, and smooth as pudding. A physical paper like movable zoomable interface is how it can be done. Taaspace is a JavaScript library for that kind of interfaces. It is designed for modern UI concepts such as zoomable UIs and graph-based UIs. Taaspace provides an infinite space where your fingers can scale, rotate, and translate HTML elements. To support all types of HTML elements such as iframes, Canvas, SVG, and WebGL, we position and render elements using pure CSS3 and DOM, driven by optimized JavaScript.

![taaspace.js Logo](docs/taaspace-logo-256.png?raw=true)


## Example apps

- [Simple](https://rawgit.com/taataa/taaspace/development/examples/simple/index.html)
- [HTML elements](https://rawgit.com/taataa/taaspace/development/examples/html/index.html)
- [Interaction](https://rawgit.com/taataa/taaspace/development/examples/play/index.html)
- [Hammer.js integration](https://rawgit.com/taataa/taaspace/development/examples/hammerjs/index.html)
- [Canvas animation](https://rawgit.com/taataa/taaspace/development/examples/canvas/index.html)


## Install

With [npm](https://www.npmjs.com/package/taaspace):

    $ npm install taaspace


## Documentation

- [API](docs/api.md)


## Developers

Tests are run in a browser and built on [tape](https://github.com/substack/tape).

- Build the test suite by `$ npm run test:watch`. Uses `webpack --watch` under the hood so rebuilds are automatic.
- Open [test/index.html](test/index.html) with a browser and open console. Uses `webpack-livereload-plugin` so expect automatic page refresh at each rebuild.


## License

[MIT](LICENSE)
