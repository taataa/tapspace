<a name="top"></a>
# Tapspace API Documentation v2.0.0-alpha.0

Build your zoomable application with the following tools.


<a name="tapspace"></a>
## tapspace

The [tapspace](#tapspace) namespace provides component creation methods,
geometry classes, and namespaces for interaction, effects, and
resource loaders.

- [tapspace.circle](#tapspacecircle)
- [tapspace.components](#tapspacecomponents)
- [tapspace.geometry](#tapspacegeometry)
- [tapspace.interaction](#tapspaceinteraction)
- [tapspace.version](#tapspaceversion)
- [tapspace.viewport](#tapspaceviewport)


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

<a name="tapspacecomponents"></a>
## tapspace.components

Various components to render into the affine space.

- [tapspace.components.AbstractActive](#tapspacecomponentsAbstractActive)
- [tapspace.components.AbstractFrame](#tapspacecomponentsAbstractFrame)
- [tapspace.components.AbstractItem](#tapspacecomponentsAbstractItem)
- [tapspace.components.AbstractNode](#tapspacecomponentsAbstractNode)
- [tapspace.components.AbstractPlane](#tapspacecomponentsAbstractPlane)
- [tapspace.components.AbstractView](#tapspacecomponentsAbstractView)
- [tapspace.components.Circle](#tapspacecomponentsCircle)
- [tapspace.components.Edge](#tapspacecomponentsEdge)
- [tapspace.components.Group](#tapspacecomponentsGroup)
- [tapspace.components.Layer](#tapspacecomponentsLayer)
- [tapspace.components.Pixel](#tapspacecomponentsPixel)
- [tapspace.components.Viewport](#tapspacecomponentsViewport)


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

<a name="tapspacecomponentsAbstractItem"></a>
## tapspace.components.AbstractItem(element, opts)

Instance class for interactive material items on affine plane.
The items can have abilities like slidable, tappable, or draggable.

Parameters:
- *element*
  - a HTMLElement. The element does not need to be in DOM.
- *opts*
  - *anchor*
    - { x, y } on the element. Default {x:0,y:0}
  - *size*
    - { width, height }

- [tapspace.components.AbstractItem:draggable](#tapspacecomponentsAbstractItemdraggable)
- [tapspace.components.AbstractItem:pannable](#tapspacecomponentsAbstractItempannable)
- [tapspace.components.AbstractItem:slidable](#tapspacecomponentsAbstractItemslidable)
- [tapspace.components.AbstractItem:slideable](#tapspacecomponentsAbstractItemslideable)
- [tapspace.components.AbstractItem:tappable](#tapspacecomponentsAbstractItemtappable)


Source: [AbstractItem/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractItem/index.js)

<a name="tapspacecomponentsAbstractItemdraggable"></a>
## tapspace.components.AbstractItem:draggable(opts)

Make item draggable.
The item can be moved freely by a set of pointers.
The item maintains the size and the angle.

Return
- this, for chaining

Aliases: [tapspace.components.AbstractItem:pannable](#tapspacecomponentsAbstractItempannable)

Source: [draggable.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractItem/draggable.js)

<a name="tapspacecomponentsAbstractItempannable"></a>
## tapspace.components.AbstractItem:pannable(opts)

Alias of [tapspace.components.AbstractItem:draggable](#tapspacecomponentsAbstractItemdraggable)

Source: [draggable.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractItem/draggable.js)

<a name="tapspacecomponentsAbstractItemslidable"></a>
## tapspace.components.AbstractItem:slidable(opts)

The component can be moved along a line, with limits.

Parameters:
- *opts*
  - *angle*
    - a number, angle in radians
  - *min*
    - a number, a distance to the right half of the unit circle.
  - *max*
    - a number, a distance to the left half of the unit circle.

Aliases: [tapspace.components.AbstractItem:slideable](#tapspacecomponentsAbstractItemslideable)

Source: [slidable.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractItem/slidable.js)

<a name="tapspacecomponentsAbstractItemslideable"></a>
## tapspace.components.AbstractItem:slideable(opts)

Alias of [tapspace.components.AbstractItem:slidable](#tapspacecomponentsAbstractItemslidable)

Source: [slidable.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractItem/slidable.js)

<a name="tapspacecomponentsAbstractItemtappable"></a>
## tapspace.components.AbstractItem:tappable(options)

Make item tappable i.e. make it emit tap events.

Parameters:
- *options*
  - optional object with properties
    - *TODO*

Makes the component emit events:
- *tap*
- *tapstart*
- *tapend*

Return
- this, for chaining

Source: [tappable.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractItem/tappable.js)

<a name="tapspacecomponentsAbstractNode"></a>
## tapspace.components.AbstractNode(element)

Abstract class for all affine components that have a HTML element.
AbstractNodes form an affine subtree in DOM.

Parameters:
- *element*
  - a HTMLElement

- [tapspace.components.AbstractNode:findCommonAncestor](#tapspacecomponentsAbstractNodefindCommonAncestor)
- [tapspace.components.AbstractNode:getAncestors](#tapspacecomponentsAbstractNodegetAncestors)
- [tapspace.components.AbstractNode:getChildren](#tapspacecomponentsAbstractNodegetChildren)
- [tapspace.components.AbstractNode:getParent](#tapspacecomponentsAbstractNodegetParent)
- [tapspace.components.AbstractNode:getRoot](#tapspacecomponentsAbstractNodegetRoot)
- [tapspace.components.AbstractNode:isRoot](#tapspacecomponentsAbstractNodeisRoot)


Source: [AbstractNode/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/index.js)

<a name="tapspacecomponentsAbstractNodefindCommonAncestor"></a>
## tapspace.components.AbstractNode:findCommonAncestor(node)

Find lowest common affine ancestor of self and the given node.

Parameters:
- *node*
  - an AbstractNode

Return
- an AbstractNode. Null if no common ancestor is found.

Note that the result might not be a true ancestor:
- If the given node is a predecessor of self, then self is returned and vice versa.
- If the given node equals self, then self is returned.

For algorithmic comparison, see note 2022-04-01-19

See also https://en.wikipedia.org/wiki/Lowest_common_ancestor

Source: [findCommonAncestor.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/findCommonAncestor.js)

<a name="tapspacecomponentsAbstractNodegetAncestors"></a>
## tapspace.components.AbstractNode:getAncestors()

Affine ancestors, ordered from the immediate parent to
the farthest ancestor, the immediate parent first.

Return
- array of AbstractNode

Source: [getAncestors.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/getAncestors.js)

<a name="tapspacecomponentsAbstractNodegetChildren"></a>
## tapspace.components.AbstractNode:getChildren()

Get all affine children from DOM.

Return
- array of AbstractNode

Source: [getChildren.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/getChildren.js)

<a name="tapspacecomponentsAbstractNodegetParent"></a>
## tapspace.components.AbstractNode:getParent()

Get the affine parent of the plane. Null if no affine parent.

Return
- an AbstractPlane, the parent.
- null if no affine parent.

Source: [getParent.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/getParent.js)

<a name="tapspacecomponentsAbstractNodegetRoot"></a>
## tapspace.components.AbstractNode:getRoot()

Get the affine root. Will return self if has no affine parent.

Return
- an AbstractNode

Source: [getRoot.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/getRoot.js)

<a name="tapspacecomponentsAbstractNodeisRoot"></a>
## tapspace.components.AbstractNode:isRoot()

Is the element an affine root i.e.
the element does not have an affine parent.

Return
- *boolean*

Source: [isRoot.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractNode/isRoot.js)

<a name="tapspacecomponentsAbstractPlane"></a>
## tapspace.components.AbstractPlane()

Abstract class for affine components that span a coordinate plane.

Parameters:
- *element*
  - a HTMLElement
- *opts*
  - *anchor*
    - { x, y } on the element. Default { x:0, y:0 }

- [tapspace.components.AbstractPlane:add](#tapspacecomponentsAbstractPlaneadd)
- [tapspace.components.AbstractPlane:animate](#tapspacecomponentsAbstractPlaneanimate)
- [tapspace.components.AbstractPlane:at](#tapspacecomponentsAbstractPlaneat)
- [tapspace.components.AbstractPlane:atAnchor](#tapspacecomponentsAbstractPlaneatAnchor)
- [tapspace.components.AbstractPlane:getDirection](#tapspacecomponentsAbstractPlanegetDirection)
- [tapspace.components.AbstractPlane:getPosition](#tapspacecomponentsAbstractPlanegetPosition)
- [tapspace.components.AbstractPlane:getProjectionTo](#tapspacecomponentsAbstractPlanegetProjectionTo)
- [tapspace.components.AbstractPlane:getProjectionToParent](#tapspacecomponentsAbstractPlanegetProjectionToParent)
- [tapspace.components.AbstractPlane:getProjectionToParentOf](#tapspacecomponentsAbstractPlanegetProjectionToParentOf)
- [tapspace.components.AbstractPlane:getScale](#tapspacecomponentsAbstractPlanegetScale)
- [tapspace.components.AbstractPlane:match](#tapspacecomponentsAbstractPlanematch)
- [tapspace.components.AbstractPlane:moveTo](#tapspacecomponentsAbstractPlanemoveTo)
- [tapspace.components.AbstractPlane:renderTransform](#tapspacecomponentsAbstractPlanerenderTransform)
- [tapspace.components.AbstractPlane:rotateBy](#tapspacecomponentsAbstractPlanerotateBy)
- [tapspace.components.AbstractPlane:scaleBy](#tapspacecomponentsAbstractPlanescaleBy)
- [tapspace.components.AbstractPlane:setAnchor](#tapspacecomponentsAbstractPlanesetAnchor)
- [tapspace.components.AbstractPlane:snapPixels](#tapspacecomponentsAbstractPlanesnapPixels)
- [tapspace.components.AbstractPlane:transformBy](#tapspacecomponentsAbstractPlanetransformBy)
- [tapspace.components.AbstractPlane:translateBy](#tapspacecomponentsAbstractPlanetranslateBy)


Source: [AbstractPlane/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/index.js)

<a name="tapspacecomponentsAbstractPlaneadd"></a>
## tapspace.components.AbstractPlane:add(component, placement)

Place a component onto this plane.

Parameters:
- *component*
  - an AbstractPlane
- *placement*
  - an optional object with the following properties:
    - *anchor*
      - {x,y} on the component or a Point in the component's space. A custom anchor point on the component to move to the position. Default at the component anchor.
    - *position*
      - {x,y} on this plane or a Point. Place the component so that its anchor goes to this position. Default at the plane anchor.
    - *rotation*
      - a number, radians. Optional. Default 0.
    - *scale*
      - a number, multiplier. Optional. Default 1.
    - *preserve*
      - a boolean. Optional. Default false. Set true to place the component according to its current and possibly intentionally prepared projection instead of the default placement behavior. When preserve is set true, the default or given values of position, rotation, and scale will be ignored.

Return
- this, for chaining

Source: [add.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/add.js)

<a name="tapspacecomponentsAbstractPlaneanimate"></a>
## tapspace.components.AbstractPlane:animate(options)

Update transition animation properties of the component.

Parameters:
- *options*
  - boolean or optional object with properties:
    - *duration*
      - optional string. The transition-duration value, e.g. '500ms' or '2s'. Default is '200ms'.
    - *easing*
      - optional string. The transition-timing-function, e.g. 'linear' or 'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
    - *delay*
      - optional string. The transition-delay value, e.g. '500ms' or '2s'. Default is '0ms'.
  - If boolean false, animation becomes disabled.

Return
- this, for chaining

Source: [animate.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/animate.js)

<a name="tapspacecomponentsAbstractPlaneat"></a>
## tapspace.components.AbstractPlane:at(x, y)

Get a point on the plane by using local plane coordinates.

Parameters
- *x*
  - a number, the x coordinate on the plane.
  - a point2, the {x,y} on the plane.
  - a Point, the point in space. Will be projected onto this plane.
- *y*
  - a number, the y coordinate on the plane. Optional if x is a point.

Return
- a Point on the plane

Source: [at.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/at.js)

<a name="tapspacecomponentsAbstractPlaneatAnchor"></a>
## tapspace.components.AbstractPlane:atAnchor(alt)

Get the plane anchor point or the optional given point on the plane.

Parameters:
- *alt*
  - optional point2 or Point. If given, returns this point instead,
  - projected onto the plane. Useful way to default a point to the
  - plane anchor if the point is nullish.

Return
- a Point

Source: [atAnchor.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/atAnchor.js)

<a name="tapspacecomponentsAbstractPlanegetDirection"></a>
## tapspace.components.AbstractPlane:getDirection()

The direction of the plane. This equals to the angle of the positive
x-axis of the plane. The Direction makes it easy to represent the angle
on different planes.

Return
- a Direction

Source: [getDirection.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/getDirection.js)

<a name="tapspacecomponentsAbstractPlanegetPosition"></a>
## tapspace.components.AbstractPlane:getPosition()

Get the position of the plane anchor on the parent.
Null if there is no parent.

Return
- {x,y}. Null if no parent.

Source: [getPosition.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/getPosition.js)

<a name="tapspacecomponentsAbstractPlanegetProjectionTo"></a>
## tapspace.components.AbstractPlane:getProjectionTo(target)

Compute a projection that maps the coordinate system of this plane
to the coordinate system of the target plane. The resulting projection
is an affine transformation that can be applied to geometry on this plane
to compute the same geometry represented on the the target plane.

Parameters
- *target*
  - an AbstactPlane

Return
- *proj*
  - a proj2. The projection from this plane to target plane.

Throws
- If the planes are not connected. Probably app programming error.

Source: [getProjectionTo.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/getProjectionTo.js)

<a name="tapspacecomponentsAbstractPlanegetProjectionToParent"></a>
## tapspace.components.AbstractPlane:getProjectionToParent()

Return a projection from the coordinate system of the element
to its parent.

TODO what if parent is non-affine

Source: [getProjectionToParent.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/getProjectionToParent.js)

<a name="tapspacecomponentsAbstractPlanegetProjectionToParentOf"></a>
## tapspace.components.AbstractPlane:getProjectionToParentOf(target)

Get projection to the parent component of the target component.
If the target is a root, then projection is to its virtual parent.

Parameters
- *target*
  - an AbstractPlane

Return
- a proj2, a projection to the real or virtual parent of the target.

Source: [getProjectionToParentOf.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/getProjectionToParentOf.js)

<a name="tapspacecomponentsAbstractPlanegetScale"></a>
## tapspace.components.AbstractPlane:getScale()

The scale of the plane.

Return
- a Scale

Source: [getScale.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/getScale.js)

<a name="tapspacecomponentsAbstractPlanematch"></a>
## tapspace.components.AbstractPlane:match(params)

Matching is a powerful way to position elements without the need to know
the exact rotation, scaling, or translation. Give one or more source
points and their targets. The match operation attempts to move the plane
so that the source points match their target points exactly or as
closely as possible.

Parameters:
- params, object with properties
  - source, alias sources
    - a Point or an array of Points. The length must match the targets. Alias: source.
  - target, alias targets
    - a Point or an array of Points. The length must match the sources. Alias: target.
  - *estimator*
    - string. The estimator type restricts the ways the plane is allowed to move during the operation. For details on the estimator types, see [nudged.estimate](https://github.com/axelpale/nudged/).
      - 'TSR': allow translation, scaling, and rotation. The default.
      - 'SR': allow scaling and rotation around the center point.
      - 'TR': allow translation and rotation but no scaling.
      - 'TS': allow translation and scaling but no rotation.
      - 'R': allow only rotation around the center point.
      - 'S': allow only scaling about the center point.
      - 'T': allow only translation aka panning.
      - 'X': allow only translation along the x-axis of the plane.
      - 'Y': allow only translation along the y-axis of the plane.
      - 'L': allow only translation along the given angle.
  - *center*
    - a Point or {x,y}. Optional. The center for the estimators 'SR', 'R', and 'S'.
  - *angle*
    - a number in radians or Direction. Optional. The angle for the estimator 'L'.

Return
- this, for chaining

Source: [match.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/match.js)

<a name="tapspacecomponentsAbstractPlanemoveTo"></a>
## tapspace.components.AbstractPlane:moveTo(position, rotation, scale, anchor)

Set the placement of the component on the parent.
This moves the component anchor to the given position
and rotates and scales the component as specified.

Parameters:
- *position*
  - a point { x, y } on the parent or a Point. Required. The component will be moved on the parent so that the anchor of the component matches the position.
- *rotation*
  - a number or a Direction. Optional. Default 0. If a number, it is radians relative to the parent orientation.
- *scale*
  - a number or a Scale. Optional. Default 1. If a number, it is a multiplier relative to the parent scale.
- *anchor*
  - optional point2 on this or a Point. If set, the point will be used as an anchor instead of the default.

Return
- this, for chaining

Source: [moveTo.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/moveTo.js)

<a name="tapspacecomponentsAbstractPlanerenderTransform"></a>
## tapspace.components.AbstractPlane:renderTransform(opts)

Update the element.style.transform according to the plane placement.

You need to call this function only when you have manually edited
or replaced the component.proj object.

Parameters:
- *opts*
  - *projection*
    - optional proj2 object to be used instead of this.proj. Useful when the position needs visual adjustment without modifying the projection. See snapPixels.

Source: [renderTransform.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/renderTransform.js)

<a name="tapspacecomponentsAbstractPlanerotateBy"></a>
## tapspace.components.AbstractPlane:rotateBy(radians, opts)

Rotate the element.

Parameters:
- *radians*
  - a number, delta angle to rotate.
- *opts*
  - *anchor*
    - an optional Point. Rotation is performed around this point.
    - . Defaults to the plane anchor.

Return
- this, for chaining

Source: [rotateBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/rotateBy.js)

<a name="tapspacecomponentsAbstractPlanescaleBy"></a>
## tapspace.components.AbstractPlane:scaleBy(multiplier, opts)

Scale the element.

Parameters:
- *multiplier*
  - a number, the scale multiplier.
- *opts*
  - *anchor*
    - an optional Point. Scaling is performed about this point. Defaults to the plane anchor.

Return
- this, for chaining

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/scaleBy.js)

<a name="tapspacecomponentsAbstractPlanesetAnchor"></a>
## tapspace.components.AbstractPlane:setAnchor(point)

Set the anchor point of the plane. This does not move the plane.

Parameters:
- *point*
  - a point2 on the plane or a Point in its space. The new anchor point.

Return
- this, for chaining

Source: [setAnchor.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/setAnchor.js)

<a name="tapspacecomponentsAbstractPlanesnapPixels"></a>
## tapspace.components.AbstractPlane:snapPixels(options)

Rotation and non-integer translation blurs the pixels.
This can be annoying if the angle is close to the 90 deg modulo.
This method rounds the projection rotation slightly if it is close,
and rounds translation also to integer pixels if so.

Note that the rounding affects the input coordinates and thus
snapPixels should NOT be used during a gesture except at the end.

The method does not modify the plane projection, only the latent CSS.

Parameters:
- *options*
  - optional object with props:
    - *anchor*
      - optional point2 on the plane or Point. The point about to perform the rotation snapping. Rotation snapping around a point that is far from the user's gaze point – like viewport (0,0) – can cause visible translation near the gaze. The translation can be annoying during or after a rotation gesture. Therefore the rotation snapping should be performed around a point near the gesture and the gaze. Defaults to the plane anchor.

TODO option to disable either rotation or translation snap

Returns
- this, for chaining

Source: [snapPixels.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/snapPixels.js)

<a name="tapspacecomponentsAbstractPlanetransformBy"></a>
## tapspace.components.AbstractPlane:transformBy(tran, opts)

Transform (move) the element on its parent.

Parameters
- *tran*
  - a Transform
- *opts*
  - TODO something?

Return
- this, for chaining

Source: [transformBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/transformBy.js)

<a name="tapspacecomponentsAbstractPlanetranslateBy"></a>
## tapspace.components.AbstractPlane:translateBy(translation, opts)

Translate the element along x and y axis.

Parameters
- *translation*
  - {x,y} on the parent, a Vector, or a Transform
- *opts*
  - TODO something?

Return
- this, for chaining

Source: [translateBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractPlane/translateBy.js)

<a name="tapspacecomponentsAbstractView"></a>
## tapspace.components.AbstractView(element, opts)

Inherits [tapspace.components.AbstractFrame](#tapspacecomponentsAbstractFrame)

Base class for views.

Parameters
- *element*
  - *HTMLElement*
- *opts*
  - *anchor*
    - { x, y } on the viewport. Optional. Default at {x:0,y:0}.
  - *size*
    - a { width, height }

The viewport transformation to the element are inverted to its children
instead of the element itself. This, combined to overflow styles
set by affine-viewport CSS class, creates an illusion of a viewport
to a 2D space.

- [tapspace.components.AbstractView:addControl](#tapspacecomponentsAbstractViewaddControl)
- [tapspace.components.AbstractView:addLayer](#tapspacecomponentsAbstractViewaddLayer)
- [tapspace.components.AbstractView:atNorm](#tapspacecomponentsAbstractViewatNorm)
- [tapspace.components.AbstractView:atPage](#tapspacecomponentsAbstractViewatPage)
- [tapspace.components.AbstractView:atPageFn](#tapspacecomponentsAbstractViewatPageFn)
- [tapspace.components.AbstractView:findLayer](#tapspacecomponentsAbstractViewfindLayer)
- [tapspace.components.AbstractView:getControls](#tapspacecomponentsAbstractViewgetControls)
- [tapspace.components.AbstractView:getLayers](#tapspacecomponentsAbstractViewgetLayers)
- [tapspace.components.AbstractView:getSize](#tapspacecomponentsAbstractViewgetSize)
- [tapspace.components.AbstractView:layer](#tapspacecomponentsAbstractViewlayer)
- [tapspace.components.AbstractView:renderTransform](#tapspacecomponentsAbstractViewrenderTransform)
- [tapspace.components.AbstractView:rotateBy](#tapspacecomponentsAbstractViewrotateBy)
- [tapspace.components.AbstractView:scaleBy](#tapspacecomponentsAbstractViewscaleBy)
- [tapspace.components.AbstractView:setSize](#tapspacecomponentsAbstractViewsetSize)
- [tapspace.components.AbstractView:snapPixels](#tapspacecomponentsAbstractViewsnapPixels)
- [tapspace.components.AbstractView:toPage](#tapspacecomponentsAbstractViewtoPage)
- [tapspace.components.AbstractView:transformBy](#tapspacecomponentsAbstractViewtransformBy)
- [tapspace.components.AbstractView:transformLayersBy](#tapspacecomponentsAbstractViewtransformLayersBy)
- [tapspace.components.AbstractView:translateBy](#tapspacecomponentsAbstractViewtranslateBy)


Source: [AbstractView/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/index.js)

<a name="tapspacecomponentsAbstractViewaddControl"></a>
## tapspace.components.AbstractView:addControl(control, placement)

Add new control to the viewport.
Controls do not move with the space.

Parameters
- *control*
  - an AbstractControl
- *placement*
  - an optional object with properties
    - *position*
      - {x,y} on the viewport or a Point in space.

Return
- this, for chaining

Source: [addControl.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/addControl.js)

<a name="tapspacecomponentsAbstractViewaddLayer"></a>
## tapspace.components.AbstractView:addLayer(z, placement)

Create and add a new layer.

Source: [addLayer.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/addLayer.js)

<a name="tapspacecomponentsAbstractViewatNorm"></a>
## tapspace.components.AbstractView:atNorm(rx, ry)

Get a Point by relative coordinates, rounded to nearest integers.

Parameters:
- *rx*
  - number. 0 at left edge, 1 at right edge.
- *ry*
  - number. 0 at top edge, 1 at bottom edge.

Return
- Point on the element

Source: [atNorm.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/atNorm.js)

<a name="tapspacecomponentsAbstractViewatPage"></a>
## tapspace.components.AbstractView:atPage(pageX, pageY)

Compute a point on the viewport from page coordinates.
Pointer events are a common source for page coordinates.

Parameters
- *pageX*
  - a number
- *pageY*
  - a number

Return
- a Point on viewport

Source: [atPage.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/atPage.js)

<a name="tapspacecomponentsAbstractViewatPageFn"></a>
## tapspace.components.AbstractView:atPageFn()

Get a function that computes a point on the viewport from page coords.
Pointer events are a common source for page coordinates.

Efficency: we assume that reading values from DOM is relatively slow
and that with lots of points, it is better to query DOM once
and apply that to each point, than query DOM for each point separately.
TODO proof the efficency

Parameters


Returns
- a function
  - *Parameters*
    - *pageX*
      - a number
    - *pageY*
      - a number
  - *Returns*
    - a Point on viewport

Source: [atPageFn.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/atPageFn.js)

<a name="tapspacecomponentsAbstractViewfindLayer"></a>
## tapspace.components.AbstractView:findLayer(z, tolerance)

Find a layer. Return null if no layer at this depth.

Parameters
- *z*
  - required number. The layer depth.
- *tolerance*
  - optional number. Default 0. Pick the first layer within this depth tolerance

Return
- Layer component at or near z.
- Null if no layers found.

Source: [findLayer.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/findLayer.js)

<a name="tapspacecomponentsAbstractViewgetControls"></a>
## tapspace.components.AbstractView:getControls()

Return all control group components of the viewport.

Return
- array of Controls

Source: [getControls.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/getControls.js)

<a name="tapspacecomponentsAbstractViewgetLayers"></a>
## tapspace.components.AbstractView:getLayers()

Return all layer components of the viewport.

Return
- array of Layers

Source: [getLayers.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/getLayers.js)

<a name="tapspacecomponentsAbstractViewgetSize"></a>
## tapspace.components.AbstractView:getSize()

Get viewport size. The size is read from the viewport
element.offsetWidth and element.offsetHeight.

Return
- a Size

Source: [getSize.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/getSize.js)

<a name="tapspacecomponentsAbstractViewlayer"></a>
## tapspace.components.AbstractView:layer(z, placement)

Get or create a layer at z distance.

Parameters:
- *z*
  - optional number. Default 0.
- *placement*
  - optional object with properties:
    - *position*
      - { x, y } on the viewport or a Point. Default at the view origin.
    - *rotation*
      - a number, radians. Optional. Default 0.
    - *scale*
      - a number, multiplier. Optional. Default 1.

TODO maybe z is part of placement?

Source: [layer.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/layer.js)

<a name="tapspacecomponentsAbstractViewrenderTransform"></a>
## tapspace.components.AbstractView:renderTransform(opts)

Updates the element.style.transform according to the plane projection.

You need to call this function only when you have manually edited
or replaced a layer.proj object.

Parameters:
- *opts*
  - optional object. See AbstractPlane:renderTransform for details.

Source: [renderTransform.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/renderTransform.js)

<a name="tapspacecomponentsAbstractViewrotateBy"></a>
## tapspace.components.AbstractView:rotateBy(angle, opts)

Rotate the viewport in space around anchor.

Parameters
- *angle*
  - a number, the delta angle to rotate the viewport.
- *opts*
  - *anchor*
    - an optional Point. Scaling is performed about this point. Defaults to the viewport anchor.

Return
- this, for chaining

Source: [rotateBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/rotateBy.js)

<a name="tapspacecomponentsAbstractViewscaleBy"></a>
## tapspace.components.AbstractView:scaleBy(factor, opts)

Translate the viewport in space along x and y axis.

Parameters
- *factor*
  - a number
- *opts*
  - optional object with props
    - *anchor*
      - an optional Point. Scaling is performed about this point. Defaults to the viewport anchor.

Return
- this, for chaining

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/scaleBy.js)

<a name="tapspacecomponentsAbstractViewsetSize"></a>
## tapspace.components.AbstractView:setSize(size)

Set viewport size.

Parameters:
- *size*
  - a {w,h} or a {width,height} object. If {w,h} or {width,height} format is used, the dimensions can be either number of pixels or CSS length strings.

Return
- this, for chaining

Source: [setSize.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/setSize.js)

<a name="tapspacecomponentsAbstractViewsnapPixels"></a>
## tapspace.components.AbstractView:snapPixels(options)

Snap viewport position and angle to pixels when the angle is near
a multitude of 90 degrees.

Parameters:
- *options*
  - optional object with props:
    - *anchor*
      - a point2 or Point

Source: [snapPixels.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/snapPixels.js)

<a name="tapspacecomponentsAbstractViewtoPage"></a>
## tapspace.components.AbstractView:toPage(viewX, viewY)

Compute a point on the page from a point on the viewport.
Practical if points need to be normalised on the page.

Parameters
- *viewX*
  - a number
- *viewY*
  - a number

Return
- a point2 on the page

Source: [toPage.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/toPage.js)

<a name="tapspacecomponentsAbstractViewtransformBy"></a>
## tapspace.components.AbstractView:transformBy(tran, opts)

Overwrites AbstractPlane:transformBy

Transform the viewport in relation to the layers. In effect, this
transforms all layers with the inversion of the tran.

Parameters:
- *tran*
  - a Transform
- *opts*
  - optional object with props
    - silent event options TODO

Return
- this, for chaining

Source: [transformBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/transformBy.js)

<a name="tapspacecomponentsAbstractViewtransformLayersBy"></a>
## tapspace.components.AbstractView:transformLayersBy(tran, opts)

Transform the layers in relation to the viewport. In effect, this
transforms all layers with the tran. Use this to navigate the space.

Parameters:
- *tran*
  - a Transform
- *opts*
  - optional object with props:
    - silent event options TODO

Return
- this, for chaining

Source: [transformLayersBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/transformLayersBy.js)

<a name="tapspacecomponentsAbstractViewtranslateBy"></a>
## tapspace.components.AbstractView:translateBy(translation, opts)

Translate the viewport in space along x and y axis.

Parameters
- *translation*
  - a Vector
- *opts*
  - optional object with props
    - *TODO*

Return
- this, for chaining

Source: [translateBy.js](https://github.com/taataa/tapspace/blob/main/lib/components/AbstractView/translateBy.js)

<a name="tapspacecomponentsCircle"></a>
## tapspace.components.Circle(radius, color, opts)

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

<a name="tapspacecomponentsEdge"></a>
## tapspace.components.Edge(border, opts)

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

- [tapspace.components.Edge:getLength](#tapspacecomponentsEdgegetLength)


Source: [Edge/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/index.js)

<a name="tapspacecomponentsEdgegetLength"></a>
## tapspace.components.Edge:getLength()

Get length of the edge in local pixels.

Return
- a number, pixels on the edge plane.

Source: [getLength.js](https://github.com/taataa/tapspace/blob/main/lib/components/Edge/getLength.js)

<a name="tapspacecomponentsGroup"></a>
## tapspace.components.Group()

Inherits [tapspace.components.AbstractPlane](#tapspacecomponentsAbstractPlane)
Inherits [tapspace.components.AbstractActive](#tapspacecomponentsAbstractActive)

A set of affine components.
The group element has zero width and height.
Still, it can be interacted on its content.

Source: [Group/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Group/index.js)

<a name="tapspacecomponentsLayer"></a>
## tapspace.components.Layer(z)

Inherits [tapspace.components.AbstractPlane](#tapspacecomponentsAbstractPlane)

Layers does not have size.
A Layer must be a children of a Space.

Parameters
- *z*
  - optional number. The depth coordinate for perspective viewports.

Source: [Layer/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Layer/index.js)

<a name="tapspacecomponentsPixel"></a>
## tapspace.components.Pixel(color, opts)

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

<a name="tapspacecomponentsViewport"></a>
## tapspace.components.Viewport

Inherits AbstractView

When the viewport is transformed, it does not move on the page.
Instead, the space and its layers within the viewport are moved
in opposite direction. This, combined with overflow CSS styles,
creates an illusion of a viewport into a 2D space.

Parameters
- *element*
  - HTMLElement or query string
- *opts*
  - optional object with properties:
    - *size*
      - optional object with properties:
      - *width*
        - a number in pixels or a CSS width string.
      - *height*
        - a number in pixels or a CSS height string.

- [tapspace.components.Viewport:pannable](#tapspacecomponentsViewportpannable)
- [tapspace.components.Viewport:responsive](#tapspacecomponentsViewportresponsive)
- [tapspace.components.Viewport:rotatable](#tapspacecomponentsViewportrotatable)
- [tapspace.components.Viewport:zoomable](#tapspacecomponentsViewportzoomable)


Source: [Viewport/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Viewport/index.js)

<a name="tapspacecomponentsViewportpannable"></a>
## tapspace.components.Viewport:pannable(opts)

Make the viewport pannable (= draggable).
The view can be moved freely by a set of pointers.
The view maintains the size and the angle.

Return
- this, for chaining

Source: [pannable/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Viewport/pannable/index.js)

<a name="tapspacecomponentsViewportresponsive"></a>
## tapspace.components.Viewport:responsive(opts)

Make the viewport responsive to container size changes.
Keeps the viewport center at the same position relative to its size.

Parameters
- *opts*
  - optional boolean false to disable
  - optional object with props:
    - *relativeCenter*
      - optional { rx, ry }, the relative point to keep fixed while resizing. Default { rx: 0.5, ry: 0.5 }

Return
- this, for chaining

Source: [responsive/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Viewport/responsive/index.js)

<a name="tapspacecomponentsViewportrotatable"></a>
## tapspace.components.Viewport:rotatable(opts)

Make the viewport zoomable.
The viewport can be scaled by pinch gesture and mouse wheel.

Parameters
- opts, optional boolean or object with props:
  - *center*
    - a Point, the vanishing point for zoom.

Return
- this, for chaining

Source: [rotatable/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Viewport/rotatable/index.js)

<a name="tapspacecomponentsViewportzoomable"></a>
## tapspace.components.Viewport:zoomable(opts)

Make the viewport zoomable.
The viewport can be scaled by pinch gesture and mouse wheel.

Parameters
- opts, optional boolean or object with props:
  - *center*
    - a Point, the vanishing point for zoom. Default to gesture mean.

Return
- this, for chaining

Source: [zoomable/index.js](https://github.com/taataa/tapspace/blob/main/lib/components/Viewport/zoomable/index.js)

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

<a name="tapspacegeometry"></a>
## tapspace.geometry

Various geometries in affine space.
Each geometry provides methods to project it between affine planes.

- [tapspace.geometry.Direction](#tapspacegeometryDirection)
- [tapspace.geometry.Distance](#tapspacegeometryDistance)
- [tapspace.geometry.Point](#tapspacegeometryPoint)
- [tapspace.geometry.Scale](#tapspacegeometryScale)
- [tapspace.geometry.Size](#tapspacegeometrySize)
- [tapspace.geometry.Transform](#tapspacegeometryTransform)
- [tapspace.geometry.Vector](#tapspacegeometryVector)


Source: [geometry/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/index.js)

<a name="tapspacegeometryDirection"></a>
## tapspace.geometry.Direction(basis, angle)

Direction in space represented as an absolute angle.
The representation depends on the orientation of the coordinate space and
therefore the angle needs conversion between planes.
In contrast, a rotation is a change in the angle and does not depend on
the orientation.

Parameters
- *basis*
  - a Component
- *angle*
  - a number, the rotation in radians from the angle zero.

- [tapspace.geometry.Direction:projectTo](#tapspacegeometryDirectionprojectTo)


Source: [Direction/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Direction/index.js)

<a name="tapspacegeometryDirectionprojectTo"></a>
## tapspace.geometry.Direction:projectTo(newBasis)

Parameters:
- *newBasis*

Return
- a Direction

Source: [Direction/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Direction/index.js)

<a name="tapspacegeometryDistance"></a>
## tapspace.geometry.Distance(basis, d)

Parameters
- *basis*
  - a Component
- *d*
  - number, a measure. Cannot be negative.

Properties:
- *basis*
- *d*

- [tapspace.geometry.Distance:projectTo](#tapspacegeometryDistanceprojectTo)
- [tapspace.geometry.Distance:scaleBy](#tapspacegeometryDistancescaleBy)


Source: [Distance/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Distance/index.js)

<a name="tapspacegeometryDistanceprojectTo"></a>
## tapspace.geometry.Distance:projectTo(newBasis)

Return
- a Distance

Source: [Distance/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Distance/index.js)

<a name="tapspacegeometryDistancescaleBy"></a>
## tapspace.geometry.Distance:scaleBy(multiplier)

Multiply the distance. Returns new Distance.

Parameters
- *multiplier*
  - a number

Return
- a Distance

Source: [Distance/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Distance/index.js)

<a name="tapspacegeometryPoint"></a>
## tapspace.geometry.Point(basis, x, y)

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

- [tapspace.geometry.Point:distanceTo](#tapspacegeometryPointdistanceTo)
- [tapspace.geometry.Point:offset](#tapspacegeometryPointoffset)
- [tapspace.geometry.Point:plain](#tapspacegeometryPointplain)
- [tapspace.geometry.Point:polarOffset](#tapspacegeometryPointpolarOffset)
- [tapspace.geometry.Point:projectTo](#tapspacegeometryPointprojectTo)
- [tapspace.geometry.Point:round](#tapspacegeometryPointround)
- [tapspace.geometry.Point:vectorTo](#tapspacegeometryPointvectorTo)
- [tapspace.geometry.Point.fromAverage](#tapspacegeometryPointfromAverage)


Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacegeometryPointdistanceTo"></a>
## tapspace.geometry.Point:distanceTo(p)

Distance between points.

Parameters:
- *p*
  - a Point or {x,y}. The latter is assumed to be on the same plane.

Return
- a Distance

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacegeometryPointoffset"></a>
## tapspace.geometry.Point:offset(dx, dy)

Get a point when the current point is offset by dx and dy.

Parameters:
- *dx*
  - a number of pixels to move horizontally on the basis.
- *dy*
  - a number of pixels to move vertically on the basis.

Return
- a Point

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacegeometryPointplain"></a>
## tapspace.geometry.Point:plain()

Return plain point2 object {x,y} without basis data.

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacegeometryPointpolarOffset"></a>
## tapspace.geometry.Point:polarOffset(distance, angle)

Get the point at the given distance at the angle.

Parameters:
- *distance*
  - a number on the basis or a Distance.
- *angle*
  - a number in radians on the basis or a Direction.

Return
- a Point

Source: [polarOffset.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/polarOffset.js)

<a name="tapspacegeometryPointprojectTo"></a>
## tapspace.geometry.Point:projectTo(newBasis)

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacegeometryPointround"></a>
## tapspace.geometry.Point:round()

Round the point to nearest integers.

Return
- a Point

Source: [Point/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/index.js)

<a name="tapspacegeometryPointvectorTo"></a>
## tapspace.geometry.Point:vectorTo(p)

Get a vector from this to the point p.

Parameters:
- *p*
  - a Point

Return:
- a Vector on this basis.

Source: [vectorTo.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Point/vectorTo.js)

<a name="tapspacegeometryPointfromAverage"></a>
## tapspace.geometry.Point.fromAverage(basis, points)

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

<a name="tapspacegeometryScale"></a>
## tapspace.geometry.Scale(basis, multiplier)

The scale multiplier in space.
The multiplier depends on the scale of the coordinate space and
therefore the multiplier needs conversion between planes.
In contrast, a scaling is a change in the scale and does not depend on
the plane.

Parameters
- *basis*
  - a Component
- *multiplier*
  - a number, the scale multiplier relative to the basis scale.

- [tapspace.geometry.Scale:projectTo](#tapspacegeometryScaleprojectTo)


Source: [Scale/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Scale/index.js)

<a name="tapspacegeometryScaleprojectTo"></a>
## tapspace.geometry.Scale:projectTo(newBasis)

Return
- a Scale

Source: [Scale/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Scale/index.js)

<a name="tapspacegeometrySize"></a>
## tapspace.geometry.Size(basis, width, height)

A rectangular size in space. Basically it is two-dimensional distance.

Parameters
- *basis*
  - a Component
- *width*
  - a number, the width on the basis
- *height*
  - a number, the height on the basis

- [tapspace.geometry.Size:at](#tapspacegeometrySizeat)
- [tapspace.geometry.Size:atNorm](#tapspacegeometrySizeatNorm)
- [tapspace.geometry.Size:atToNorm](#tapspacegeometrySizeatToNorm)
- [tapspace.geometry.Size:projectTo](#tapspacegeometrySizeprojectTo)


Source: [Size/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Size/index.js)

<a name="tapspacegeometrySizeat"></a>
## tapspace.geometry.Size:at(x, y)

Get point at (x,y).

Parameters:
- *x*
  - a number
- *y*
  - a number

Return
- a Point

Source: [at.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Size/at.js)

<a name="tapspacegeometrySizeatNorm"></a>
## tapspace.geometry.Size:atNorm(rx, ry)

Get point at (rx, ry) where rx is relative to the width and
the ry is relative to the height.

Parameters:
- *rx*
  - a number. Value of 1 will return a point with x = width.
- *ry*
  - a number. Value of 1 will return a point with y = height.

Return
- a Point

Source: [atNorm.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Size/atNorm.js)

<a name="tapspacegeometrySizeatToNorm"></a>
## tapspace.geometry.Size:atToNorm(x, y)

Get point at (x,y) and return its relative coordinates.
For example, relative coords of point (2, 1) in size (4, 4) is (0.5, 0.25)

Parameters:
- *x*
  - a number or a Point
- *y*
  - a number

Return
- a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }

Source: [atToNorm.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Size/atToNorm.js)

<a name="tapspacegeometrySizeprojectTo"></a>
## tapspace.geometry.Size:projectTo(newBasis)

Source: [Size/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Size/index.js)

<a name="tapspacegeometryTransform"></a>
## tapspace.geometry.Transform(basis, a, b, x, y)

Parameters
- *basis*
  - a Component
- *a*
  - a number or a tran2
- *b*
  - *number*
- *x*
  - *number*
- *y*
  - *number*

- [tapspace.geometry.Transform:createFromParams](#tapspacegeometryTransformcreateFromParams)
- [tapspace.geometry.Transform:getTranslation](#tapspacegeometryTransformgetTranslation)
- [tapspace.geometry.Transform:inverse](#tapspacegeometryTransforminverse)
- [tapspace.geometry.Transform:projectTo](#tapspacegeometryTransformprojectTo)


Source: [Transform/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Transform/index.js)

<a name="tapspacegeometryTransformcreateFromParams"></a>
## tapspace.geometry.Transform:createFromParams(params)

Create transform in intuitive way with human-readable parameters.

Parameters:
- *params*
  - *basis*
    - HTMLElement, required.
  - *rotate*
    - number, radians. Optional, default 0.
  - *scale*
    - number, multiplier. Optional, default 1.
  - *translate*
    - vec2, { x, y }. Optional, default { x: 0, y: 0 }.

Return
- a Transform

Source: [createFromParams.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Transform/createFromParams.js)

<a name="tapspacegeometryTransformgetTranslation"></a>
## tapspace.geometry.Transform:getTranslation()

Get the translation component of the transform without rotation
and scaling.

Return
- a Transform

Source: [getTranslation.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Transform/getTranslation.js)

<a name="tapspacegeometryTransforminverse"></a>
## tapspace.geometry.Transform:inverse()

Invert the transform.

Return
- a Transform

Source: [inverse.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Transform/inverse.js)

<a name="tapspacegeometryTransformprojectTo"></a>
## tapspace.geometry.Transform:projectTo(newBasis)

Project the transform to another plane.

Return
- a Transform

Source: [projectTo.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Transform/projectTo.js)

<a name="tapspacegeometryVector"></a>
## tapspace.geometry.Vector(basis, x, y)

Parameters
- *basis*
- *x*
  - a number or a point2
- *y*
  - a number

- [tapspace.geometry.Vector:projectTo](#tapspacegeometryVectorprojectTo)


Source: [Vector/index.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Vector/index.js)

<a name="tapspacegeometryVectorprojectTo"></a>
## tapspace.geometry.Vector:projectTo(newBasis)

Project the vector onto another plane.

Parameters:
- *newBasis*
  - an AbstractPlane

Return
- a Vector

Source: [projectTo.js](https://github.com/taataa/tapspace/blob/main/lib/geometry/Vector/projectTo.js)

<a name="tapspaceinteraction"></a>
## tapspace.interaction

Interactions define how gestures affect components.

Interactions do not share a common interface.
But, how about WheelInteraction base class for Wheel interactions?

Source: [interaction/index.js](https://github.com/taataa/tapspace/blob/main/lib/interaction/index.js)

<a name="tapspaceversion"></a>
## tapspace.version

The semantic version string, for example '1.2.3'.

Source: [lib/index.js](https://github.com/taataa/tapspace/blob/main/lib/index.js)

<a name="tapspaceviewport"></a>
## tapspace.viewport(element, options)

Make element a viewport.

Parameters
- *element*
  - HTMLElement or query string
- *options*
  - an optional object with properties:
    - *size*
      - a { width, height }
    - *interaction*
      - *pannable*
        - boolean, default true
      - *scalable*
        - boolean, default true
      - *rotatable*
        - boolean, default false
      - *wheelable*
        - boolean, default true
    - *projection*
      - optional string. Projection method. One of '2d', 'orthographic', '3d', 'perspective'.

Return
- a [tapspace.components.Viewport](#tapspacecomponentsViewport)

Source: [create.js](https://github.com/taataa/tapspace/blob/main/lib/components/Viewport/create.js)

<p style="text-align: right">
<a href="#top">&uarr; Back To Top</a>
</p>

