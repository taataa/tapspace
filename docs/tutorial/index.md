# Tutorial

Ready to build your first Tapspace app? You have come to the right place. Here we go through the basics from setting up a *space* to hold your content, a *viewport* to navigate your content, and how to place elements into the space.

In this tutorial we assume you have basic knowledge on web programming concepts such as HTML, CSS, DOM, and JavaScript.

## Step 1: Prepare a web page for the app

Create a directory named `tapspace-hello` and in it a file `index.html` with the following content:

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Hello Tapspace</title>
    </head>
    <body>
    </body>
    </html>

Adjust the title to your liking.

Import Tapspace script by adding the following line before the ending head tag:

    ...
      <script defer src="https://unpkg.com/tapspace@2.0.0-alpha.1/dist/tapspace.min.js"></script>
    </head>
    ...

The bundle hosted by unpkg.com delivery network is okay for development and toy apps. If you need production-grade performance and reliability, it is best to host the bundle along your other assets or even bundle it with your app code.

Note the [defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) keyword. It ensures the script download does not block the browser from loading the rest of the page.

Let us also add a script tag into which we begin to write the app.

    ...
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          // My first tapspace app
        })
      </script>
    </head>
    ...

We listen for the [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) event to ensure the page and its assets are fully loaded before running our app.

## Step 2: Create a space with content

Inside the body tag, create an empty container element for our space. This element will contain all the space elements and also act as a viewport to the space.

    <div id="mytapspace"></div>

In the script, add the following to register the container as a space.

    ...
    // My first tapspace app
    const space = tapspace.createSpace('#mytapspace')
    ...

Limits of floating point arithmetics are quickly faced in zoomable applications. Therefore, in order to achieve limitless space, the space itself cannot specify a fixed world coordinate system. Instead, we need to create at least one *basis* that provides us a *frame of reference* onto which we can place our content.

    const basis = space.addBasis()

With a basis we can construct *Point* objects:

    const p = basis.at(200, 100)

Let us create our first content item. The item wraps HTML content and provides various methods for interaction and moving it in the space.

    const hello = tapspace.createItem('<strong>Hello</strong>')

The item is not yet added to the space nor DOM. Let us do that.

    basis.add(hello, p)

This will add the hello item at the coordinates { x: 200 y: 100 } relative to the origin of the basis.

Now you can open your `index.html` in your web browser. The result should look something like this:

    TODO insert screenshot here

Great!

## Step 3: Positioning and sizing space elements

Tapspace follows right-handed coordinate system. The three axes are perpendicular to each other. The default orientation is x-axis right, y-axis down, and z-axis away from the viewer.

<p><img src="coordinates_directions_512.png" width="300" height="300" title="Right handed coordinate system"></p>

Unlike normal web pages, the space is infinite. Web browsers like to stretch HTML elements to the width of their container but in infinite space this does not make sense. Therefore, each space element has a fixed size. The default size is 256x256 pixels and resizing is easy:

    hello.setSize({ w: 400, h: 200 })

Fortunately, the inner contents of space elements do not need fixed size. The browsers lay out the contents as usual, treating the space element as the container.

Each space element has also an *anchor*. The anchor gives the otherwise rectangular element a single point-like location in space. This simplifies element placement, for example:

    hello.moveTo(basis.at(50, 20))

Set the anchor with `setAnchor` method:

    hello.setAnchor({ x: 200, y: 100 })

In addition to positioning, the anchor acts as the default pivot point when you scale or rotate the element:

    const deg45 = Math.PI / 4
    hello.rotateBy(deg45)

Also, such transformation methods usually allow a custom pivot point to be used instead of the anchor:

    hello.rotateBy(deg45, hello.atTopRight())

You can move the element around with the [translateBy(vec)](../api#tapspacecomponentsabstractplanetranslateby) method.

    hello.translateBy({ x: 10, y: -20, z: 5 })

Each move updates the CSS3 transform property of your hello element. You can animate the move with the [animate(...)](../api#tapspacecomponentsabstractplaneanimate) method.

    hello.animate({
      duration: '200ms',
      easing: 'linear'
    })
    hello.scaleBy(2)

## Step 4: Navigating the space

Our zoomable app still lacks the zoomability! Let us make the viewport zoomable. We access the viewport through the space.

    const viewport = space.getViewport()
    viewport.zoomable()

If you need only panning without zooming:

    viewport.pannable()

By default the viewport uses orthogonal "flat" projection. To make things feel more 3D, enable the perspective projection:

    viewport.perspective()

You can also chain the ability methods for a bit more compact code:

    viewport.zoomable().perspective()

In most parts the viewport behaves as any other space element. Thus it can be moved around, scaled, and rotated.

    viewport.translateTo(hello.atCenter())

The viewport also provides a basis. Initially, when the space is empty, the viewport it is the only basis we have.
We can use it to position the origin of content bases.

    space.addBasis(viewport.atCenter())

See [Viewport](../api#tapspacecomponentsviewport) for all available viewport methods.

## Step 5: Make elements interactive

Let us allow the world element to be interactive. Like with the viewport we give the space element interactive abilities by calling one or more ability methods.

    world.tappable()
    world.on('tap', function () {
      world.html('<em>WORLD!</em>')
    })

To allow users to move the element around:

    world.draggable()
    world.on('gestureend', function () {
      world.html('You dragged me!')
    })

There are also ability methods for resizing, linear sliding, rotation, and more.

## What next?

See the [example apps](../#examples) and [API documentation](../api). The source code of each example is filled with tutoring comments and useful techniques.
