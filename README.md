# taaspace.js

[![Build Status](https://travis-ci.org/taataa/taaspace.svg?branch=development)](https://travis-ci.org/taataa/taaspace)
[![NPM Version](https://badge.fury.io/js/taaspace.svg)](https://www.npmjs.com/package/taaspace)

We dream touch user interfaces should be beautiful, easy to use, and smooth as pudding. A physical paper like movable zoomable interface is how it can be done. Taaspace is a JavaScript library for that kind of interfaces. It is designed for modern UI concepts such as zoomable UIs and graph-based UIs. Taaspace provides an infinite space where your fingers can scale, rotate, and translate HTML elements. To support all types of HTML elements such as iframes, Canvas, SVG, and WebGL, we position and render elements using pure CSS3 and DOM, driven by optimized JavaScript.

![taaspace.js Logo](docs/taaspace-logo-128.png?raw=true)


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


## Notes for Devs

Run release build & tests:

    $ npm run build

Run debug build & tests:

    $ npm run build:dev

Upgrade dependencies:

    $ npm install -g npm-check-updates
    $ ncu  # to view available upgrades
    $ ncu  # to upgrade


## License

[MIT](LICENSE)
