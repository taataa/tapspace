# ![tapspace](docs/banner.png?raw=true)

[![NPM Version](https://img.shields.io/npm/v/tapspace.svg?colorB=7fcd0f)](https://www.npmjs.com/package/tapspace)
[![Travis CI](https://img.shields.io/travis/taataa/tapspace/master.svg)](https://travis-ci.org/taataa/tapspace)
[![MIT License](https://img.shields.io/npm/l/tapspace.svg)](LICENSE)


We believe **zoomable touch user interfaces** to be the best way for humans to explore and manipulate two-dimensional content. Therefore we built **Tapspace**, a **JavaScript** library dedicated for building such **dynamic front-ends**. It implements a **scene graph** that provides an **infinite, scalable, and rotatable space** for you to represent **HTML content** and for your users to play with. Tapspace uses **pure CSS3 and DOM** instead of Canvas or WebGL and therefore is able to handle any HTML content you throw at it, including iframes and SVG, and also Canvas- and WebGL-rendered elements. And of course, we provide a clean, documented API for you to **build your best**.


## Install

With [npm](https://www.npmjs.com/package/tapspace) or [yarn](https://yarnpkg.com/en/package/tapspace):

    $ npm install tapspace
    $ yarn add tapspace


## Features

- Infinite space for any HTML content
- Pan, zoom, and rotate views and elements
- Robust multi-touch and mouse support, backed by [our M.Sc. thesis](http://urn.fi/URN:NBN:fi:tty-201605264186)
- Multiple users on the same screen? No problem.
- Allows multiple viewports to the same content
- Layout grid system to snap content
- [Apache Cordova](https://cordova.apache.org/) compatible


## Documentation

See [taataa.github.io/tapspace](http://taataa.github.io/tapspace) for:
- [API Reference](http://taataa.github.io/tapspace/api)
- [Developer's Cheat Sheet](http://taataa.github.io/tapspace/dev)


## Examples

 To get the most out of the example apps, use a touch device. See the source code for tutoring comments!

- Your first minimal Space [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/minimal/index.html) [[See source]](examples/minimal/index.html)
- Play Go! [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/go/index.html) [[See source]](examples/go/index.html)
- Pinch-zoomable grid of 400 tile images [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/tiles/index.html) [[See source]](examples/tiles/index.html)
- An arrangement of custom HTML content, including a YouTube video [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/html/index.html) [[See source]](examples/html/index.html)
- Animated zoomable HTML5 Canvas [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/canvas/index.html) [[See source]](examples/canvas/index.html)
- Gears with rotation handles [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/gears/index.html) [[See source]](examples/gears/index.html)
- Snapping grid [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/grid/index.html) [[See source]](examples/grid/index.html)
- Lenna, a SpaceGroup of SpacePixels [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/pixels/index.html) [[See source]](examples/pixels/index.html)
- Multiple views to single Space [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/multiview/index.html) [[See source]](examples/multiview/index.html)
- Modes of direct manipulation [[Try app]](https://rawgit.com/taataa/tapspace/development/examples/modes/index.html) [[See source]](examples/modes/index.html)
