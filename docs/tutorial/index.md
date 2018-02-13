
# Tutorial

For now, it is best for you to inspect the example apps for tutoring comments. The tutorial is a work in progress!

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

This tutorial covered the most about Touchable's API. The details about the methods and events can be found in the API Reference.
