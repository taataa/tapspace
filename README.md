# ![tapspace](docs/banner.png?raw=true)

[![NPM Version](https://badge.fury.io/js/tapspace.svg)](https://www.npmjs.com/package/tapspace)

We believe **zoomable touch user interfaces** to be the best way for humans to explore and manipulate two-dimensional content. Therefore we built **Tapspace**, a **JavaScript** library dedicated for building such **dynamic front-ends**. It implements a **scene graph** that provides an **infinite, scalable, and rotatable space** for you to represent **HTML content** and for your users to play with. Tapspace uses **pure CSS3 and DOM** instead of Canvas or WebGL and therefore is able to handle any HTML content you throw at it, including iframes and SVG, and also Canvas- and WebGL-rendered elements. And of course, we provide a clean, documented API for you to **build your best**.


## Install

With [npm](https://www.npmjs.com/package/tapspace):

    $ npm install tapspace


## Features

- Infinite space for any HTML content
- Pan, zoom, and rotate views and elements
- Robust multi-touch and mouse support, backed by [a M.Sc. thesis](http://urn.fi/URN:NBN:fi:tty-201605264186)
- Multiple users on the same screen? No problem.
- Allows multiple viewports to the same content
- Layout grid system to snap content
- [Apache Cordova](https://cordova.apache.org/) compatible


## Documentation

See [taataa.github.io/tapspace](http://taataa.github.io/tapspace) for:
- [API Reference](http://taataa.github.io/tapspace/api)
- [Developer's Cheat Sheet](http://taataa.github.io/tapspace/dev)


## Examples

 To get the most out of them, use a touch device. See the source code for tutoring comments!

- Your first minimal Space [[App]](https://rawgit.com/taataa/tapspace/development/examples/minimal/index.html) [[Source]](examples/minimal/index.html)
- Play Go! [[App]](https://rawgit.com/taataa/tapspace/development/examples/go/index.html) [[Source]](examples/go/index.html)
- Pinch-zoomable grid of 400 tile images [[App]](https://rawgit.com/taataa/tapspace/development/examples/tiles/index.html) [[Source]](examples/tiles/index.html)
- An arrangement of custom HTML content, including YouTube video [[App]](https://rawgit.com/taataa/tapspace/development/examples/html/index.html) [[Source]](examples/html/index.html)
- Animated zoomable HTML5 Canvas [[App]](https://rawgit.com/taataa/tapspace/development/examples/canvas/index.html) [[Source]](examples/canvas/index.html)
- Gears with rotation handles [[App]](https://rawgit.com/taataa/tapspace/development/examples/gears/index.html) [[Source]](examples/gears/index.html)
- Lenna, a SpaceGroup of SpacePixels [[App]](https://rawgit.com/taataa/tapspace/development/examples/pixels/index.html) [[Source]](examples/pixels/index.html)
- Multiple views to single Space [[App]](https://rawgit.com/taataa/tapspace/development/examples/multiview/index.html) [[Source]](examples/multiview/index.html)
- Modes of direct manipulation [[App]](https://rawgit.com/taataa/tapspace/development/examples/modes/index.html) [[Source]](examples/modes/index.html)


## License

[MIT](LICENSE)
