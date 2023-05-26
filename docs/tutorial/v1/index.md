[1.6.0](#) [2.0.0-alpha.4](../v2/)

# Tutorial

Quick tutorial into Tapspace.js 1.6 basics. Inspect also the [example apps](../#examples) for tutoring comments. See also [Tapspace 2.0.0-alpha tutorial](../v2/).

## Installation

To use tapspace in your JavaScript project, install via npm:

    $ npm install tapspace

and require in your app:

    const tapspace = require('tapspace')

Another way is to copy one of the standalone bundles:

- https://unpkg.com/tapspace@1.6.0/dist/tapspace.min.js
- https://unpkg.com/tapspace@2.0.0-alpha.8/dist/tapspace.min.js

The standalone bundle can be imported by adding a script tag before your app script:

    <script src="https://unpkg.com/tapspace@1.6.0/dist/tapspace.min.js"></script>
    <script src="my-app-in-a-file.js"></script>
    <script>
      // My app in literal code
      console.log('hello')
    </script>

You can bring tapspace in your app like this:

    var space = new tapspace.Space()

The space contains items. To see the items, we need a view:

    var view = new tapspace.SpaceView(space)

We connect the view to a HTML element on the page of your app:

    var spaceEl = document.getElementById('space')
    view.mount(spaceEl)

Then just add some content to the space and they show up in the view:

    var hello = new tapspace.SpaceHTML(space, '<h1>Hello</h1>')

In addition to SpaceHTML, there are also SpaceImage, and SpacePixel.

You can position the content items freely by moving, scaling, and rotating them. The following moves the middle of our hello to the middle of the view.

    var source = hello.atMid()
    var target = view.atMid()
    hello.translate(source, target)

There are various positioning methods like `translateRotate` and `scale`. See [API docs](https://taataa.github.io/tapspace/api/#tapspaceabstractplane) for more.

## Navigation

Basic navigation is easy, we setup interaction for the view.

    // Setup the view interaction
    var viewtouch = new tapspace.Touchable(view, view)
    var viewwheel = new tapspace.Wheelable(view, view)

Now the viewtouch object listens to view for touch events, recognizes a move gesture, and applies it the the view. Also, mouse wheel events are listened and applied to view.

Before anything moves, we must define what kind of movement we allow and start the gesture recognition.

    // Pinch zoom and mouse wheel
    viewtouch.start({ translate: true, scale: true, rotate: true, tap: true })
    viewwheel.start({ scale: true })

Now the viewport reacts to touch and mouse.

Zooming by tapping is a bit more technical. First we want to listen to our touch recognizer for tap events:

    viewtouch.on('tap', function (ev) {
      // handler code here
      view.scale(view.atMid(), 0.618)
    })

That would zoom the viewport toward the middle. Would it be more natural if zooming is done towards the tap position?

    viewtouch.on('tap', function (ev) {
      // handler code here
      view.scale(ev.points[0], 0.618)
    })

Better yet, if user produced the tap with multiple fingers, we want to zoom to their average, not just on the first.

    // Tap to zoom in at the middle of the gesture
    viewtouch.on('tap', function (ev) {
      var mean = tapspace.geom.IVector.mean(ev.points), 0.618)
      view.scale(mean, 0.618)
    })

## Interaction

Let us begin with a simple Tapspace application:

    > var space = new tapspace.Space()
    > var view = new tapspace.SpaceView(space)
    > view.mount(document.getElementById('space'))
    > var hello = new tapspace.SpaceHTML(space, '<h1>Hello</h1>')

Our goal is to make `hello` movable and rotatable. For that we create a touch manager:

    > var tou = new tapspace.Touchable(view, hello)

The manager does two things. First, it recognizes the gestures made on the HTML representation of `hello`. Second, it manipulates `hello` according to the gesture. Note that only the gestures on the given `view` are recognized. This allows unique interface behavior within each view. On the other hand, the consequences are visible also on other views of the same space.

The manager does not recognize anything yet. We need to activate it first by calling `start`. Also, we specify *the mode* of interaction which means the type of interaction we would like to allow.

    > tou.start({
        translate: true,
        rotate: true
      })

The main properties of the mode are `translate`, `rotate`, `scale`, and `tap`. They all are `false` by default. There is also a `pivot` property which is a bit special. The `pivot` takes in an `IVector` and restricts the rotation and scaling to happen only around it.

The mode can be changed even during an ongoing gesture with `restart` method. The following disables the translation and rotation but instead allows scaling around the middle of the `hello`.

    > tou.restart({
        scale: true,
        pivot: hello.atMid()
      })

The workings of the manager can be deactivated by calling `stop` method. An inactive manager does not recognize gestures or modify `hello`. After `stop`, you can activate the manager by calling `start` or `restart` with a mode, or just reuse the stopped mode by calling `resume`.

    > tou.stop()
    > tou.resume()

An active manager emits events about the recognized gestures. You can bind to these events in your code. One of such events is `tap` which is fired after short click-like gestures if `tap: true`. Each event is accompanied with an event object and can be listened in the following manner:

    > tou.on('gestureend', function (ev) {
        console.log(ev.duration)
      })

This tutorial covered the most about Touchable's API. The details about the methods and events can be found in the [API Reference](../api/v1/).
