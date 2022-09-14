# API Reference

Contents:
- [Module](#module)
  - [t = tapspace](#tapspace)
  - [t.version](#tapspaceversion)
  - [t.SpaceView](#tapspacespaceview)
  - [sel = t.SpaceElement](#tspaceelement)
- [Interaction](#interaction)
  - [sel.touchable](#tapspacetouchable)
  - [sel.wheelable](#tapspacewheelable)
- [Geometry](#geometry)
  - [t.Grid](#tapspacegeomgrid)
  - [t.SpaceGrid](#tapspacegeomigrid)
  - [t.Path](#tapspacegeompath)
  - [t.SpacePath](#tapspacegeomipath)
  - [t.Size](#tapspacegeomsize)
  - [t.SpaceSize](#tapspacegeomisize)
  - [t.Tran](#tapspacegeomtransform)
  - [t.SpaceTran](#tapspacegeomitransform)
  - [t.Point4](#tapspacegeomvector)
  - [t.SpacePoint4](#tapspacegeomivector)
  - [t.Delta4](#t.ivector)
  - [t.SpaceDelta4](#t.ivector)
- [Other](#other)
  - [t.preload](#t.preload)
- [Definitions](#definitions)
  - [Hull order](#hull-order)



## SpaceElement

**Method** `#scale(pivot, multiplier)` or `#scale(pivot, domain, range)` scales `this` around the `IVector pivot`. A `multiplier` of `2` would double the dimensions of `this` on the parent plane. If `domain` and `range` are given, `this` becomes scaled so that domain becomes as close to range as possible, like described at `#translate`. Emits `transformed`.

**Method** `#rotate(pivot, radians)` or `#rotate(pivot, domain, range)` is similar to `#scale` but rotates instead of scaling.

**Method** `translateScale(domain, range)` is similar to `#scale` but allows both translation and scaling.

**Method** `translateRotate(domain, range)` is similar to `#scale` but allows both translation and rotation.

**Method** `scaleRotate(pivot, domain, range)` is similar to `#scale` but allows both scaling and rotation around a `IVector pivot`.

**Method** `translateScaleRotate(domain, range)` is similar to `#scale` but allows each translation, scaling, and rotation.

**Experimental Method** `setLocal3d(pivot, vec3)` can be used to place objects with 3D coordinates. The method takes a `Vector` vanishing point and a literal 3D point `{ x, y, z }`. The `z` property acts as a distance i.e. a perspective scaling factor towards the vanishing point. The `x` and `y` properties describe translation at the distance `z`. The method replaces the local transformation with a translate-scale transformation.

**Emits** `resized` with a payload `{ source: <AbstractFrame>, newSize: <Size>, oldSize: <Size> }`.

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

**Method** `#getHull()` returns `IPath` that consists of the corners of the rectangle in counter-clockwise order i.e. the [hull order](#hull-order).

**Method** `#getSize()` return `Size`, representing the dimensions in the local coordinates.

**Method** `#getISize()` return `ISize`, representing the dimensions in plane-invariant manner.

**Method** `#setSize(size)` updates the local size to match the given `Size`. Emits `resized`. Alternatively, use `#setSize(width, height)`.

**Method** `#setISize(isize)` updates the local size to match the given `ISize`. Emits `resized`.

### Interaction

### sel.touchable() => Touch

To allow users to directly interact with the items, make the items touchable. `Touchable` is an input manager that maps touch and mouse events on HTML to a transformation and applies the transformation to a given item.

**Usage:**

    > var tou = new tapspace.Touchable(view, item);

**Constructor** `Touchable(view, item)` takes in the parameters:

- *view:* a mounted instance of `SpaceView`. Only the gestures made on this view will be listened and recognized.
- *item:* an instance of `AbstractPlane` such as `SpaceHTML`, `SpacePixel`, `SpaceGroup`, or `SpaceView`. Only gestures made on the HTML representation of the `item` are listened and recognized. The `item` reacts to the manipulations as specified by the mode. The view must have rendered an element for the `item` or otherwise an error is thrown.
- *targetItem:* optional `function` or a target instance of `AbstractPlane`. If specified, the recognized transformations are applied to this `targetItem` instead of `item`. This way you can for example implement a drag or rotation handles for a larger item. If a function was given instead of an item, it is called each time a transformation is recognized and ready to be applied. The function is given a `ITransform` as the first argument.

**Methods:**

- *start(mode):* enables the interaction in the given mode. If no mode is given, the default mode is used. Can be called again to update the mode.
- *restart(mode):* alias of `start(mode)` but can make the code more readable when actually updating the mode instead of `start`.
- *stop():* disables the interaction. No events are fired or events listened anymore. Forgets the mode.
- *resume():* starts the manager with the last known mode.

**Mode:**

The mode object defines the allowed types of manipulation. Some types are not possible together so a type can override another. The full list of the mode properties and their conflicts is given below.

- *translate:* set `true` to allow horizontal and vertical movement. Default is `false`. If `pivot` is specified the value of `translate` has no effect.
- *rotate:* set `true` to allow rotation. If `translate: false` and `pivot` is not specified the rotation is allowed only around the center of the item. Default is `false`.
- *scale:* set `true` to allow scaling. If `translate: false` and `pivot` is not specified the scaling is allowed only around the center of the item. Default is `false`.
- *pivot:* set to a `IVector` to specify a pivot for rotation and scaling. If `pivot` is specified the value of `translate` has no effect. Default is `null`.
- *tap:* set to `true` to allow emitting of `tap` event. Default is `false`.
- *tapMaxTravel:*  Default is 20.
- *preventDefault:* set `true` to cancel handled touch and mouse events. Set `false` to let `Touchable` managers higher in the DOM also handle the events. Default is `true`. **Warning:** The default value will change in v2 to `false`. Therefore to make your app forward compatible, always specify `preventDefault`.

The default mode is accessible at `Touchable.DEFAULT_MODE`.

**Events:**

The manager emits the following events:

- *gesturestart:* fired at the beginning of the gesture when the first pointer lands on the element.
- *gesturemove:* fired when a pointer on the element moves so that the transformation changes.
- *gestureend:* fired when the last pointer is lifted off from the element.
- *tap:* fired if all the following statements are true: 1) mode has `tap: true`, 2) last finger or other pointer was lifted from the element, and 3) pointers did not move during the gesture more in average than what is allowed by a threshold value. The default threshold of `20` can be overridden by an additional mode property `tapMaxTravel`.

The events are fired with an event object. The event object has the following properties:

- *distance:* a number. An average manhattan distance in screen pixels that a pointer has traveled after `gesturestart`.
- *duration:* a number. Milliseconds from the `gesturestart`
- *element:* a `HTMLElement`. The source of the original pointer events.
- *item:* an `AbstractPlane`. The item of the HTMLElement.
- *points:* available only for `tap` event. A list of `IVector`s that give the locations where the pointers touched the space. Consider using `IVector.mean` to combine them.


### sel.wheelable() => Wheel

To manipulate items and views with mouse wheel make them *wheelable*.
The `Wheelable` is an input manager that maps [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/Events/wheel) to item manipulations, for example to zoom a view.

**Usage:**

    > var wheel = new tapspace.Wheelable(view, item)
    > wheel.start({ scale: true })

**Constructor** `Wheelable(view, item, targetItem)` takes in a `SpaceView` where the interaction happens and an `item`, an instance of `AbstractPlane` to transform. The `view` must have rendered an element for the `item` or otherwise an error is thrown. An optional `targetItem` can be a `function` or an instance of `AbstractPlane` and is used as an alternative target for recognized transformation. If a `targetItem` is a function, it receives a `ITransform` as the first argument and is called each time an item would have been transformed.

**Methods** are identical to [tapspace.Touchable](#tapspacetouchable) with the exception of mode properties and emitted events defined below.

**Mode** object defines the allowed types of manipulation. Some types collide in the way they interpret events and can thus override each other. The full list of the mode properties and their conflicts is given below.

- `scale`: set `true` to allow scaling around the mouse pointer. Default is `false`.
- `translate`: set `true` to allow horizontal and vertical scroll. Default is `false`. If also `scale: true` then only horizontal scroll is enabled as the vertical wheel spin goes to scaling (`deltaY` property of `WheelEvent`).
- `rotate`: set `true` to allow rotation around the mouse pointer. Default is `false`. Enabled only for 3D mouses (devices that use `deltaZ` property of `WheelEvent`).
- `endInterval`: a `number` of milliseconds to wait for a `wheel` event before emitting `gestureend`. Default is `200`.

The default mode is accessible at `Wheelable.DEFAULT_MODE`.

**Events** are emitted to allow the app to react in additional ways.

- `gesturestart` is emitted at first wheel move.
- `gesturemove` is emitted at each wheel move but after `gesturestart` and before `gestureend`.
- `gestureend` is emitted `endInterval` milliseconds after the last wheel move.
- `wheel` is emitted at each wheel move. Deprecated in v2, use `gesturemove` instead.

The events are fired with an event object having the following properties:

- `element`: an `HTMLElement`. The source of the original `wheel` event.
- `item`: an `AbstractPlane`. The item that was transformed.
- `originalEvent`: the original `wheel` event



## Geometry

### t.geom

A collection of geometric models. All models under `geom` are *immutable* i.e. their state does not change. For example, `vector.rotate(Math.PI)` does not change `vector` but instead returns a new, rotated `Vector` instance.


### t.geom.Grid

A `Grid` is a tool to round transformations to their closest alternatives allowed by the grid. In other words, you can snap items to discrete positions. In addition to xy-lattice, you can also snap scales and rotations.

### t.geom.IGrid

An `IGrid` is a plane-invariant grid that can be converted to plane-dependent `Grid` by calling `#to` method.

### t.geom.Path

A `Path` is an ordered sequence of `Vector`s. See `IPath` for plane-invariant alternative.

### t.geom.IPath

A `IPath` is an ordered sequence of `IVector`s and a plane-invariant alternative for `Path`.

### t.geom.Size

An object with width and height. The `Size` does not have location or rotation and is affected only by scaling. If you need to represent a rectangular shape on multiple planes, use `IPath` instead.

### t.geom.ISize

A plane-invariant size, a container of two plane-invariant measures. With `ISize` you can convert `Size` objects into other coordinate systems.

### t.geom.IScalar

A plane-invariant measure.

### t.geom.Tran

### t.geom.ITran

A plane-invariant `Transform`. Similarly as a `Vector` can be represented in multiple coordinate systems,
so can a transformation. To free users from thinking about which representation is the correct one for a given situation, we have `ITransform`.

### t.geom.point4

A point in 4D space: { x, y, z, r } where

- x is horizontal
- y is vertical
- z is depth and equivalent to *perspective scaling* towards { x, y }
- r is rotation around { x, y }

The point4 has a self-singular origin {x, y}. The { x: 0, y: 0} is not the origin for this point.

### t.geom.move4

A move in 4D space: { dx, dy, dz, dr }

### tapspace.geom.dommove4

A point4 on a DOM element. The .el property defines the coordinate system. Convert onto other DOM element on the tapspace subtree.

### tapspace.geom.dommove4

A move4 on a DOM element. The .el property defines the coordinate system.


## Other

### tapspace.preload

A function to preload an image file or an array of them and call back when finished. As the main benefit, code in the callback can trust the dimensions of the image object.

**Details:** see [loadimages](https://www.npmjs.com/package/loadimages).

**Usage:**

    tapspace.preload('mylittle.png', function (err, img) {
      if (err) { throw err }
      // img is now loaded and has correct dimensions instead of 0x0.
      var si = new tapspace.SpaceImage(space, img)
    })
