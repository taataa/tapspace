
# Tutorial

## Layout

## Direct manipulation

The `tapspace.Touchable` enables [direct manipulation](https://www.nngroup.com/articles/direct-manipulation/) in Tapspace apps. It recognizes mouse and touch gestures on Tapspace elements and makes the elements react in a natural, paper-like way.

Touchable's simplistic interaction design is based on usability research and ensures good design principles:
- **No double tap** or triple+ tap gestures. They are hard for users to discover. Instead, updated the interface after each single tap in a way that tells user that another tap is needed.
- **No hold.** It is hard for users to discover. Use single tap or multiple subsequent single taps with progressive visual feedback instead. [1]
- **No info about number of fingers.** Fingers easily touch the screen by accident and cause unexpected behavior if UI behavior depends on number of fingers. [1]
- **Respect each finger equally.** If only two fingers are respected in transformations such as scaling then movement of additional fingers do not affect at all which is not the way how objects behave in the physical world familiar to users. [2]

Additional design decisions:
- **No hover** even for mouse. We treat mouse as a single finger. Simpler for developers, less bugs for users to discover.

[1] [Microsoft touch design guidelines](https://msdn.microsoft.com/en-us/windows/uwp/input-and-devices/guidelines-for-user-interaction)<br />
[2] Palen, 2016, [Advanced algorithms for manipulating 2D objects on touch screens](http://dspace.cc.tut.fi/dpub/handle/123456789/24173).

## Let us code

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
