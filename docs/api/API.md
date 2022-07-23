<a name="top"></a>
# Tapspace API Documentation v2.0.0-alpha.0

Build your zoomable application with the following tools.


<a name="tapspace"></a>
## tapspace

The [tapspace](#tapspace) namespace provides component creation methods,
geometry classes, and namespaces for interaction, effects, and
resource loaders.

- [tapspace.circle](#tapspacecircle)
- [tapspace.Circle](#tapspaceCircle)
- [tapspace.components](#tapspacecomponents)
- [tapspace.Edge](#tapspaceEdge)
- [tapspace.Pixel](#tapspacePixel)
- [tapspace.Point](#tapspacePoint)


Source: [lib/index.js](https://github.com/taataa/tapspace/blob/main/lib/index.js)

<a name="tapspacecircle"></a>
## tapspace.circle(radius, color, options)

Make a circle-shaped element.

Parameters:
- *radius*
  - a number
- *color*
  - a CSS color string
- *options*
  - optional object with properties
    - *id*
      - a string, optional. The id attribute of the element.
    - *className*
      - a string, optional. The class attribute of the element.
    - *anchor*
      - { x, y } on the element. Default {x:0,y:0}

Return
- a Component

Source: [create.js](https://github.com/taataa/tapspace/blob/main/lib/components/Circle/create.js)

<a name="tapspaceCircle"></a>
## tapspace.Circle(radius, color, opts)

A colorful circle.
Instance class for a circle-like object on an affine plane.
Useful for debugging coordinate positions.

Parameters:
- *radius*
  - a number.
- *color*
  - a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
- opts, optional object
  - *id*
    - optional string. The id attribute of the element.
  - *className*
    - optional string. The class attribute of the element.
  - *anchor*
    - optional { x, y } on the element. Default {x:0,y:0}

Source: [Circle/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Circle/index.js)

<a name="tapspacecomponents"></a>
## tapspace.components

Various components to render into the affine space.

- [tapspace.components.AbstractActive](#tapspacecomponentsAbstractActive)
- [tapspace.components.AbstractFrame](#tapspacecomponentsAbstractFrame)
- [tapspace.components.AffineGroup](#tapspacecomponentsAffineGroup)
- [tapspace.components.Layer](#tapspacecomponentsLayer)


Source: [components/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/index.js)

<a name="tapspacecomponentsAbstractActive"></a>
## tapspace.components.AbstractActive(opts)

Interaction methods for affine components.
Designed to be inherited by an instance class that
inherit also from AbstractPlane or down.

Parameters:
- *opts*
  - TODO maybe which capturers are possible?
  - TODO options to autostart capturers, maybe

- [tapspace.components.AbstractActive:capturer](#tapspacecomponentsAbstractActivecapturer)
- [tapspace.components.AbstractActive:capturer](#tapspacecomponentsAbstractActivecapturer)


Source: [AbstractActive/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractActive/index.js)

<a name="tapspacecomponentsAbstractActivecapturer"></a>
## tapspace.components.AbstractActive:capturer(capturerName, opts)

Get or create an input capturer.
For Tapspace internal use.

Parameters:
- *capturerName*
  - a string. One of 'gesture', 'keyboard', 'wheel'
- *opts*
  - options for the capturer.

Returns
- a capturer

Source: [capturer.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractActive/capturer.js)

<a name="tapspacecomponentsAbstractActivecapturer"></a>
## tapspace.components.AbstractActive:capturer(capturerName, opts)

Get or create an input converter.
The converters modify or redirect input events.
For Tapspace internal use.

Parameters:
- *converterName*
  - a string. One of 'mouse'
- *opts*
  - options for the converter.

Returns
- a converter

Source: [converter.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractActive/converter.js)

<a name="tapspacecomponentsAbstractFrame"></a>
## tapspace.components.AbstractFrame(element, opts)

Abstract class for rectangular affine components

Parameters:
- *element*
  - a HTMLElement. The element does not need to be in DOM.
- *opts*
  - *anchor*
    - { x, y } on the element. Optional. Default {x:0, y:0}
  - *size*
    - { width, height } or { w, h }.

- [tapspace.components.AbstractFrame:atBottomLeft](#tapspacecomponentsAbstractFrameatBottomLeft)
- [tapspace.components.AbstractFrame:atBottomMid](#tapspacecomponentsAbstractFrameatBottomMid)
- [tapspace.components.AbstractFrame:atBottomRight](#tapspacecomponentsAbstractFrameatBottomRight)
- [tapspace.components.AbstractFrame:atCenter](#tapspacecomponentsAbstractFrameatCenter)
- [tapspace.components.AbstractFrame:atMid](#tapspacecomponentsAbstractFrameatMid)
- [tapspace.components.AbstractFrame:atMidLeft](#tapspacecomponentsAbstractFrameatMidLeft)
- [tapspace.components.AbstractFrame:atMidMid](#tapspacecomponentsAbstractFrameatMidMid)
- [tapspace.components.AbstractFrame:atMidRight](#tapspacecomponentsAbstractFrameatMidRight)
- [tapspace.components.AbstractFrame:atNorm](#tapspacecomponentsAbstractFrameatNorm)
- [tapspace.components.AbstractFrame:atToNorm](#tapspacecomponentsAbstractFrameatToNorm)
- [tapspace.components.AbstractFrame:atTopLeft](#tapspacecomponentsAbstractFrameatTopLeft)
- [tapspace.components.AbstractFrame:atTopMid](#tapspacecomponentsAbstractFrameatTopMid)
- [tapspace.components.AbstractFrame:atTopRight](#tapspacecomponentsAbstractFrameatTopRight)
- [tapspace.components.AbstractFrame:centerTo](#tapspacecomponentsAbstractFramecenterTo)
- [tapspace.components.AbstractFrame:getSize](#tapspacecomponentsAbstractFramegetSize)
- [tapspace.components.AbstractFrame:setSize](#tapspacecomponentsAbstractFramesetSize)


Source: [AbstractFrame/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/index.js)

<a name="tapspacecomponentsAbstractFrameatBottomLeft"></a>
## tapspace.components.AbstractFrame:atBottomLeft()

Get point at the bottom left corner of the element.

Return
- point2 on the element

Source: [atBottomLeft.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atBottomLeft.js)

<a name="tapspacecomponentsAbstractFrameatBottomMid"></a>
## tapspace.components.AbstractFrame:atBottomMid()

Get point at the middle of the bottom edge of the element.

Return
- point2 on the element

Source: [atBottomMid.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atBottomMid.js)

<a name="tapspacecomponentsAbstractFrameatBottomRight"></a>
## tapspace.components.AbstractFrame:atBottomRight()

Get point at the bottom right corner of the element.

Return
- point2 on the element

Source: [atBottomRight.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atBottomRight.js)

<a name="tapspacecomponentsAbstractFrameatCenter"></a>
## tapspace.components.AbstractFrame:atCenter()

Alias of [tapspace.components.AbstractFrame:atMid](#tapspacecomponentsAbstractFrameatMid), [tapspace.components.AbstractFrame:atMidMid](#tapspacecomponentsAbstractFrameatMidMid)

Source: [atMidMid.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atMidMid.js)

<a name="tapspacecomponentsAbstractFrameatMid"></a>
## tapspace.components.AbstractFrame:atMid()

Get point at the middle the element.

Return
- point2 on the element

Aliases: [tapspace.components.AbstractFrame:atMidMid](#tapspacecomponentsAbstractFrameatMidMid), [tapspace.components.AbstractFrame:atCenter](#tapspacecomponentsAbstractFrameatCenter)

Source: [atMidMid.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atMidMid.js)

<a name="tapspacecomponentsAbstractFrameatMidLeft"></a>
## tapspace.components.AbstractFrame:atMidLeft()

Get point at the middle of the left edge of the element.

Return
- point2 on the element

Source: [atMidLeft.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atMidLeft.js)

<a name="tapspacecomponentsAbstractFrameatMidMid"></a>
## tapspace.components.AbstractFrame:atMidMid()

Alias of [tapspace.components.AbstractFrame:atMid](#tapspacecomponentsAbstractFrameatMid), [tapspace.components.AbstractFrame:atCenter](#tapspacecomponentsAbstractFrameatCenter)

Source: [atMidMid.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atMidMid.js)

<a name="tapspacecomponentsAbstractFrameatMidRight"></a>
## tapspace.components.AbstractFrame:atMidRight()

Get point at the middle of the right edge of the element.

Return
- point2 on the element

Source: [atMidRight.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atMidRight.js)

<a name="tapspacecomponentsAbstractFrameatNorm"></a>
## tapspace.components.AbstractFrame:atNorm(rx, ry)

Get point by relative coordinates.

Parameters:
- *rx*
  - number. 0 at left edge, 1 at right edge.
- *ry*
  - number. 0 at top edge, 1 at bottom edge.

Return
- Point on the element

Source: [atNorm.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atNorm.js)

<a name="tapspacecomponentsAbstractFrameatToNorm"></a>
## tapspace.components.AbstractFrame:atToNorm(x, y)

Get relative coordinates for the given point.
For example, relative coords of point (2, 1) in size (4, 4) is (0.5, 0.25)

Parameters:
- *x*
  - a number or a Point
- *y*
  - a number

Return
- a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }

Source: [atToNorm.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atToNorm.js)

<a name="tapspacecomponentsAbstractFrameatTopLeft"></a>
## tapspace.components.AbstractFrame:atTopLeft()

Get point at the top left corner of the element.

Return
- point2 on the element

Source: [atTopLeft.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atTopLeft.js)

<a name="tapspacecomponentsAbstractFrameatTopMid"></a>
## tapspace.components.AbstractFrame:atTopMid()

Get point at the middle of the top edge of the element.

Return
- point2 on the element

Source: [atTopMid.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atTopMid.js)

<a name="tapspacecomponentsAbstractFrameatTopRight"></a>
## tapspace.components.AbstractFrame:atTopRight()

Get point at the top right corner of the element.

Return
- point2 on the element

Source: [atTopRight.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/atTopRight.js)

<a name="tapspacecomponentsAbstractFramecenterTo"></a>
## tapspace.components.AbstractFrame:centerTo(position)

Move component so that its middle point matches the given point.
Let the position f component on the parent.
This moves the component anchor to the given position
and rotates and scales the component as specified.

Parameters:
- *position*
  - a point { x, y } on the parent or a Point. Required. The component will be moved on the parent so that the center of the component matches the position.

Return
- this, for chaining

Source: [centerTo.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/centerTo.js)

<a name="tapspacecomponentsAbstractFramegetSize"></a>
## tapspace.components.AbstractFrame:getSize()

Get component size dimensions in pixels.

Return
- a Size

Source: [getSize.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/getSize.js)

<a name="tapspacecomponentsAbstractFramesetSize"></a>
## tapspace.components.AbstractFrame:setSize(size)

Set component size.

Parameters:
- *size*
  - a {w,h}, a {width,height}, or a Size. If {w,h} or {width,height} format is used, the dimensions can be either number of pixels or CSS length strings. Note that if the component is not yet in DOM, relative length units might not work.

Return
- this, for chaining

Source: [setSize.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractFrame/setSize.js)

<a name="tapspacecomponentsAffineGroup"></a>
## tapspace.components.AffineGroup

Inherits [tapspace.components](#tapspacecomponents).AbstractPlane

A set of affine components.
The group element has zero width and height.
Still, it can be interacted on its content.

Source: [Group/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Group/index.js)

<a name="tapspacecomponentsLayer"></a>
## tapspace.components.Layer(z)

Inherits [tapspace.components](#tapspacecomponents).AbstractPlane

Layers does not have size.
A Layer must be a children of a Space.

Parameters
- *z*
  - optional number. The depth coordinate for perspective viewports.

Source: [Layer/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Layer/index.js)

<a name="tapspaceEdge"></a>
## tapspace.Edge(border, opts)

Edge is an instance class for a div with one visible border.
It can be used as a line that connects components.

Parameters:
- *border*
  - *string*
    - A CSS border style e.g. '1px solid #ff2200'
  - object with properties
    - width: number or string, e.g. 10 or '10px' or '1em'
    - style: string, e.g. 'solid'
    - color: string, e.g. 'red'
- opts, optional object
  - *id*
    - optional string. The id attribute of the element.
  - *className*
    - optional string. The class attribute of the element.
  - *anchor*
    - optional { x, y } on the element. Default {x:0,y:0}

- [tapspace.Edge:atEnd](#tapspaceEdgeatEnd)
- [tapspace.Edge:atStart](#tapspaceEdgeatStart)
- [tapspace.Edge:getLength](#tapspaceEdgegetLength)
- [tapspace.Edge:setPoints](#tapspaceEdgesetPoints)


Source: [Edge/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/index.js)

<a name="tapspaceEdgeatEnd"></a>
## tapspace.Edge:atEnd()

Get the Point at the edge ending, at the middle of the border.

Return: a Point

Source: [Edge/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/index.js)

<a name="tapspaceEdgeatStart"></a>
## tapspace.Edge:atStart()

Get the Point at the edge beginning, at the middle of the border.

Return: a Point

Source: [Edge/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/index.js)

<a name="tapspaceEdgegetLength"></a>
## tapspace.Edge:getLength()

Get length of the edge in local pixels.

Return
- a number, pixels on the edge plane.

Source: [getLength.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/getLength.js)

<a name="tapspaceEdgesetPoints"></a>
## tapspace.Edge:setPoints(startPoint, endPoint)

Set edge start and end points.
Note that this does not scale the edge.

Parameters:
- *startPoint*
  - a Point
- *endPoint*
  - a Point

Return
- this, for chaining

Source: [Edge/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/index.js)

<a name="tapspacePixel"></a>
## tapspace.Pixel(color, opts)

Instance class for a 1x1 pixel on affine plane.

Parameters:
- *color*
  - a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
- opts, optional object
  - *id*
    - optional string. The id attribute of the element.
  - *className*
    - optional string. The class attribute of the element.
  - *anchor*
    - optional { x, y } on the element. Default {x:0,y:0}

Source: [Pixel/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Pixel/index.js)

<a name="tapspacePoint"></a>
## tapspace.Point(basis, x, y)

A 2D point on a plane.

Parameters
- *basis*
  - a Component
- *x*
  - a number
- *y*
  - a number

Example
```
let p = new tapspace.Point(basis, x, y)
```

- [tapspace.Point:distanceTo](#tapspacePointdistanceTo)
- [tapspace.Point:offset](#tapspacePointoffset)
- [tapspace.Point:plain](#tapspacePointplain)
- [tapspace.Point:polarOffset](#tapspacePointpolarOffset)
- [tapspace.Point:round](#tapspacePointround)
- [tapspace.Point:vectorTo](#tapspacePointvectorTo)
- [tapspace.Point.fromAverage](#tapspacePointfromAverage)


Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacePointdistanceTo"></a>
## tapspace.Point:distanceTo(p)

Distance between points.

Parameters:
- *p*
  - a Point or {x,y}. The latter is assumed to be on the same plane.

Return
- a Distance

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacePointoffset"></a>
## tapspace.Point:offset(dx, dy)

Get a point when the current point is offset by dx and dy.

Parameters:
- *dx*
  - a number of pixels to move horizontally on the basis.
- *dy*
  - a number of pixels to move vertically on the basis.

Return
- a Point

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacePointplain"></a>
## tapspace.Point:plain()

Return plain point2 object {x,y} without basis data.

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacePointpolarOffset"></a>
## tapspace.Point:polarOffset(distance, angle)

Get the point at the given distance at the angle.

Parameters:
- *distance*
  - a number on the basis or a Distance.
- *angle*
  - a number in radians on the basis or a Direction.

Return
- a Point

Source: [polarOffset.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/polarOffset.js)

<a name="tapspacePointround"></a>
## tapspace.Point:round()

Round the point to nearest integers.

Return
- a Point

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacePointvectorTo"></a>
## tapspace.Point:vectorTo(p)

Get a vector from this to the point p.

Parameters:
- *p*
  - a Point

Return:
- a Vector on this basis.

Source: [vectorTo.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/vectorTo.js)

<a name="tapspacePointfromAverage"></a>
## tapspace.Point.fromAverage(basis, points)

Mean of an array of points.

Parameters:
- *basis*
  - a Plane
- *points*
  - an array of Point instances

Return
- a Point on the given basis

Example
```
const mean = tapspace.Point.fromAverage(basis, points)
```

Source: [average.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/average.js)

<p style="text-align: right">
<a href="#top">&uarr; Back To Top</a>
</p>

