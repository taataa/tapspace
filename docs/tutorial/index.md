
# Tutorial

Ready to build your first Tapspace app? You have come to the right place. Here we go through the basics from setting up a *space* to hold your content, a *viewport* to navigate your content, and how to place elements into the space.

In this tutorial we assume you have basic knowledge on web programming concepts such as HTML, CSS, DOM, and JavaScript.

## Create a web app

Create a directory named `tapspace-hello` and in it a file `index.html` with the following content:

    insert html boilerplate here

Adjust the title to your liking.

## Install tapspace

Add script line:

    <script src="todo cdn link here"></script>

Let us also add empty script tag in which we begin to write the app.

    <script>
      // My first tapspace app
    </script>

## Create a space

Create an empty container element. This will contain all the space elements and also act as a viewport to the space.

    <div id="mytapspace"></div>

In the script init the space.

    const space = tapspace.create('#mytapspace')

## Create a space element

Then we create our first space element. This does not yet add the element to the space, that we do later.

    const hello = tapspace.element('<strong>Hello</hello>', {
      size: { width: 300, height: 300 },
      anchor: { x: 150, y: 150 }
    })

Why size? Unlike normal web pages, the space is infinite. Therefore, we must set the size for the elements. The default size is 256x256 pixels.

The anchor point defines the default point on the element. For example, if you place the element at viewport (200,100) the element will be moved so that its anchor point aligns with the viewport at (200,100).

## Add the element to the space

Now we can add the element to the space.

    const plane = space.createPlane()
    plane.add(hello, plane.at(200, 100))

In order to achieve infinite zoomability, Tapspace has no fixed world coordinates. Instead, you define positions as relative to things like the viewport and other elements.

## Make the viewport zoomable

    const viewport = space.getViewport()
    viewport.zoomable()

## Make the element interactive

    hello.tappable()
    hello.on('tap', function () {
      hello.html('<em>Hello World!</em>')
    })

## What next?

See the example apps and API documentation.
