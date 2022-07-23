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

