![tapspace](banner.png?raw=true)

We believe **zoomable touch user interfaces** to be the best way for humans to explore and manipulate two-dimensional content. Therefore we built ***Tapspace***, a **JavaScript** library dedicated for building such **dynamic front-ends**. It implements a **scene graph** that provides an **infinite, scalable, and rotatable space** for you to represent **HTML content** and for your users to play with. Tapspace uses **pure CSS3 and DOM** instead of Canvas or WebGL and therefore is able to handle any HTML content you throw at it, including iframes and SVG, and also Canvas- and WebGL-rendered elements. And of course, we provide a clean, documented API for you to **build your best**.

[**Tutorial**](tutorial/) is a good place to start for newcomers.

[**API Reference**](api/) comes handy when coding.

[**Developer's Cheat Sheet**](dev/) for hard-core folks who want to take Tapspace to a next level.

[**GitHub**](https://github.com/taataa/tapspace) for the source code and [bug reports](https://github.com/taataa/tapspace/issues).

[**NPM**](https://www.npmjs.com/package/tapspace) for the stable release and popularity statistics.


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


## Examples

Whether you dream about a *Google Maps* clone, a *Prezi* flavored home page, or a real-time strategy game, these example apps give you a major head start in implementing your zoomable user interface and touch integration. To get the most out of the example apps, use a touch device. See the source code for tutoring comments!

<div style="clear: both">
<img src="../examples/tiles/preview.jpg" style="float: left;  margin: 0 1em 1em 0">
<h3>Tiles</h3>
Pinch-zoomable grid of 400 tile images<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/tiles/index.html) [[See source]](examples/tiles/index.html)
</div>

<div style="clear: both">
<img src="../examples/html/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>HTML</h3>
An arrangement of custom HTML content, including a YouTube video<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/html/index.html) [[See source]](examples/html/index.html)
</div>

<div style="clear: both">
<img src="../examples/infinity/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Infinity</h3>
Zoom into infinity<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/infinity/index.html) [[See source]](examples/infinity/index.html)
</div>

<div style="clear: both">
<img src="../examples/go/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Go</h3>
Play Go!<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/go/index.html) [[See source]](examples/go/index.html)
</div>

<div style="clear: both">
<img src="../examples/minimal/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Minimal</h3>
Your first minimal Tapspace app<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/minimal/index.html) [[See source]](examples/minimal/index.html)
</div>

<div style="clear: both">
<img src="../examples/canvas/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Canvas</h3>
Animated zoomable HTML5 Canvas<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/canvas/index.html) [[See source]](examples/canvas/index.html)
</div>

<div style="clear: both">
<img src="../examples/gears/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Gears</h3>
Gears with rotation handles<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/gears/index.html) [[See source]](examples/gears/index.html)
</div>

<div style="clear: both">
<img src="../examples/grid/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Grid</h3>
A snapping grid that snaps translations and rotations<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/grid/index.html) [[See source]](examples/grid/index.html)
</div>

<div style="clear: both">
<img src="../examples/pixels/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Pixels</h3>
Lenna, a `SpaceGroup` of `SpacePixels`<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/pixels/index.html) [[See source]](examples/pixels/index.html)
</div>

<div style="clear: both">
<img src="../examples/multiview/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Multiview</h3>
Multiple views to single `Space`<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/multiview/index.html) [[See source]](examples/multiview/index.html)
</div>

<div style="clear: both">
<img src="../examples/modes/preview.jpg" style="float: left; margin: 0 1em 1em 0">
<h3>Modes</h3>
Modes of direct manipulation allowed by `Touchable`<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/modes/index.html) [[See source]](examples/modes/index.html)
</div>

<div style="clear: both">
<img src="../examples/hammerjs/preview.jpg" style="float: left; margin: 0 1em 0 0">
<h3>HammerJS</h3>
What if touch interaction is implemented with [HammerJS](https://hammerjs.github.io/) instead of `Touchable`?<br>
[[Try app]](https://rawgit.com/taataa/tapspace/master/examples/hammerjs/index.html) [[See source]](examples/hammerjs/index.html)
</div>
<div style="clear: both"></div>

## Thanks to

Members of the Tapspace v0 code inspection group on 2013-Nov-18
- Johanna Issakainen
- Mika Kunnas
- Elina Lukkarinen
- Mikko Nurminen
- Timo Ruostila
- Mikko Teuho
