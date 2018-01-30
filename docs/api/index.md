# Taaspace API

Contents:
- [Module](#module)
  - [taaspace](#taaspace)
  - [taaspace.version](#taaspace-version)
- [Items](#items)
  - [taaspace.Space](#taaspace-space)
  - [taaspace.SpaceGroup](#taaspace-spacegroup)
  - [taaspace.SpaceHTML](#taaspace-spacehtml)
  - [taaspace.SpaceImage](#taaspace-spaceimage)
  - [taaspace.SpacePixel](#taaspace-spacepixel)
- [Abstract Items](#abstract-items)
  - [taaspace.AbstractNode](#taaspace-abstractnode)
  - [taaspace.AbstractPlane](#taaspace-abstractplane)
  - [taaspace.AbstractRectangle](#taaspace-abstractrectangle)
- [Tools](#tools)
  - [taaspace.geom](#taaspace-geom)
  - [taaspace.preload](#taaspace-preload)

## Module

### taaspace

Usage:

    var taaspace = require('taaspace')

### taaspace.version

A semantic version string identical to the version in `package.json`.



## Items


### taaspace.Space

The root for other items.

**Inherits** from `AbstractPlane`.

**Overwrites** `setParent` to throw an error if used. Effectively prevents the space to have a parent.

**Usage:**

    var space = new taaspace.Space()


### taaspace.SpaceGroup

A collection of items. `SpaceGroup` itself has no representation, only its children.

**Inherits** from `AbstractPlane`.

**Usage:**

    > var g = new taaspace.SpaceGroup(parent)
    > var px = new taaspace.SpacePixel(g)


### taaspace.SpaceHTML

A rectangular item with custom HTML content. `SpaceView` represents the content as-is. Be careful when injecting content from users. Good for example for text, iframes, or canvas elements.

**Inherits** from `AbstractRectangle`.

**Initial size** is 256 x 256.

**Usage:**

    > var h = new taaspace.SpaceHTML(parent, '<h1>Hell-o</h1>')
    > h.getHTML()
    '<h1>Hell-o</h1>'

**Method** `#getHTML()` returns string.


### taaspace.SpaceImage

An image item. `SpaceView` represents this with an `<img>` tag. The constructor requires an [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement). Use [taaspace.preload](#taaspace-preload) to ensure the image has correct dimensions before constructing a `SpaceImage`.

**Inherits** from `AbstractRectangle`.

**Initial size** equals to the dimensions of the given image.

**Usage:**

    > taaspace.preload(function (err, img) {
    >   var im = new taaspace.SpaceImage(parent, img)
    > })

**Method** `#getImage()` returns HTMLImageElement.


### taaspace.SpacePixel

A colored rectangular item. `SpaceView` represents this with a `<div>` styled with CSS `background` property. The constructor takes in a string value for the `background`, defaulting to `#000000`.

**Inherits** from `AbstractRectangle`.

**Initial size** is 1x1.

**Usage:**

    > var px = new taaspace.SpacePixel(parent, 'pink')

**Method** `#getColor()` returns the background property string.


### taaspace.SpaceView

A viewport to the `Space`. Renders the items in HTML and CSS. Positions the rendered elements with [CSS3 transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform).

**Inherits** from `AbstractRectangle`.

**Listens** events: added, removed, transformed, resized, contentAdded, contentRemoved

**Usage:**

    > var view = new taaspace.SpaceView(space)

**Method** `#fitScale(...)` overrides `AbstractRectangle#fitScale(...)` to throw an error if the view is not mounted.

**Method** `#getElementBySpaceItem(item)` returns `HTMLElement` rendered for the item in this view. Returns `null` if the item has no HTMLElement in this view.

**Method** `#getContainer()` returns the `HTMLElement` given with `#mount(htmlContainer)`. Returns `null` if the view is not mounted.

**Method** `#getSpaceItemByElementId(id)` returns an item associated with an `HTMLElement` with the given id attribute or `null` if not found.

**Method** `#isMounted()` returns `true` if the view is mounted onto a container.

**Method** `#mount(htmlContainer)` attaches the view into the given `HTMLElement`. This starts a rendering process where the items in `Space` are rendered in HTML and listened for changes.

**Method** `#setParent(item)` overrides `AbstractNode#setParent(item)` to ensure only a `Space` is allowed for the parent.

**Method** `#unmount()` undoes `#mount(htmlContainer)` and clears the container.



## Abstract Items

The items inherit from their abstract prototypes. The image below gives an overview on the prototype chain.

![taaspace module dependency graph](taaspace_api_3.png?raw=true)

*Image: The module dependency graph represents the relationships between Taaspace modules. Diamond denotes composition: AbstractNode has other AbstractNodes. Arrow head denotes inheritance: AbstractRectangle is an AbstractPlane, AbstractPlane is an AbstractNode et cetera.*

## taaspace.AbstractNode

Gives an inheriting object the tree node capabilities like fetching the children and ancestor nodes.

**Inherits** from `Emitter`. See API details at [component-emitter](https://www.npmjs.com/package/component-emitter).

**Method** `#addChild(item)` does what the name says.

**Method** `#emit(eventName, arg1, arg2, ...)` emits an event. See [component-emitter](https://www.npmjs.com/package/component-emitter).

**Method** `#getAncestors()` returns an array of items, the parent at `[0]`, the parent's parent at `[1]`, et cetera.

**Method** `#getChildren()` returns an array of items.

**Method** `#getDescendants()` returns an array of items, including children, the childrens' children, et cetera.

**Method** `#getParent()` returns the parent item and null if no parent.

**Method** `#getRootParent()` returns the most distant ancestor, the one without a parent.

**Method** `#hasChild(item)` returns `true` if `item` is a child of `this`.

**Method** `#hasDescendant(item)` returns `true` if `this` an ancestor of `item`.

**Method** `#isRoot()` return `true` if `this` has no parent.

**Method** `#off(eventName, handlerFn)` removes the event handler. See [component-emitter](https://www.npmjs.com/package/component-emitter).

**Method** `#on(eventName, handlerFn)` registers an event handler. See [component-emitter](https://www.npmjs.com/package/component-emitter).

**Method** `#remove()` detaches `this` from the parent.

**Method** `#setParent(item)` removes `this` from the current parent and attaches it as a child of `item`.



## taaspace.AbstractPlane

Gives an inheriting object capabilities to act as a coordinate plane. Each AbstractPlane has a `Transform` that defines the position of the plane in relation to its parent plane. `Transform` is a transformation matrix that allows rotations, scalings, and translations. The matrix maps a vector on the plane to another vector on the parent plane.

**Inherits** from `AbstractNode`.

**Listens** event `removed` to ensure a root element has no transformation.

**Method** `#at(x, y)` or `#at(vector)` returns an `IVector` at the position (x, y) on `this`.

**Method** `#getGlobalITransform()` returns an `ITransform`, a plane-invariant version of the total transformation from `this` to the root's coordinate system.

**Method** `#getGlobalTransform()` returns an `Transform`, the total transformation from `this` to the root's coordinate system.

**Method** `#getLocalITransform()` returns an `ITransform`, a plane-invariant version of the local transform. Where `#getLocalTransform` tells the effect of the plane's local transformation in the parent's coordinate system, `#getLocalITransform` tells the local effect in the global scope.

**Method** `#getLocalTransform()` returns a `Transform`, the coordinate mapping from `this` to the parent plane.

**Method** `#resetTransform()` is a shortcut for `#setLocalTransform(Transform.IDENTITY)`. Emits `transformed`.

**Method** `#setLocalTransform(tr)` takes a `Transform` or `ITransform` and replaces the local transformation. Emits `transformed`.

**Method** `#setGlobalTransform(tr)` takes a `Transform` or `ITransform` and updates the local transformation so that the global transformation becomes equal to `tr`. Emits `transformed`.

**Method** `#snap(pivot, igrid)` updates the local transformation so that the given pivot `IVector` snaps to the given `IGrid`. Emits `transformed`.

**Method** `#transformBy(tr)` takes a `Transform` or `ITransform` and multiplies the local transformation matrix from the left. For example, if a plane is already rotated by 45 degrees then `#transformBy(rotate90)` rotates the plane 90 degrees, thus setting the total rotation to 135 degrees. Emits `transformed`.

**Method** `#translate(domain, range)` moves `this` horizontally and vertically so that the given domain (an array of `IVector`s) travels as close to the range (a matching length array of `IVector`s) as possible. If only single `IVector`s are given, the array can be omitted. Emits `transformed`.

**Method** `#scale(pivot, multiplier)` or `#scale(pivot, domain, range)` scales `this` around the `IVector pivot`. A `multiplier` of `2` would double the dimensions of `this` on the parent plane. If `domain` and `range` are given, `this` becomes scaled so that domain becomes as close to range as possible, like described at `#translate`. Emits `transformed`.

**Method** `#rotate(pivot, radians)` or `#rotate(pivot, domain, range)` is similar to `#scale` but rotates instead of scaling.

**Method** `translateScale(domain, range)` is similar to `#scale` but allows both translation and scaling.

**Method** `translateRotate(domain, range)` is similar to `#scale` but allows both translation and rotation.

**Method** `scaleRotate(pivot, domain, range)` is similar to `#scale` but allows both scaling and rotation around a `IVector pivot`.

**Method** `translateScaleRotate(domain, range)` is similar to `#scale` but allows each translation, scaling, and rotation.



## taaspace.AbstractRectangle

Gives an inheriting object a rectangular shape and size dimensions.

**Inherits** from `AbstractPlane`.

**Method** `#atNorm(x, y)` returns `IVector` from a point relative to the rectangle dimensions. For example `#atNorm(0, 1)` gives the bottom-left corner and `#atNorm(0.5, 0.5)` gives the middle point.

**Method** `#atMid()` is alias for `#atNorm(0.5, 0.5)`.

**Method** `#atMidN()` is alias for `#atNorm(0.5, 0)`.

**Method** `#atMidW()` is alias for `#atNorm(0, 0.5)`.

**Method** `#atMidE()` is alias for `#atNorm(1, 0.5)`.

**Method** `#atMidS()` is alias for `#atNorm(0.5, 1)`.

**Method** `#atNW()` is alias for `#atNorm(0, 0)`.

**Method** `#atNE()` is alias for `#atNorm(1, 0)`.

**Method** `#atSW()` is alias for `#atNorm(0, 1)`.

**Method** `#atSE()` is alias for `#atNorm(1, 1)`.

**Method** `#fitScale(ipath)` translates and scales `this` so that the rectangle encloses the given `IPath` precisely. The local size is not altered. Emits `transformed`.

**Method** `#fitSize(ipath)` translates and resizes `this` so that the rectangle encloses the given `IPath` precisely. The local size and the width-height ratio is probably altered. Emits `transformed` and `resized`.

**Method** `#getHull()` returns `IPath` that consists of the corners of the rectangle in counter-clockwise order (the hull order).

**Method** `#getLocalSize()` return `Vector`, representing the diagonal in the local coordinates.

**Method** `#getSize()` return `IVector`, representing the diagonal.

**Method** `#setSize(idiag)` updates the diagonal to match the given `IVector`. Dangerous currently because rotations affect the width-height ratio. Emits `resized`.

**Method** `#setLocalSize(diag)` updates the diagonal to match the given `Vector`. Emits `resized`.


## Tools

## taaspace.geom

A module for geometric models, including `Vector`, `Path`, `Transform` and their plane-invariant representations. See [api/geom](geom) for further documentation.


### taaspace.preload

A function to preload an image file or an array of them and call back when finished. As the main benefit, code in the callback can trust the dimensions of the image object.

**Details:** see [loadimages](https://www.npmjs.com/package/loadimages).

**Usage:**

    taaspace.preload('mylittle.png', function (err, img) {
      if (err) { throw err }
      // img is now loaded and has correct dimensions instead of 0x0.
      var si = new taaspace.SpaceImage(space, img)
    })
