# Taaspace.js

A javascript library for zooming user interfaces.

## Examples

- [Basic example](https://rawgithub.com/taataa/taaspace/master/examples/basic.html) with zoomable and pannable space and text and image elements.
- [Moving elements](https://rawgithub.com/taataa/taaspace/master/examples/movable.html) shows how to make text and image elements movable.
- [Animation chaining](https://rawgithub.com/taataa/taaspace/master/examples/chain.html) presents how to fire functions when animations end.
- [jQuery &amp; SpaceElement](https://rawgithub.com/taataa/taaspace/master/examples/jquery.html) shows how to use jQuery with the elements.
- [Scaling example](https://rawgithub.com/taataa/taaspace/master/examples/scale.html) makes you shrink and expand elements.
- [Using networks](https://rawgithub.com/taataa/taaspace/master/examples/network.html) shows you how to use networks.
- [Using grids](https://rawgithub.com/taataa/taaspace/master/examples/grid.html) shows you how to use grids to arrange elements.

More examples at [taaspace-contrib-examples](https://github.com/taataa/taaspace-contrib-examples)!

## Features

- Scalable, rotatable and draggable infinite space for HTML elements
- Uses CSS3 and DOM elements, **no** HTML5 Canvas, SVG or WebGL
- Add text, image and box elements and also custom DOM elements into the space.
- Add grids to create nice layouts.
- Listen simplified and practical set of input gestures, like pinch zoom, mouse wheel and drag-and-drop. Multi-touch support and gesture recognition by [Hammer.js](http://eightmedia.github.io/hammer.js/)
- Animate transformations, like moving an image, simply by passing some parameters. Animation support by [Move.js](http://visionmedia.github.io/move.js/)
- Add networks to load content dynamically, making it possible to explore large amounts of data within single page load.
- Extend by creating your own element types.

## TODO

- Some of the touch gestures like pinch zoom
- Box element type
- Panning and zooming limits
- Grouping
- Rotation
- Helper function for full-page apps.
- Documentation
- Testing

## Dependencies

- [Modernizr](http://modernizr.com/) for compability (MIT License)
- [jQuery](http://jquery.com/) (MIT License)
- [jQuery Mouse Wheel Plugin](https://github.com/brandonaaron/jquery-mousewheel) (MIT License)
- [Move.js](http://visionmedia.github.io/move.js/) for animations (MIT License)
- [Hammer.js](http://eightmedia.github.io/hammer.js/) for touch gestures (MIT License)
- [Underscore.js](http://underscorejs.org/) for compact code (MIT License)
- [jwerty](https://github.com/keithamus/jwerty) for keyboard events (MIT License)

## License

[MIT License](../blob/master/LICENSE)
