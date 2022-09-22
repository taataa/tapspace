<a name="top"></a>
# Tapspace API Documentation v2.0.0-alpha.1


Welcome to Tapspace API documentation.
You can build your zoomable application with the tools documented here.
These docs are generated with [yamdog](https://github.com/axelpale/yamdog).

Syntax help: `ClassName`, `namespace`, `.CONSTANT`, `.classMethod()`, `:instanceProperty`, `:instanceMethod()`, and `[optionalParameter]`.

See also: [Introduction](https://taataa.github.io/tapspace/) – [Tutorial](https://taataa.github.io/tapspace/tutorial/) - [GitHub](https://github.com/taataa/tapspace)



<a name="tapspace"></a>
## [tapspace](#tapspace)

The [tapspace](#tapspace) namespace provides component creation methods,
geometry classes, and namespaces for interaction, effects, and
resource loaders.

**Table of Contents:**

- [tapspace.circle](#tapspacecircle)
- [tapspace.components](#tapspacecomponents)
- [tapspace.create](#tapspacecreate)
- [tapspace.edge](#tapspaceedge)
- [tapspace.effects](#tapspaceeffects)
- [tapspace.element](#tapspaceelement)
- [tapspace.geometry](#tapspacegeometry)
- [tapspace.interaction](#tapspaceinteraction)
- [tapspace.loaders](#tapspaceloaders)
- [tapspace.version](#tapspaceversion)


Source: [lib/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/index.js)

<a name="tapspacecircle"></a>
## [tapspace](#tapspace).[circle](#tapspacecircle)(radius, color, options)

Make a circle-shaped element.

**Parameters:**
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

**Returns:**
- a Component

Source: [create.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Circle/create.js)

<a name="tapspacecomponents"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents)

Various components to render into the affine space.

- [tapspace.components.AbstractActive](#tapspacecomponentsabstractactive)
- [tapspace.components.AbstractControl](#tapspacecomponentsabstractcontrol)
- [tapspace.components.AbstractFrame](#tapspacecomponentsabstractframe)
- [tapspace.components.AbstractItem](#tapspacecomponentsabstractitem)
- [tapspace.components.AbstractNode](#tapspacecomponentsabstractnode)
- [tapspace.components.AbstractPlane](#tapspacecomponentsabstractplane)
- [tapspace.components.AbstractView](#tapspacecomponentsabstractview)
- [tapspace.components.Circle](#tapspacecomponentscircle)
- [tapspace.components.Edge](#tapspacecomponentsedge)
- [tapspace.components.Element](#tapspacecomponentselement)
- [tapspace.components.Group](#tapspacecomponentsgroup)
- [tapspace.components.Pixel](#tapspacecomponentspixel)
- [tapspace.components.Plane](#tapspacecomponentsplane)
- [tapspace.components.Space](#tapspacecomponentsspace)
- [tapspace.components.Viewport](#tapspacecomponentsviewport)
- [tapspace.components.ZoomControl](#tapspacecomponentszoomcontrol)


Source: [components/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/index.js)

<a name="tapspacecomponentsabstractactive"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractActive](#tapspacecomponentsabstractactive)(opts)

Interaction methods for affine components.
Designed to be inherited by an instance class that
inherit also from AbstractPlane or down.

**Parameters:**
- *opts*
  - TODO maybe which capturers are possible?
  - TODO options to autostart capturers, maybe

- [tapspace.components.AbstractActive:capturer](#tapspacecomponentsabstractactivecapturer)
- [tapspace.components.AbstractActive:capturer](#tapspacecomponentsabstractactivecapturer)


Source: [AbstractActive/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractActive/index.js)

<a name="tapspacecomponentsabstractactivecapturer"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractActive](#tapspacecomponentsabstractactive):[capturer](#tapspacecomponentsabstractactivecapturer)(capturerName, opts)

Get or create an input capturer.
For Tapspace internal use.

**Parameters:**
- *capturerName*
  - a string. One of 'gesture', 'keyboard', 'wheel'
- *opts*
  - options for the capturer.

**Returns:**
- a capturer

Source: [capturer.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractActive/capturer.js)

<a name="tapspacecomponentsabstractactivecapturer"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractActive](#tapspacecomponentsabstractactive):[capturer](#tapspacecomponentsabstractactivecapturer)(capturerName, opts)

Get or create an input converter.
The converters modify or redirect input events.
For Tapspace internal use.

**Parameters:**
- *converterName*
  - a string. One of 'mouse'
- *opts*
  - options for the converter.

**Returns:**
- a converter

Source: [converter.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractActive/converter.js)

<a name="tapspacecomponentsabstractcontrol"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractControl](#tapspacecomponentsabstractcontrol)(element, opts)

Instance class for viewport control areas.

Inherits AbstractFrame

**Parameters:**
- *element*
  - a HTMLElement. The element does not need to be in DOM.
- *opts*
  - *anchor*
    - { x, y } on the element. Default {x:0,y:0}
  - *size*
    - { width, height }

Source: [AbstractControl/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractControl/index.js)

<a name="tapspacecomponentsabstractframe"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe)(element, opts)

Abstract class for rectangular affine components

**Parameters:**
- *element*
  - a HTMLElement. The element does not need to be in DOM.
- *opts*
  - *anchor*
    - { x, y } on the element. Optional. Default {x:0, y:0}
  - *size*
    - { width, height } or { w, h }.

- [tapspace.components.AbstractFrame:atBottomLeft](#tapspacecomponentsabstractframeatbottomleft)
- [tapspace.components.AbstractFrame:atBottomMid](#tapspacecomponentsabstractframeatbottommid)
- [tapspace.components.AbstractFrame:atBottomRight](#tapspacecomponentsabstractframeatbottomright)
- [tapspace.components.AbstractFrame:atCenter](#tapspacecomponentsabstractframeatcenter)
- [tapspace.components.AbstractFrame:atMid](#tapspacecomponentsabstractframeatmid)
- [tapspace.components.AbstractFrame:atMidLeft](#tapspacecomponentsabstractframeatmidleft)
- [tapspace.components.AbstractFrame:atMidMid](#tapspacecomponentsabstractframeatmidmid)
- [tapspace.components.AbstractFrame:atMidRight](#tapspacecomponentsabstractframeatmidright)
- [tapspace.components.AbstractFrame:atNorm](#tapspacecomponentsabstractframeatnorm)
- [tapspace.components.AbstractFrame:atToNorm](#tapspacecomponentsabstractframeattonorm)
- [tapspace.components.AbstractFrame:atTopLeft](#tapspacecomponentsabstractframeattopleft)
- [tapspace.components.AbstractFrame:atTopMid](#tapspacecomponentsabstractframeattopmid)
- [tapspace.components.AbstractFrame:atTopRight](#tapspacecomponentsabstractframeattopright)
- [tapspace.components.AbstractFrame:centerTo](#tapspacecomponentsabstractframecenterto)
- [tapspace.components.AbstractFrame:getHeight](#tapspacecomponentsabstractframegetheight)
- [tapspace.components.AbstractFrame:getSize](#tapspacecomponentsabstractframegetsize)
- [tapspace.components.AbstractFrame:getWidth](#tapspacecomponentsabstractframegetwidth)
- [tapspace.components.AbstractFrame:setSize](#tapspacecomponentsabstractframesetsize)


Source: [AbstractFrame/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/index.js)

<a name="tapspacecomponentsabstractframeatbottomleft"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atBottomLeft](#tapspacecomponentsabstractframeatbottomleft)()

Get point at the bottom left corner of the element.

**Returns:**
- point2 on the element

Source: [atBottomLeft.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atBottomLeft.js)

<a name="tapspacecomponentsabstractframeatbottommid"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atBottomMid](#tapspacecomponentsabstractframeatbottommid)()

Get point at the middle of the bottom edge of the element.

**Returns:**
- point2 on the element

Source: [atBottomMid.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atBottomMid.js)

<a name="tapspacecomponentsabstractframeatbottomright"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atBottomRight](#tapspacecomponentsabstractframeatbottomright)()

Get point at the bottom right corner of the element.

**Returns:**
- point2 on the element

Source: [atBottomRight.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atBottomRight.js)

<a name="tapspacecomponentsabstractframeatcenter"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atCenter](#tapspacecomponentsabstractframeatcenter)()

Alias of [tapspace.components.AbstractFrame:atMid](#tapspacecomponentsabstractframeatmid), [tapspace.components.AbstractFrame:atMidMid](#tapspacecomponentsabstractframeatmidmid)

Source: [atMidMid.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atMidMid.js)

<a name="tapspacecomponentsabstractframeatmid"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atMid](#tapspacecomponentsabstractframeatmid)()

Get point at the middle the element.

**Returns:**
- point2 on the element

Aliases: [tapspace.components.AbstractFrame:atMidMid](#tapspacecomponentsabstractframeatmidmid), [tapspace.components.AbstractFrame:atCenter](#tapspacecomponentsabstractframeatcenter)

Source: [atMidMid.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atMidMid.js)

<a name="tapspacecomponentsabstractframeatmidleft"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atMidLeft](#tapspacecomponentsabstractframeatmidleft)()

Get point at the middle of the left edge of the element.

**Returns:**
- point2 on the element

Source: [atMidLeft.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atMidLeft.js)

<a name="tapspacecomponentsabstractframeatmidmid"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atMidMid](#tapspacecomponentsabstractframeatmidmid)()

Alias of [tapspace.components.AbstractFrame:atMid](#tapspacecomponentsabstractframeatmid), [tapspace.components.AbstractFrame:atCenter](#tapspacecomponentsabstractframeatcenter)

Source: [atMidMid.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atMidMid.js)

<a name="tapspacecomponentsabstractframeatmidright"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atMidRight](#tapspacecomponentsabstractframeatmidright)()

Get point at the middle of the right edge of the element.

**Returns:**
- point2 on the element

Source: [atMidRight.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atMidRight.js)

<a name="tapspacecomponentsabstractframeatnorm"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atNorm](#tapspacecomponentsabstractframeatnorm)(rx, ry[, rz])

Get a Point from unit coordinates that map the element width and height.

**Parameters:**
- *rx*
  - number. 0 at left edge, 1 at right edge.
- *ry*
  - number. 0 at top edge, 1 at bottom edge.
- *rz*
  - optional number. 0 at frame plane, 1 at height depth.

**Returns:**
- a Point on the element

Source: [atNorm.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atNorm.js)

<a name="tapspacecomponentsabstractframeattonorm"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atToNorm](#tapspacecomponentsabstractframeattonorm)(x, y)

Get relative coordinates for the given point.
For example, relative coords of point (2, 1) in size (4, 4) is (0.5, 0.25)

**Parameters:**
- *x*
  - a number or a Point
- *y*
  - a number

**Returns:**
- a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }

Source: [atToNorm.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atToNorm.js)

<a name="tapspacecomponentsabstractframeattopleft"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atTopLeft](#tapspacecomponentsabstractframeattopleft)()

Get point at the top left corner of the element.

**Returns:**
- point2 on the element

Source: [atTopLeft.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atTopLeft.js)

<a name="tapspacecomponentsabstractframeattopmid"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atTopMid](#tapspacecomponentsabstractframeattopmid)()

Get point at the middle of the top edge of the element.

**Returns:**
- point2 on the element

Source: [atTopMid.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atTopMid.js)

<a name="tapspacecomponentsabstractframeattopright"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[atTopRight](#tapspacecomponentsabstractframeattopright)()

Get point at the top right corner of the element.

**Returns:**
- point2 on the element

Source: [atTopRight.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/atTopRight.js)

<a name="tapspacecomponentsabstractframecenterto"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[centerTo](#tapspacecomponentsabstractframecenterto)(position)

Move component so that its middle point matches the given point.
Let the position f component on the parent.
This moves the component anchor to the given position
and rotates and scales the component as specified.

**Parameters:**
- *position*
  - a point { x, y } on the parent or a Point. Required. The component will be moved on the parent so that the center of the component matches the position.

**Returns:**
- this, for chaining

Source: [centerTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/centerTo.js)

<a name="tapspacecomponentsabstractframegetheight"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[getHeight](#tapspacecomponentsabstractframegetheight)()

Get component height as a Distance.

**Returns:**
- a Distance

Source: [getHeight.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/getHeight.js)

<a name="tapspacecomponentsabstractframegetsize"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[getSize](#tapspacecomponentsabstractframegetsize)()

Get component size dimensions in pixels.

**Returns:**
- a Size

Source: [getSize.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/getSize.js)

<a name="tapspacecomponentsabstractframegetwidth"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[getWidth](#tapspacecomponentsabstractframegetwidth)()

Get component width as a Distance.

**Returns:**
- a Distance

Source: [getWidth.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/getWidth.js)

<a name="tapspacecomponentsabstractframesetsize"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractFrame](#tapspacecomponentsabstractframe):[setSize](#tapspacecomponentsabstractframesetsize)(size)

Set component size. This does not change the scale or depth of the
element, only the local pixel width and height.

**Parameters:**
- *size*
  - a {w,h}, a {width,height}, or a Size. If {w,h} or {width,height} format is used, the dimensions can be either number of pixels or CSS length strings. Note that if the component is not yet in DOM, relative length units might not work.

**Returns:**
- this, for chaining

Source: [setSize.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractFrame/setSize.js)

<a name="tapspacecomponentsabstractitem"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractItem](#tapspacecomponentsabstractitem)(element, opts)

Instance class for interactive material items on affine plane.
The items can have abilities like slidable, tappable, or draggable.

**Parameters:**
- *element*
  - a HTMLElement. The element does not need to be in DOM.
- *opts*
  - *anchor*
    - { x, y } on the element. Default {x:0,y:0}
  - *size*
    - { width, height }

- [tapspace.components.AbstractItem:draggable](#tapspacecomponentsabstractitemdraggable)
- [tapspace.components.AbstractItem:pannable](#tapspacecomponentsabstractitempannable)
- [tapspace.components.AbstractItem:slidable](#tapspacecomponentsabstractitemslidable)
- [tapspace.components.AbstractItem:slideable](#tapspacecomponentsabstractitemslideable)
- [tapspace.components.AbstractItem:tappable](#tapspacecomponentsabstractitemtappable)


Source: [AbstractItem/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractItem/index.js)

<a name="tapspacecomponentsabstractitemdraggable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractItem](#tapspacecomponentsabstractitem):[draggable](#tapspacecomponentsabstractitemdraggable)(opts)

Make item draggable.
The item can be moved freely by a set of pointers.
The item maintains the size and the angle.

**Returns:**
- this, for chaining

Aliases: [tapspace.components.AbstractItem:pannable](#tapspacecomponentsabstractitempannable)

Source: [draggable.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractItem/draggable.js)

<a name="tapspacecomponentsabstractitempannable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractItem](#tapspacecomponentsabstractitem):[pannable](#tapspacecomponentsabstractitempannable)(opts)

Alias of [tapspace.components.AbstractItem:draggable](#tapspacecomponentsabstractitemdraggable)

Source: [draggable.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractItem/draggable.js)

<a name="tapspacecomponentsabstractitemslidable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractItem](#tapspacecomponentsabstractitem):[slidable](#tapspacecomponentsabstractitemslidable)(opts)

The component can be moved along a line, with limits.

**Parameters:**
- *opts*
  - *angle*
    - a number, angle in radians
  - *min*
    - a number, a distance to the right half of the unit circle.
  - *max*
    - a number, a distance to the left half of the unit circle.

Aliases: [tapspace.components.AbstractItem:slideable](#tapspacecomponentsabstractitemslideable)

Source: [slidable.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractItem/slidable.js)

<a name="tapspacecomponentsabstractitemslideable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractItem](#tapspacecomponentsabstractitem):[slideable](#tapspacecomponentsabstractitemslideable)(opts)

Alias of [tapspace.components.AbstractItem:slidable](#tapspacecomponentsabstractitemslidable)

Source: [slidable.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractItem/slidable.js)

<a name="tapspacecomponentsabstractitemtappable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractItem](#tapspacecomponentsabstractitem):[tappable](#tapspacecomponentsabstractitemtappable)(options)

Make item tappable i.e. make it emit tap events.

**Parameters:**
- *options*
  - optional object with properties
    - *TODO*

Makes the component emit events:
- *tap*
- *tapstart*
- *tapend*

**Returns:**
- this, for chaining

Source: [tappable.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractItem/tappable.js)

<a name="tapspacecomponentsabstractnode"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode)(element)

Abstract class for all affine components that have a HTML element.
AbstractNodes form an affine subtree in DOM.

**Parameters:**
- *element*
  - a HTMLElement

- [tapspace.components.AbstractNode:findCommonAncestor](#tapspacecomponentsabstractnodefindcommonancestor)
- [tapspace.components.AbstractNode:getAncestors](#tapspacecomponentsabstractnodegetancestors)
- [tapspace.components.AbstractNode:getChildren](#tapspacecomponentsabstractnodegetchildren)
- [tapspace.components.AbstractNode:getElement](#tapspacecomponentsabstractnodegetelement)
- [tapspace.components.AbstractNode:getParent](#tapspacecomponentsabstractnodegetparent)
- [tapspace.components.AbstractNode:getRoot](#tapspacecomponentsabstractnodegetroot)
- [tapspace.components.AbstractNode:isRoot](#tapspacecomponentsabstractnodeisroot)


Source: [AbstractNode/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/index.js)

<a name="tapspacecomponentsabstractnodefindcommonancestor"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[findCommonAncestor](#tapspacecomponentsabstractnodefindcommonancestor)(node)

Find lowest common affine ancestor of self and the given node.

**Parameters:**
- *node*
  - an AbstractNode

**Returns:**
- an AbstractNode. Null if no common ancestor is found.

Note that the result might not be a true ancestor:
- If the given node is a predecessor of self, then self is returned and vice versa.
- If the given node equals self, then self is returned.

For algorithmic comparison, see note 2022-04-01-19

See also https://en.wikipedia.org/wiki/Lowest_common_ancestor

Source: [findCommonAncestor.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/findCommonAncestor.js)

<a name="tapspacecomponentsabstractnodegetancestors"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[getAncestors](#tapspacecomponentsabstractnodegetancestors)()

Affine ancestors, ordered from the immediate parent to
the farthest ancestor, the immediate parent first.

**Returns:**
- array of AbstractNode

Source: [getAncestors.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/getAncestors.js)

<a name="tapspacecomponentsabstractnodegetchildren"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[getChildren](#tapspacecomponentsabstractnodegetchildren)()

Get all affine children from DOM.

**Returns:**
- array of AbstractNode

Source: [getChildren.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/getChildren.js)

<a name="tapspacecomponentsabstractnodegetelement"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[getElement](#tapspacecomponentsabstractnodegetelement)()

Get the affine HTML element of the component.
Note that if you created the component from
a HTML string or HTML element using [tapspace.element](#tapspaceelement),
the element returned by this function is not the element
you gave but the element that wraps it.

**Returns:**
- a HTMLElement

Source: [getElement.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/getElement.js)

<a name="tapspacecomponentsabstractnodegetparent"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[getParent](#tapspacecomponentsabstractnodegetparent)()

Get the affine parent of the plane. Null if no affine parent.

**Returns:**
- an AbstractPlane, the parent.
- null if no affine parent.

Source: [getParent.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/getParent.js)

<a name="tapspacecomponentsabstractnodegetroot"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[getRoot](#tapspacecomponentsabstractnodegetroot)()

Get the affine root. Will return self if has no affine parent.

**Returns:**
- an AbstractNode

Source: [getRoot.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/getRoot.js)

<a name="tapspacecomponentsabstractnodeisroot"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractNode](#tapspacecomponentsabstractnode):[isRoot](#tapspacecomponentsabstractnodeisroot)()

Is the element an affine root i.e.
the element does not have an affine parent.

**Returns:**
- *boolean*

Source: [isRoot.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractNode/isRoot.js)

<a name="tapspacecomponentsabstractplane"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane)(element, opts)

Abstract class for affine components that span a coordinate plane.

**Parameters:**
- *element*
  - a HTMLElement
- *opts*
  - *anchor*
    - { x, y } on the element. Default { x:0, y:0 }

- [tapspace.components.AbstractPlane:addChild](#tapspacecomponentsabstractplaneaddchild)
- [tapspace.components.AbstractPlane:animate](#tapspacecomponentsabstractplaneanimate)
- [tapspace.components.AbstractPlane:at](#tapspacecomponentsabstractplaneat)
- [tapspace.components.AbstractPlane:atAnchor](#tapspacecomponentsabstractplaneatanchor)
- [tapspace.components.AbstractPlane:getDirection](#tapspacecomponentsabstractplanegetdirection)
- [tapspace.components.AbstractPlane:getPosition](#tapspacecomponentsabstractplanegetposition)
- [tapspace.components.AbstractPlane:getScale](#tapspacecomponentsabstractplanegetscale)
- [tapspace.components.AbstractPlane:getTransitionFrom](#tapspacecomponentsabstractplanegettransitionfrom)
- [tapspace.components.AbstractPlane:getTransitionTo](#tapspacecomponentsabstractplanegettransitionto)
- [tapspace.components.AbstractPlane:getTransitionToParent](#tapspacecomponentsabstractplanegettransitiontoparent)
- [tapspace.components.AbstractPlane:getTransitionToParentOf](#tapspacecomponentsabstractplanegettransitiontoparentof)
- [tapspace.components.AbstractPlane:match](#tapspacecomponentsabstractplanematch)
- [tapspace.components.AbstractPlane:moveTo](#tapspacecomponentsabstractplanemoveto)
- [tapspace.components.AbstractPlane:renderTransform](#tapspacecomponentsabstractplanerendertransform)
- [tapspace.components.AbstractPlane:rotateBy](#tapspacecomponentsabstractplanerotateby)
- [tapspace.components.AbstractPlane:scaleBy](#tapspacecomponentsabstractplanescaleby)
- [tapspace.components.AbstractPlane:setAnchor](#tapspacecomponentsabstractplanesetanchor)
- [tapspace.components.AbstractPlane:snapPixels](#tapspacecomponentsabstractplanesnappixels)
- [tapspace.components.AbstractPlane:transformBy](#tapspacecomponentsabstractplanetransformby)
- [tapspace.components.AbstractPlane:translateBy](#tapspacecomponentsabstractplanetranslateby)
- [tapspace.components.AbstractPlane:translateTo](#tapspacecomponentsabstractplanetranslateto)


Source: [AbstractPlane/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/index.js)

<a name="tapspacecomponentsabstractplaneaddchild"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[addChild](#tapspacecomponentsabstractplaneaddchild)(component, position)

Place a component onto this plane.

**Parameters:**
- *component*
  - an AbstractPlane
- *position*
  - optional Point or {x,y} or {x,y,z}.
  - Defines the initial position for the component.
  - You can leave the position parameter undefined and move the component to its position afterwards.
  - Also, if you have already prepared the local coordinates of the component and want to preserve them as is, then leave the position parameter undefined.

**Returns:**
- this, for chaining

Source: [addChild.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/addChild.js)

<a name="tapspacecomponentsabstractplaneanimate"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[animate](#tapspacecomponentsabstractplaneanimate)(options)

Update CSS transition animation properties of the component.

**Parameters:**
- *options*
  - boolean or optional object with properties:
    - *duration*
      - optional string. The transition-duration value, e.g. '500ms' or '2s'. Default is '200ms'.
    - *easing*
      - optional string. The transition-timing-function, e.g. 'linear' or 'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
    - *delay*
      - optional string. The transition-delay value, e.g. '500ms' or '2s'. Default is '0ms'.
  - If boolean false, animation becomes disabled.

**Returns:**
- this, for chaining

Source: [animate.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/animate.js)

<a name="tapspacecomponentsabstractplaneat"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[at](#tapspacecomponentsabstractplaneat)(x, y, z)

Get a point on the plane by using local plane coordinates.

**Parameters:**
- *x*
  - a number, the x coordinate on the plane.
  - a point2, the {x,y} on the plane.
  - a Point, the point in space. Will be transited onto this plane.
- *y*
  - a number, the y coordinate on the plane. Optional if x is a point.
- *z*
  - optional number, the z coordinate relative to the plane.

**Returns:**
- a Point on the plane

Source: [at.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/at.js)

<a name="tapspacecomponentsabstractplaneatanchor"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[atAnchor](#tapspacecomponentsabstractplaneatanchor)(alt)

Get the plane anchor point or the optional given point on the plane.

**Parameters:**
- *alt*
  - optional point2 or Point. If given, returns this point instead,
  - after transited onto the plane. Useful way to default a point to the
  - plane anchor if the point is nullish.

**Returns:**
- a Point

Source: [atAnchor.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/atAnchor.js)

<a name="tapspacecomponentsabstractplanegetdirection"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getDirection](#tapspacecomponentsabstractplanegetdirection)()

The direction of the plane. This equals to the angle of the positive
x-axis of the plane. The Direction makes it easy to represent the angle
on different planes.

**Returns:**
- a Direction

Source: [getDirection.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getDirection.js)

<a name="tapspacecomponentsabstractplanegetposition"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getPosition](#tapspacecomponentsabstractplanegetposition)()

Get the position of the plane anchor, represented on the parent.
Null if there is no parent.

**Returns:**
- {x,y,z}. Null if no parent.

Source: [getPosition.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getPosition.js)

<a name="tapspacecomponentsabstractplanegetscale"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getScale](#tapspacecomponentsabstractplanegetscale)()

The scale of the plane.

**Returns:**
- a Scale

Source: [getScale.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getScale.js)

<a name="tapspacecomponentsabstractplanegettransitionfrom"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getTransitionFrom](#tapspacecomponentsabstractplanegettransitionfrom)(source)

**Parameters:**
- *source*
  - an AbstractPlane

**Returns:**
- a plane3, a plane transition matrix.

Source: [getTransitionFrom.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getTransitionFrom.js)

<a name="tapspacecomponentsabstractplanegettransitionto"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getTransitionTo](#tapspacecomponentsabstractplanegettransitionto)(target)

Compute a transition that maps the coordinate system of this plane
to the coordinate system of the target plane. The resulting transition
is an affine transformation that can be applied to geometry on this plane
to compute the same geometry represented on the the target plane.

**Parameters:**
- *target*
  - an AbstactPlane

**Returns:**
- a plane3. A transition from this plane to the target plane.

**Throws:**
- If the planes are not connected. Probably app programming error.

Source: [getTransitionTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getTransitionTo.js)

<a name="tapspacecomponentsabstractplanegettransitiontoparent"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getTransitionToParent](#tapspacecomponentsabstractplanegettransitiontoparent)()

**Returns:** a transition from the coordinate system of the element
to its parent.

TODO what if parent is non-affine

Source: [getTransitionToParent.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getTransitionToParent.js)

<a name="tapspacecomponentsabstractplanegettransitiontoparentof"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[getTransitionToParentOf](#tapspacecomponentsabstractplanegettransitiontoparentof)(target)

Get transition to the parent component of the target component.
If the target is a root, then transition is to its virtual parent.

**Parameters:**
- *target*
  - an AbstractPlane

**Returns:**
- a plane3, a transition to the real or virtual parent of the target.

Source: [getTransitionToParentOf.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/getTransitionToParentOf.js)

<a name="tapspacecomponentsabstractplanematch"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[match](#tapspacecomponentsabstractplanematch)(params)

Matching is a powerful way to position elements without the need to know
the exact rotation, scaling, or translation. Give one or more source
points and their targets. The match operation attempts to move the plane
so that the source points match their target points exactly or as
closely as possible.

**Parameters:**
- **Parameters:**, object with properties
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

**Returns:**
- this, for chaining

Source: [match.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/match.js)

<a name="tapspacecomponentsabstractplanemoveto"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[moveTo](#tapspacecomponentsabstractplanemoveto)(position, rotation, scale, anchor)

Set the placement of the component on the parent.
This moves the component anchor to the given position
and rotates and scales the component as specified.

**Parameters:**
- *position*
  - a point { x, y } on the parent or a Point. Required. The component will be moved on the parent so that the anchor of the component matches the position.
- *rotation*
  - a number or a Direction. Optional. Default 0. If a number, it is radians relative to the parent orientation.
- *scale*
  - a number or a Scale. Optional. Default 1. If a number, it is a multiplier relative to the parent scale.
- *anchor*
  - optional point2 on this or a Point. If set, the point will be used as an anchor instead of the default.

**Returns:**
- this, for chaining

Source: [moveTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/moveTo.js)

<a name="tapspacecomponentsabstractplanerendertransform"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[renderTransform](#tapspacecomponentsabstractplanerendertransform)(opts)

Update the element.style.transform according to the plane placement.

You need to call this function only when you have manually edited
or replaced the component.tran object.

**Parameters:**
- *opts*
  - *projection*
    - optional plane3 transition to be used instead of this.tran. Useful when the position needs visual adjustment without modifying the transition. See snapPixels.

Source: [renderTransform.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/renderTransform.js)

<a name="tapspacecomponentsabstractplanerotateby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[rotateBy](#tapspacecomponentsabstractplanerotateby)(radians, center)

Rotate the element.

**Parameters:**
- *radians*
  - a number, delta angle to rotate.
- *center*
  - optional Point. Rotation is performed around this point. Defaults to the plane anchor.

**Returns:**
- this, for chaining

Source: [rotateBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/rotateBy.js)

<a name="tapspacecomponentsabstractplanescaleby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[scaleBy](#tapspacecomponentsabstractplanescaleby)(multiplier, center)

Scale the element.

**Parameters:**
- *multiplier*
  - a number, the scale multiplier.
- *center*
  - optional Point. Scaling is performed about this point. Defaults to the plane anchor.

**Returns:**
- this, for chaining

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/scaleBy.js)

<a name="tapspacecomponentsabstractplanesetanchor"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[setAnchor](#tapspacecomponentsabstractplanesetanchor)(point)

Set the anchor point of the plane. This does not move the plane.

**Parameters:**
- *point*
  - a point2 on the plane or a Point in its space. The new anchor point.

**Returns:**
- this, for chaining

Source: [setAnchor.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/setAnchor.js)

<a name="tapspacecomponentsabstractplanesnappixels"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[snapPixels](#tapspacecomponentsabstractplanesnappixels)(options)

Rotation and non-integer translation blurs the pixels.
This can be annoying if the angle is close to the 90 deg modulo.
This method rounds the transition rotation slightly if it is close,
and rounds translation also to integer pixels if so.

Note that the rounding affects the input coordinates and thus
snapPixels should NOT be used during a gesture except at the end.

The method does not modify the plane transition, only the latent CSS.

**Parameters:**
- *options*
  - optional object with props:
    - *anchor*
      - optional point2 on the plane or Point. The point about to perform the rotation snapping. Rotation snapping around a point that is far from the user's gaze point – like viewport (0,0) – can cause visible translation near the gaze. The translation can be annoying during or after a rotation gesture. Therefore the rotation snapping should be performed around a point near the gesture and the gaze. Defaults to the plane anchor.

TODO option to disable either rotation or translation snap

**Returns:**
- this, for chaining

Source: [snapPixels.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/snapPixels.js)

<a name="tapspacecomponentsabstractplanetransformby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[transformBy](#tapspacecomponentsabstractplanetransformby)(tran)

Transform (move) the plane in space.
For example, let `rotate90` be a Transform that rotates the element
90 degrees clockwise. The rotation is performed around the plane anchor.
If the plane was already at the angle of 45 degrees, then after
the transformation, the plane is at the angle of 135 degrees.

**Parameters:**
- *transform*
  - a Transform

**Returns:**
- this, for chaining

Source: [transformBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/transformBy.js)

<a name="tapspacecomponentsabstractplanetranslateby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[translateBy](#tapspacecomponentsabstractplanetranslateby)(translation)

Translate the element along x-, y-, and z-axis.
Translation does not rotate or scale the element.
Translation along z-axis can change the perceived size of the element.

**Parameters:**
- *translation*
  - {x,y,z} on the parent, a Vector, or a Transform

**Returns:**
- this, for chaining

Source: [translateBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/translateBy.js)

<a name="tapspacecomponentsabstractplanetranslateto"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractPlane](#tapspacecomponentsabstractplane):[translateTo](#tapspacecomponentsabstractplanetranslateto)(point)

Translate the element anchor along x-, y-, and z-axis to the given point.
Translation does not rotate or scale the element.
Translation along z-axis can change the perceived size of the element.

**Parameters:**
- *point*
  - a Point.

**Returns:**
- this, for chaining

Source: [translateTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractPlane/translateTo.js)

<a name="tapspacecomponentsabstractview"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview)(element, opts)

Inherits [tapspace.components.AbstractFrame](#tapspacecomponentsabstractframe)

Base class for views.

**Parameters:**
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

- [tapspace.components.AbstractView:addControl](#tapspacecomponentsabstractviewaddcontrol)
- [tapspace.components.AbstractView:approach](#tapspacecomponentsabstractviewapproach)
- [tapspace.components.AbstractView:atCamera](#tapspacecomponentsabstractviewatcamera)
- [tapspace.components.AbstractView:atNorm](#tapspacecomponentsabstractviewatnorm)
- [tapspace.components.AbstractView:atPage](#tapspacecomponentsabstractviewatpage)
- [tapspace.components.AbstractView:atPageFn](#tapspacecomponentsabstractviewatpagefn)
- [tapspace.components.AbstractView:getControls](#tapspacecomponentsabstractviewgetcontrols)
- [tapspace.components.AbstractView:getSize](#tapspacecomponentsabstractviewgetsize)
- [tapspace.components.AbstractView:getSpace](#tapspacecomponentsabstractviewgetspace)
- [tapspace.components.AbstractView:isPerspective](#tapspacecomponentsabstractviewisperspective)
- [tapspace.components.AbstractView:orthogonal](#tapspacecomponentsabstractvieworthogonal)
- [tapspace.components.AbstractView:perspective](#tapspacecomponentsabstractviewperspective)
- [tapspace.components.AbstractView:renderTransform](#tapspacecomponentsabstractviewrendertransform)
- [tapspace.components.AbstractView:rotateBy](#tapspacecomponentsabstractviewrotateby)
- [tapspace.components.AbstractView:scaleBy](#tapspacecomponentsabstractviewscaleby)
- [tapspace.components.AbstractView:setSize](#tapspacecomponentsabstractviewsetsize)
- [tapspace.components.AbstractView:snapPixels](#tapspacecomponentsabstractviewsnappixels)
- [tapspace.components.AbstractView:toPage](#tapspacecomponentsabstractviewtopage)
- [tapspace.components.AbstractView:transformBy](#tapspacecomponentsabstractviewtransformby)
- [tapspace.components.AbstractView:transformPlanesBy](#tapspacecomponentsabstractviewtransformplanesby)
- [tapspace.components.AbstractView:translateBy](#tapspacecomponentsabstractviewtranslateby)


Source: [AbstractView/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/index.js)

<a name="tapspacecomponentsabstractviewaddcontrol"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[addControl](#tapspacecomponentsabstractviewaddcontrol)(control, position)

Add new control to the viewport.
Controls do not move with the space.

**Parameters:**
- *control*
  - an AbstractControl
- *position*
  - optional {x,y} on the viewport or a Point in space.

**Returns:**
- this, for chaining

Source: [addControl.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/addControl.js)

<a name="tapspacecomponentsabstractviewapproach"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[approach](#tapspacecomponentsabstractviewapproach)(factor, target)

Move the camera towards or away the given target point so that
the apparent scale change at the point depth matches the given factor.
This method of navigation nicely slows down when the target comes close
and prevents viewport flying through the target.

Useful especially in perspective viewports.
In orthogonal mode, the method is equivalent to AbstractView:scaleBy.

**Parameters:**
- *factor*
  - a number, the scale multiplier
- *target*
  - a Point

**Returns:**
- this, for chaining

Source: [approach.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/approach.js)

<a name="tapspacecomponentsabstractviewatcamera"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[atCamera](#tapspacecomponentsabstractviewatcamera)()

Get camera position relative to the viewport.
If the viewport is not perspective, returns the anchor position
on the viewport.

**Returns:**
- a Point, the camera position in the viewport space.

Source: [atCamera.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/atCamera.js)

<a name="tapspacecomponentsabstractviewatnorm"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[atNorm](#tapspacecomponentsabstractviewatnorm)(rx, ry[, rz])

Get a Point by relative coordinates, rounded to nearest integers.

**Parameters:**
- *rx*
  - number. 0 at left edge, 1 at right edge.
- *ry*
  - number. 0 at top edge, 1 at bottom edge.
- *rz*
  - optional number. 0 at projection image plane, 1 at height depth.

**Returns:**
- Point on the element

Source: [atNorm.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/atNorm.js)

<a name="tapspacecomponentsabstractviewatpage"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[atPage](#tapspacecomponentsabstractviewatpage)(pageX, pageY)

Compute a point on the viewport from page coordinates.
Pointer events are a common source for page coordinates.

**Parameters:**
- *pageX*
  - a number
- *pageY*
  - a number

**Returns:**
- a Point on viewport

Source: [atPage.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/atPage.js)

<a name="tapspacecomponentsabstractviewatpagefn"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[atPageFn](#tapspacecomponentsabstractviewatpagefn)()

Get a function that computes a point on the viewport from page coords.
Pointer events are a common source for page coordinates.

Efficency: we assume that reading values from DOM is relatively slow
and that with lots of points, it is better to query DOM once
and apply that to each point, than query DOM for each point separately.
TODO proof the efficency

**Parameters:**


**Returns:**
- a function
  - *Parameters*
    - *pageX*
      - a number
    - *pageY*
      - a number
  - *Returns*
    - a Point on viewport

Source: [atPageFn.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/atPageFn.js)

<a name="tapspacecomponentsabstractviewgetcontrols"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[getControls](#tapspacecomponentsabstractviewgetcontrols)()

**Returns:** all control group components of the viewport.

**Returns:**
- array of Controls

Source: [getControls.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/getControls.js)

<a name="tapspacecomponentsabstractviewgetsize"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[getSize](#tapspacecomponentsabstractviewgetsize)()

Get viewport size. The size is read from the viewport
element.offsetWidth and element.offsetHeight.

**Returns:**
- a Size

Source: [getSize.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/getSize.js)

<a name="tapspacecomponentsabstractviewgetspace"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[getSpace](#tapspacecomponentsabstractviewgetspace)()

**Returns:**
- a Space

Source: [getSpace.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/getSpace.js)

<a name="tapspacecomponentsabstractviewisperspective"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[isPerspective](#tapspacecomponentsabstractviewisperspective)()

Check if the viewport projection mode is perspective.

**Returns:**
- *boolean*

Source: [isPerspective.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/isPerspective.js)

<a name="tapspacecomponentsabstractvieworthogonal"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[orthogonal](#tapspacecomponentsabstractvieworthogonal)()

Set viewport projection to orthogonal.
The z-dimension of elements is disregarded, the space becomes flat.
Elements far away appear same size as elements close by.
Zooming the viewport is implemented via scaling.

See also [tapspace.components.AbstractView:perspective](#tapspacecomponentsabstractviewperspective)

**Returns:**
- this, for chaining

Source: [orthogonal.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/orthogonal.js)

<a name="tapspacecomponentsabstractviewperspective"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[perspective](#tapspacecomponentsabstractviewperspective)(distance)

Set viewport projection to perspective.
Elements far away in z-dimension are rendered smaller
and exhibit motion parallax when viewport is panned.
Zooming the viewport is implemented via moving the viewport deeper.

**Parameters:**
- *distance*
  - optional positive number. Default 300.
  - The distance of the user from the projection image plane measured in the units of the image plane.
  - Larger values cause smaller perspective effect.

**Returns:**
- this, for chaining

See also [tapspace.components.AbstractView:perspective](#tapspacecomponentsabstractviewperspective)

Source: [perspective.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/perspective.js)

<a name="tapspacecomponentsabstractviewrendertransform"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[renderTransform](#tapspacecomponentsabstractviewrendertransform)(opts)

Updates the element.style.transform according to the plane transition.

You need to call this function only when you have manually edited
or replaced a plane.tran object.

**Parameters:**
- *opts*
  - optional object. See AbstractPlane:renderTransform for details.

Source: [renderTransform.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/renderTransform.js)

<a name="tapspacecomponentsabstractviewrotateby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[rotateBy](#tapspacecomponentsabstractviewrotateby)(angle, center)

Rotate the viewport in space around anchor.

**Parameters:**
- *angle*
  - a number, the delta angle to rotate the viewport.
- *center*
  - optional Point. Scaling is performed about this point. Defaults to the viewport anchor.

**Returns:**
- this, for chaining

Source: [rotateBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/rotateBy.js)

<a name="tapspacecomponentsabstractviewscaleby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[scaleBy](#tapspacecomponentsabstractviewscaleby)(factor, center)

Translate the viewport in space along x and y axis.

**Parameters:**
- *factor*
  - a number
- *center*
  - an optional Point. Scaling is performed about this point. Defaults to the viewport anchor.

**Returns:**
- this, for chaining

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/scaleBy.js)

<a name="tapspacecomponentsabstractviewsetsize"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[setSize](#tapspacecomponentsabstractviewsetsize)(size)

Set viewport size.

**Parameters:**
- *size*
  - a {w,h} or a {width,height} object. If {w,h} or {width,height} format is used, the dimensions can be either number of pixels or CSS length strings.

**Returns:**
- this, for chaining

Source: [setSize.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/setSize.js)

<a name="tapspacecomponentsabstractviewsnappixels"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[snapPixels](#tapspacecomponentsabstractviewsnappixels)(options)

Snap viewport position and angle to pixels when the angle is near
a multitude of 90 degrees.

**Parameters:**
- *options*
  - optional object with props:
    - *anchor*
      - a point2 or Point

Source: [snapPixels.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/snapPixels.js)

<a name="tapspacecomponentsabstractviewtopage"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[toPage](#tapspacecomponentsabstractviewtopage)(viewX, viewY)

Compute a point on the page from a point on the viewport.
Practical if points need to be normalised on the page.

**Parameters:**
- *viewX*
  - a number
- *viewY*
  - a number

**Returns:**
- a point2 on the page

Source: [toPage.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/toPage.js)

<a name="tapspacecomponentsabstractviewtransformby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[transformBy](#tapspacecomponentsabstractviewtransformby)(tran)

Overwrites AbstractPlane:transformBy

Transform the viewport in relation to the root planes. In effect, this
transforms all root planes with the inversion of the tran.

**Parameters:**
- *tr*
  - a Transform

**Returns:**
- this, for chaining

Source: [transformBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/transformBy.js)

<a name="tapspacecomponentsabstractviewtransformplanesby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[transformPlanesBy](#tapspacecomponentsabstractviewtransformplanesby)(tran, opts)

Transform the root planes in relation to the viewport. In effect, this
transforms all planes with the tran. Use this to navigate the space.

**Parameters:**
- *tran*
  - a Transform

**Returns:**
- this, for chaining

Source: [transformPlanesBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/transformPlanesBy.js)

<a name="tapspacecomponentsabstractviewtranslateby"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[AbstractView](#tapspacecomponentsabstractview):[translateBy](#tapspacecomponentsabstractviewtranslateby)(translation, opts)

Translate the viewport in space along x, y, and z axis.

**Parameters:**
- *translation*
  - a Vector or vec2 or vec3

**Returns:**
- this, for chaining

Source: [translateBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/AbstractView/translateBy.js)

<a name="tapspacecomponentscircle"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Circle](#tapspacecomponentscircle)(radius, color, opts)

A colorful circle.
Instance class for a circle-like object on an affine plane.
Useful for debugging coordinate positions.

**Parameters:**
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

Source: [Circle/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Circle/index.js)

<a name="tapspacecomponentsedge"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Edge](#tapspacecomponentsedge)(border, opts)

Edge is an instance class for a div with one visible border.
It can be used as a line that connects components.

**Parameters:**
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

- [tapspace.components.Edge:getLength](#tapspacecomponentsedgegetlength)


Source: [Edge/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Edge/index.js)

<a name="tapspacecomponentsedgegetlength"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Edge](#tapspacecomponentsedge):[getLength](#tapspacecomponentsedgegetlength)()

Get length of the edge in local pixels.

**Returns:**
- a number, pixels on the edge plane.

Source: [getLength.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Edge/getLength.js)

<a name="tapspacecomponentselement"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Element](#tapspacecomponentselement)(content, opts)

Inherits AbstractItem

Instance class for custom HTMLElement on affine plane.

**Parameters:**
- *content*
  - a HTMLElement or HTML string. The given element(s) will be wrapped in an affine div.
- *opts*
  - *id*
    - a string, optional. The id attribute of the wrapper element.
  - *className*
    - a string, optional. The class attribute of the wrapper element.
  - *anchor*
    - { x, y } on the element. Default {x:0,y:0}
  - *size*
    - { width, height }

Source: [Element/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Element/index.js)

<a name="tapspacecomponentsgroup"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Group](#tapspacecomponentsgroup)()

Inherits [tapspace.components.AbstractPlane](#tapspacecomponentsabstractplane)
Inherits [tapspace.components.AbstractActive](#tapspacecomponentsabstractactive)

A set of affine components.
The group element has zero width and height.
Still, it can be interacted on its content.

Source: [Group/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Group/index.js)

<a name="tapspacecomponentspixel"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Pixel](#tapspacecomponentspixel)(color, opts)

Instance class for a 1x1 pixel on affine plane.

Inherits [tapspace.components.AbstractFrame](#tapspacecomponentsabstractframe)

**Parameters:**
- *color*
  - a string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
- opts, optional object
  - *id*
    - optional string. The id attribute of the element.
  - *className*
    - optional string. The class attribute of the element.
  - *anchor*
    - optional { x, y } on the element. Default {x:0,y:0}

Source: [Pixel/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Pixel/index.js)

<a name="tapspacecomponentsplane"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Plane](#tapspacecomponentsplane)()

Inherits [tapspace.components.AbstractPlane](#tapspacecomponentsabstractplane)

A container for affine components.
The plane element has zero width and height.
The plane cannot be interacted with, except by viewport.
Its contents can be.

- [tapspace.components.Plane.add](#tapspacecomponentsplaneadd)


Source: [Plane/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Plane/index.js)

<a name="tapspacecomponentsplaneadd"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Plane](#tapspacecomponentsplane).[add](#tapspacecomponentsplaneadd)(content, position)

Add HTML element on the plane.

**Parameters:**
- *content*
  - a HTMLElement, HTML string, or AffineElement
- *placement*
  - various, see AbstractPlane.addChild
- *options*
  - optional object with optional properties:
    - *size*

**Returns:**
- an AffineElement

Source: [add.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Plane/add.js)

<a name="tapspacecomponentsspace"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Space](#tapspacecomponentsspace)(viewport)

Space is a part of viewport and act as a container for planes.
Space is needed to keep Controls and Planes separate and
still enable transitions between controls and the space content.

**Parameters:**
- *viewport*
  - a Viewport, reference to the viewport

The space has zero size. TODO where to capture input, in view or space?

- [tapspace.components.Space:create](#tapspacecomponentsspacecreate)
- [tapspace.components.Space:createPlane](#tapspacecomponentsspacecreateplane)
- [tapspace.components.Space:getView](#tapspacecomponentsspacegetview)
- [tapspace.components.Space:plane](#tapspacecomponentsspaceplane)
- [tapspace.components.Space:viewport](#tapspacecomponentsspaceviewport)


Source: [Space/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/index.js)

<a name="tapspacecomponentsspacecreate"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Space](#tapspacecomponentsspace):[create](#tapspacecomponentsspacecreate)

Alias of [tapspace.create](#tapspacecreate)

Source: [create.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/create.js)

<a name="tapspacecomponentsspacecreateplane"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Space](#tapspacecomponentsspace):[createPlane](#tapspacecomponentsspacecreateplane)()

Create an origin plane for further content. Origin planes
are immediate children of the space. Each origin plane
spans a coordinate system, unlike the space.

**Parameters:**
- *position*
  - a Point, the origin of the plane.
  - a Transit, the origin of the plane with scale and orientation.

**Returns:**
- a Plane

Aliases: [tapspace.components.Space:plane](#tapspacecomponentsspaceplane)

Source: [createPlane.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/createPlane.js)

<a name="tapspacecomponentsspacegetview"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Space](#tapspacecomponentsspace):[getView](#tapspacecomponentsspacegetview)()

Alias of [tapspace.components.Space:viewport](#tapspacecomponentsspaceviewport)

Source: [getView.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/getView.js)

<a name="tapspacecomponentsspaceplane"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Space](#tapspacecomponentsspace):[plane](#tapspacecomponentsspaceplane)

Alias of [tapspace.components.Space:createPlane](#tapspacecomponentsspacecreateplane)

Source: [createPlane.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/createPlane.js)

<a name="tapspacecomponentsspaceviewport"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Space](#tapspacecomponentsspace):[viewport](#tapspacecomponentsspaceviewport)()

Get the viewport that is associated with the space.
This is the main way for users to access the viewport
after initializing the space.

**Returns:**
- a Viewport

Aliases: [tapspace.components.Space:getView](#tapspacecomponentsspacegetview)

Source: [getView.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/getView.js)

<a name="tapspacecomponentsviewport"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Viewport](#tapspacecomponentsviewport)(element, opts)

Inherits AbstractView

When the viewport is transformed, it does not move on the page.
Instead, the space and its root planes are moved
in opposite direction. This, combined with overflow CSS styles,
creates an illusion of a viewport into a space.

**Parameters:**
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

- [tapspace.components.Viewport:pannable](#tapspacecomponentsviewportpannable)
- [tapspace.components.Viewport:responsive](#tapspacecomponentsviewportresponsive)
- [tapspace.components.Viewport:rotatable](#tapspacecomponentsviewportrotatable)
- [tapspace.components.Viewport:zoomable](#tapspacecomponentsviewportzoomable)


Source: [Viewport/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Viewport/index.js)

<a name="tapspacecomponentsviewportpannable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Viewport](#tapspacecomponentsviewport):[pannable](#tapspacecomponentsviewportpannable)(opts)

Make the viewport pannable (= draggable).
The view can be moved freely by a set of pointers.
The view maintains the size and the angle.

**Returns:**
- this, for chaining

Source: [pannable/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Viewport/pannable/index.js)

<a name="tapspacecomponentsviewportresponsive"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Viewport](#tapspacecomponentsviewport):[responsive](#tapspacecomponentsviewportresponsive)(opts)

Make the viewport responsive to container size changes.
Keeps the viewport center at the same position relative to its size.

**Parameters:**
- *opts*
  - optional boolean false to disable
  - optional object with props:
    - *relativeCenter*
      - optional { rx, ry }, the relative point to keep fixed while resizing. Default { rx: 0.5, ry: 0.5 }

**Returns:**
- this, for chaining

Source: [responsive/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Viewport/responsive/index.js)

<a name="tapspacecomponentsviewportrotatable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Viewport](#tapspacecomponentsviewport):[rotatable](#tapspacecomponentsviewportrotatable)(opts)

Make the viewport zoomable.
The viewport can be scaled by pinch gesture and mouse wheel.

**Parameters:**
- opts, optional boolean or object with props:
  - *center*
    - a Point, the vanishing point for zoom.

**Returns:**
- this, for chaining

Source: [rotatable/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Viewport/rotatable/index.js)

<a name="tapspacecomponentsviewportzoomable"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[Viewport](#tapspacecomponentsviewport):[zoomable](#tapspacecomponentsviewportzoomable)(opts)

Make the viewport zoomable.
The viewport can be scaled by pinch gesture and mouse wheel.
If the viewport panning is also enabled, the viewport can
be moved and zoomed freely.

**Parameters:**
- opts, optional boolean or object with props:
  - *center*
    - a Point, the vanishing point for zoom.
    - Defaults to gesture mean point.

**Returns:**
- this, for chaining

**Usage:**
```
const view = space.getViewport()
view.zoomable()
```

Source: [zoomable/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Viewport/zoomable/index.js)

<a name="tapspacecomponentszoomcontrol"></a>
## [tapspace](#tapspace).[components](#tapspacecomponents).[ZoomControl](#tapspacecomponentszoomcontrol)(options)

Basic +/- buttons to zoom the viewport in and out.

Inherits [tapspace.components.AbstractControl](#tapspacecomponentsabstractcontrol)

**Parameters:**
- *options*
  - optional object with properties
    - *scaleStep*
      - optional number, default 1.2.
      - The scale multiplier of single zoom step.

Source: [ZoomControl/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/ZoomControl/index.js)

<a name="tapspacecreate"></a>
## [tapspace](#tapspace).[create](#tapspacecreate)(element, options)

Convert element into a zoomable space.

**Parameters:**
- *element*
  - HTMLElement or query string
- *options*
  - an optional object with properties:
    - *size*
      - a { width, height }

**Returns:**
- a [tapspace.components.Space](#tapspacecomponentsspace)

**Usage:**
```
const space = tapspace.create('#space')
```

Aliases: [tapspace.components.Space:create](#tapspacecomponentsspacecreate)

Source: [create.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Space/create.js)

<a name="tapspaceedge"></a>
## [tapspace](#tapspace).[edge](#tapspaceedge)(border, opts)

Create an Edge component. The edge is a straight line between
two points.

**Parameters:** see [tapspace.components.Edge](#tapspacecomponentsedge)

**Returns:**
- a [tapspace.components.Edge](#tapspacecomponentsedge)

Source: [create.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Edge/create.js)

<a name="tapspaceedgeatend"></a>
## [tapspace](#tapspace).[Edge](#tapspaceedge):[atEnd](#tapspaceedgeatend)()

Get the Point at the edge ending, at the middle of the border.

**Returns:** a Point

Source: [atEnd.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Edge/atEnd.js)

<a name="tapspaceedgeatstart"></a>
## [tapspace](#tapspace).[Edge](#tapspaceedge):[atStart](#tapspaceedgeatstart)()

Get the Point at the edge beginning, at the middle of the border.

**Returns:** a Point

Source: [atStart.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Edge/atStart.js)

<a name="tapspaceedgesetpoints"></a>
## [tapspace](#tapspace).[Edge](#tapspaceedge):[setPoints](#tapspaceedgesetpoints)(startPoint, endPoint)

Set edge start and end points.
Note that this does not scale the edge.

**Parameters:**
- *startPoint*
  - a Point
- *endPoint*
  - a Point

**Returns:**
- this, for chaining

Source: [setPoints.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Edge/setPoints.js)

<a name="tapspaceeffects"></a>
## [tapspace](#tapspace).[effects](#tapspaceeffects)

Effects are animations that can be triggered
programmatically for example as part of interaction.

- [tapspace.effects.press](#tapspaceeffectspress)


Source: [effects/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/effects/index.js)

<a name="tapspaceeffectspress"></a>
## [tapspace](#tapspace).[effects](#tapspaceeffects).[press](#tapspaceeffectspress)

Pressing effect: the element moves down a bit and then back up.

**Parameters:**
- *options*
  - *distance*
    - optional number. Displacement during press in pixels. Default 2.
  - *attack*
    - time to press down. ms
  - *hold*
    - time between presses. ms
  - *release*
    - time to press up. ms

Source: [press/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/effects/press/index.js)

<a name="tapspaceelement"></a>
## [tapspace](#tapspace).[element](#tapspaceelement)(content, options)

Make element an affine component. Wraps the content inside
an affine div.

**Parameters:**
- *content*
  - a HTMLElement or HTML string. The given element(s) will be wrapped in a div.
- *options*
  - optional object with properties
    - *id*
      - a string, optional. The id attribute of the wrapper element.
    - *className*
      - a string, optional. The class attribute of the wrapper element.
    - *anchor*
      - { x, y } on the element. Default {x:0,y:0}
    - *size*
      - { width, height }

**Returns:**
- a [tapspace.components](#tapspacecomponents).Component

Source: [create.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/components/Element/create.js)

<a name="tapspacegeometry"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry)

Various geometries in affine space.

All geometry models are *immutable* meaning that their state
does not change and new objects are returned instead. For example,
`vec.rotateBy(PI)` does not change `vec` but returns a new rotated vector.

Each geometry provides methods to transit it between affine elements,
meaning that its coordinates can be mapped and represented in the
coordinate systems of other elements.

Geometry transitions are *passive transformations* in a sense that
they do not change the geometry, only the frame of reference.

An example of an *active transformation* is the Transform class
which can be used to move both geometry and affine elements around.

- [tapspace.geometry.Direction](#tapspacegeometrydirection)
- [tapspace.geometry.Distance](#tapspacegeometrydistance)
- [tapspace.geometry.Point](#tapspacegeometrypoint)
- [tapspace.geometry.Scale](#tapspacegeometryscale)
- [tapspace.geometry.Size](#tapspacegeometrysize)
- [tapspace.geometry.Transform](#tapspacegeometrytransform)
- [tapspace.geometry.Vector](#tapspacegeometryvector)


Source: [geometry/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/index.js)

<a name="tapspacegeometrydirection"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Direction](#tapspacegeometrydirection)(basis, angle)

Direction on xy-plane represented as an absolute angle.
The representation depends on the orientation of the coordinate space and
therefore the angle needs conversion between planes.
In contrast, a rotation is a change in the angle and does not depend on
the orientation.

**Parameters:**
- *basis*
  - a Component
- *angle*
  - a number, the rotation in radians from the angle zero.

- [tapspace.geometry.Direction:changeBasis](#tapspacegeometrydirectionchangebasis)


Source: [Direction/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Direction/index.js)

<a name="tapspacegeometrydirectionchangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Direction](#tapspacegeometrydirection):[changeBasis](#tapspacegeometrydirectionchangebasis)(newBasis)

**Parameters:**
- *newBasis*
  - a component

**Returns:**
- a Direction

Source: [changeBasis.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Direction/changeBasis.js)

<a name="tapspacegeometrydistance"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Distance](#tapspacegeometrydistance)(basis, d)

Distance represents a scalar measure in affine space.
In coordinate system transitions, rotations and translations do
not affect the distance. Only the scale does.

**Parameters:**
- *basis*
  - a component, the frame of reference for the distance.
- *d*
  - number, a measure. Cannot be negative.

Properties:
- *basis*
- *d*

- [tapspace.geometry.Distance:changeBasis](#tapspacegeometrydistancechangebasis)
- [tapspace.geometry.Distance:multiply](#tapspacegeometrydistancemultiply)
- [tapspace.geometry.Distance:scaleBy](#tapspacegeometrydistancescaleby)


Source: [Distance/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Distance/index.js)

<a name="tapspacegeometrydistancechangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Distance](#tapspacegeometrydistance):[changeBasis](#tapspacegeometrydistancechangebasis)(newBasis)

**Parameters:**
- *newBasis*
  - an affine component

**Returns:**
- a Distance

Source: [changeBasis.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Distance/changeBasis.js)

<a name="tapspacegeometrydistancemultiply"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Distance](#tapspacegeometrydistance):[multiply](#tapspacegeometrydistancemultiply)

Alias of [tapspace.geometry.Distance:scaleBy](#tapspacegeometrydistancescaleby)

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Distance/scaleBy.js)

<a name="tapspacegeometrydistancescaleby"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Distance](#tapspacegeometrydistance):[scaleBy](#tapspacegeometrydistancescaleby)(multiplier)

Multiply the distance. Returns new Distance.

**Parameters:**
- *multiplier*
  - a number

**Returns:**
- a Distance

Aliases: [tapspace.geometry.Distance:multiply](#tapspacegeometrydistancemultiply)

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Distance/scaleBy.js)

<a name="tapspacegeometrypoint"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint)(basis, x, y, z)

A 3D point in a space. This can also be called a 3D position vector.
See [tapspace.geometry.Vector](#tapspacegeometryvector) for a 3D displacement vector.

**Parameters:**
- *basis*
  - a Component
- *x*
  - a number or a point2 or point3
- *y*
  - a number
- *z*
  - optional number, default 0

Example
```
let p = new tapspace.Point(basis, x, y, z)
```

- [tapspace.geometry.Point:changeBasis](#tapspacegeometrypointchangebasis)
- [tapspace.geometry.Point:distanceTo](#tapspacegeometrypointdistanceto)
- [tapspace.geometry.Point:offset](#tapspacegeometrypointoffset)
- [tapspace.geometry.Point:plain](#tapspacegeometrypointplain)
- [tapspace.geometry.Point:polarOffset](#tapspacegeometrypointpolaroffset)
- [tapspace.geometry.Point:projectTo](#tapspacegeometrypointprojectto)
- [tapspace.geometry.Point:round](#tapspacegeometrypointround)
- [tapspace.geometry.Point:vectorTo](#tapspacegeometrypointvectorto)
- [tapspace.geometry.Point.fromAverage](#tapspacegeometrypointfromaverage)
- [tapspace.geometry.Point.fromMean](#tapspacegeometrypointfrommean)


Source: [Point/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/index.js)

<a name="tapspacegeometrypointchangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[changeBasis](#tapspacegeometrypointchangebasis)(newBasis)

**Parameters:**
- *newBasis*
  - an affine component

**Returns:**
- a Point

Source: [changeBasis.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/changeBasis.js)

<a name="tapspacegeometrypointdistanceto"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[distanceTo](#tapspacegeometrypointdistanceto)(p)

Distance between points.

**Parameters:**
- *p*
  - a Point or {x,y,z}. The latter is assumed to be on the same basis.

**Returns:**
- a Distance

Source: [distanceTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/distanceTo.js)

<a name="tapspacegeometrypointoffset"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[offset](#tapspacegeometrypointoffset)(dx, dy, dz)

Get a point when the current point is offset by dx, dy, and dz.

**Parameters:**
- *dx*
  - a number of pixels to move horizontally.
- *dy*
  - a number of pixels to move vertically.
- *dz*
  - optional number of pixels to move deeper. Default 0.

**Returns:**
- a Point

Source: [offset.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/offset.js)

<a name="tapspacegeometrypointplain"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[plain](#tapspacegeometrypointplain)()

**Returns:** plain point3 object {x,y,z} without basis data.

Source: [plain.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/plain.js)

<a name="tapspacegeometrypointpolaroffset"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[polarOffset](#tapspacegeometrypointpolaroffset)(distance, angle)

Get the point at the given distance at the angle on the same plane.

**Parameters:**
- *distance*
  - a number on the basis or a Distance.
- *angle*
  - a number in radians on the basis or a Direction.

**Returns:**
- a Point

Source: [polarOffset.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/polarOffset.js)

<a name="tapspacegeometrypointprojectto"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[projectTo](#tapspacegeometrypointprojectto)(basis, camera)

Project the point onto the given plane

**Parameters:**
- *basis*
  - an affine component, the target basis.
- *camera*
  - a point, relative to the reference basis.

**Returns:**
- a Point, represented on the target basis.

Source: [projectTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/projectTo.js)

<a name="tapspacegeometrypointround"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[round](#tapspacegeometrypointround)()

Round the point to nearest integers.

**Returns:**
- a Point

Source: [round.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/round.js)

<a name="tapspacegeometrypointvectorto"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint):[vectorTo](#tapspacegeometrypointvectorto)(p)

Get a vector from this to the point p.

**Parameters:**
- *p*
  - a Point

**Returns:**
- a Vector on this basis.

Source: [vectorTo.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/vectorTo.js)

<a name="tapspacegeometrypointfromaverage"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint).[fromAverage](#tapspacegeometrypointfromaverage)(basis, points)

Mean of an array of points.

**Parameters:**
- *basis*
  - a Plane
- *points*
  - an array of Point instances

**Returns:**
- a Point on the given basis

Example
```
const mean = tapspace.Point.fromAverage(basis, points)
```

Aliases: [tapspace.geometry.Point.fromMean](#tapspacegeometrypointfrommean)

Source: [fromAverage.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/fromAverage.js)

<a name="tapspacegeometrypointfrommean"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Point](#tapspacegeometrypoint).[fromMean](#tapspacegeometrypointfrommean)

Alias of [tapspace.geometry.Point.fromAverage](#tapspacegeometrypointfromaverage)

Source: [fromAverage.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Point/fromAverage.js)

<a name="tapspacegeometryscale"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Scale](#tapspacegeometryscale)(basis, multiplier)

The scale in space.
The scale depends on the scale of the coordinate space and
therefore needs conversion between planes.

In contrast, a scaling aka dilation is not the same as the scale.
Dilation is a change in the scale, for example doubling,
and therefore does not depend on the plane.

**Parameters:**
- *basis*
  - a Component
- *multiplier*
  - a number, the scale multiplier relative to the basis scale.

- [tapspace.geometry.Scale:changeBasis](#tapspacegeometryscalechangebasis)


Source: [Scale/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Scale/index.js)

<a name="tapspacegeometryscalechangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Scale](#tapspacegeometryscale):[changeBasis](#tapspacegeometryscalechangebasis)(newBasis)

**Parameters:**
- *newBasis*
  - a component

**Returns:**
- a Scale

Source: [changeBasis.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Scale/changeBasis.js)

<a name="tapspacegeometrysize"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Size](#tapspacegeometrysize)(basis, width, height)

A rectangular size in space. Basically it is two-dimensional distance.
If you need to represent a rectangular shape in space, use Path or Polygon
instead.

**Parameters:**
- *basis*
  - a Component
- *width*
  - a number, the width on the basis
- *height*
  - a number, the height on the basis

- [tapspace.geometry.Size:at](#tapspacegeometrysizeat)
- [tapspace.geometry.Size:atNorm](#tapspacegeometrysizeatnorm)
- [tapspace.geometry.Size:atToNorm](#tapspacegeometrysizeattonorm)
- [tapspace.geometry.Size:changeBasis](#tapspacegeometrysizechangebasis)


Source: [Size/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Size/index.js)

<a name="tapspacegeometrysizeat"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Size](#tapspacegeometrysize):[at](#tapspacegeometrysizeat)(x, y)

Get point at (x,y).

**Parameters:**
- *x*
  - a number
- *y*
  - a number

**Returns:**
- a Point

Source: [at.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Size/at.js)

<a name="tapspacegeometrysizeatnorm"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Size](#tapspacegeometrysize):[atNorm](#tapspacegeometrysizeatnorm)(rx, ry)

Get point at (rx, ry) where rx is relative to the width and
the ry is relative to the height.

**Parameters:**
- *rx*
  - a number. Value of 1 will return a point with x = width.
- *ry*
  - a number. Value of 1 will return a point with y = height.

**Returns:**
- a Point

Source: [atNorm.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Size/atNorm.js)

<a name="tapspacegeometrysizeattonorm"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Size](#tapspacegeometrysize):[atToNorm](#tapspacegeometrysizeattonorm)(x, y)

Get point at (x,y) and return its relative coordinates.
For example, relative coords of point (2, 1) in size (4, 4) is (0.5, 0.25)

**Parameters:**
- *x*
  - a number or a Point
- *y*
  - a number

**Returns:**
- a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }

Source: [atToNorm.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Size/atToNorm.js)

<a name="tapspacegeometrysizechangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Size](#tapspacegeometrysize):[changeBasis](#tapspacegeometrysizechangebasis)(newBasis)

Source: [Size/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Size/index.js)

<a name="tapspacegeometrytransform"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Transform](#tapspacegeometrytransform)(basis, a, b, x, y, z)

The Transform models rotations and uniform scalings on xy-plane and
translations in xyz-space.
The Transform also has a reference to its basis element
which allows us to represent the transform in other bases when needed.
The Transform is a compact and specialized variant of
a homogeneous (aka augmented) 4x4 transform matrix for 3D space.

**Parameters:**
- *basis*
  - a Component
- *a*
  - a number or a helm3
- *b*
  - a number
- *x*
  - a number
- *y*
  - a number
- *z*
  - a number

Object properties:
- basis, a, b, x, y, z

- [tapspace.geometry.Transform:changeBasis](#tapspacegeometrytransformchangebasis)
- [tapspace.geometry.Transform:fromFeatures](#tapspacegeometrytransformfromfeatures)
- [tapspace.geometry.Transform:getTranslation](#tapspacegeometrytransformgettranslation)
- [tapspace.geometry.Transform:inverse](#tapspacegeometrytransforminverse)


Source: [Transform/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Transform/index.js)

<a name="tapspacegeometrytransformchangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Transform](#tapspacegeometrytransform):[changeBasis](#tapspacegeometrytransformchangebasis)(newBasis)

Represent the transform on another plane.

**Returns:**
- a Transform

Source: [changeBasis.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Transform/changeBasis.js)

<a name="tapspacegeometrytransformfromfeatures"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Transform](#tapspacegeometrytransform):[fromFeatures](#tapspacegeometrytransformfromfeatures)(params)

Create transform in intuitive way with human-readable parameters.

**Parameters:**
- *params*
  - *basis*
    - HTMLElement, required.
  - *rotate*
    - number, radians. Optional, default 0.
  - *scale*
    - number, multiplier. Optional, default 1.
  - *translate*
    - a vec3, { x, y, z }. Optional, default { x: 0, y: 0, z: 0 }.

**Returns:**
- a Transform

Source: [fromFeatures.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Transform/fromFeatures.js)

<a name="tapspacegeometrytransformgettranslation"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Transform](#tapspacegeometrytransform):[getTranslation](#tapspacegeometrytransformgettranslation)()

Get the translation component of the transform without rotation
and scaling.

**Returns:**
- a Transform

Source: [getTranslation.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Transform/getTranslation.js)

<a name="tapspacegeometrytransforminverse"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Transform](#tapspacegeometrytransform):[inverse](#tapspacegeometrytransforminverse)()

Invert the transform.

**Returns:**
- a Transform

Source: [inverse.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Transform/inverse.js)

<a name="tapspacegeometryvector"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector)(basis, x, y, z)

A vector that can be transited between planes.
The vector has length and direction but no position.

**Parameters:**
- *basis*
- *x*
  - a number or a vec3
- *y*
  - a number
- *z*
  - Optional number. Default 0.

- [tapspace.geometry.Vector:add](#tapspacegeometryvectoradd)
- [tapspace.geometry.Vector:almostEqual](#tapspacegeometryvectoralmostequal)
- [tapspace.geometry.Vector:changeBasis](#tapspacegeometryvectorchangebasis)
- [tapspace.geometry.Vector:copy](#tapspacegeometryvectorcopy)
- [tapspace.geometry.Vector:cross](#tapspacegeometryvectorcross)
- [tapspace.geometry.Vector:difference](#tapspacegeometryvectordifference)
- [tapspace.geometry.Vector:dot](#tapspacegeometryvectordot)
- [tapspace.geometry.Vector:getDirection](#tapspacegeometryvectorgetdirection)
- [tapspace.geometry.Vector:getDistance](#tapspacegeometryvectorgetdistance)
- [tapspace.geometry.Vector:negate](#tapspacegeometryvectornegate)
- [tapspace.geometry.Vector:norm](#tapspacegeometryvectornorm)
- [tapspace.geometry.Vector:normalize](#tapspacegeometryvectornormalize)
- [tapspace.geometry.Vector:rotateBy](#tapspacegeometryvectorrotateby)
- [tapspace.geometry.Vector:scaleBy](#tapspacegeometryvectorscaleby)
- [tapspace.geometry.Vector:scaleTo](#tapspacegeometryvectorscaleto)
- [tapspace.geometry.Vector:subtract](#tapspacegeometryvectorsubtract)
- [tapspace.geometry.Vector:transformBy](#tapspacegeometryvectortransformby)


Source: [Vector/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/index.js)

<a name="tapspacegeometryvectoradd"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[add](#tapspacegeometryvectoradd)(vec)

Vector addition, this plus the given vector.

**Parameters:**
- *vec*
  - a Vector, or {x,y,z} in the same space.

**Returns:**
- a Vector

Source: [add.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/add.js)

<a name="tapspacegeometryvectoralmostequal"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[almostEqual](#tapspacegeometryvectoralmostequal)(vec[, tolerance])

Test if vectors are almost equal.

**Parameters:**
- *vec*
  - a Vector, or {x,y,z} in the same space.
- *tolerance*
  - optional number. Default to affineplane.epsilon

**Returns:**
- a boolean

Source: [almostEqual.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/almostEqual.js)

<a name="tapspacegeometryvectorchangebasis"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[changeBasis](#tapspacegeometryvectorchangebasis)(newBasis)

Represent the vector on another plane.
Note that vectors are only affected by
scale and angle differences between planes.

**Parameters:**
- *newBasis*
  - an AbstractPlane

**Returns:**
- a Vector

Source: [changeBasis.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/changeBasis.js)

<a name="tapspacegeometryvectorcopy"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[copy](#tapspacegeometryvectorcopy)()

Clone the vector.

**Returns:**
- a Vector, the clone.

Source: [copy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/copy.js)

<a name="tapspacegeometryvectorcross"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[cross](#tapspacegeometryvectorcross)(vec)

Get cross product with another vector.

**Parameters:**
- *vec*
  - a Vector, or {x,y,z} in the same space.

**Returns:**
- a Vector

Source: [cross.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/cross.js)

<a name="tapspacegeometryvectordifference"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[difference](#tapspacegeometryvectordifference)(vec)

Vector subtraction, this minus the given vector.

**Parameters:**
- *vec*
  - a Vector, or {x,y,z} in the same space.

**Returns:**
- a Vector

Aliases: [tapspace.geometry.Vector:subtract](#tapspacegeometryvectorsubtract)

Source: [difference.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/difference.js)

<a name="tapspacegeometryvectordot"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[dot](#tapspacegeometryvectordot)(vec)

Get dot product with another vector.

**Parameters:**
- *vec*
  - a Vector, or {x,y,z} in the same space.

**Returns:**
- a Vector

Source: [dot.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/dot.js)

<a name="tapspacegeometryvectorgetdirection"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[getDirection](#tapspacegeometryvectorgetdirection)()

Get vector direction on xy-plane.

**Returns:**
- a Direction

Source: [getDirection.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/getDirection.js)

<a name="tapspacegeometryvectorgetdistance"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[getDistance](#tapspacegeometryvectorgetdistance)()

Get vector norm as a Distance.

**Returns:**
- a Distance

Aliases: [tapspace.geometry.Vector:norm](#tapspacegeometryvectornorm)

Source: [getDistance.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/getDistance.js)

<a name="tapspacegeometryvectornegate"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[negate](#tapspacegeometryvectornegate)()

Get same vector but in opposite direction.
This is equivalent to rotating the vector by 180 deg.

**Returns:**
- a Vector

Source: [negate.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/negate.js)

<a name="tapspacegeometryvectornorm"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[norm](#tapspacegeometryvectornorm)

Alias of [tapspace.geometry.Vector:getDistance](#tapspacegeometryvectorgetdistance)

Source: [getDistance.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/getDistance.js)

<a name="tapspacegeometryvectornormalize"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[normalize](#tapspacegeometryvectornormalize)([magnitude])

Scale the vector uniformly so that its length
becomes the given optional magnitude, 1 by default.

**Parameters:**
- *magnitude*
  - optional number or a Distance. Default 1.

**Returns:**
- a Vector

Aliases: [tapspace.geometry.Vector:scaleTo](#tapspacegeometryvectorscaleto)

Source: [normalize.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/normalize.js)

<a name="tapspacegeometryvectorrotateby"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[rotateBy](#tapspacegeometryvectorrotateby)(roll[, pitch])

Rotate the vector. The vector magnitude stays the same.

**Parameters:**
- *roll*
  - a number, roll angle in radians. Right-hand rotation around z-axis.
- *pitch*
  - optional number, pitch angle in radians. Default 0. Right-hand rotation around x-axis.

**Returns:**
- a Vector

Source: [rotateBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/rotateBy.js)

<a name="tapspacegeometryvectorscaleby"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[scaleBy](#tapspacegeometryvectorscaleby)(multiplier)

Scale the vector uniformly with multiplier.

**Parameters:**
- *multiplier*
  - a number

**Returns:**
- a Vector

Source: [scaleBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/scaleBy.js)

<a name="tapspacegeometryvectorscaleto"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[scaleTo](#tapspacegeometryvectorscaleto)

Alias of [tapspace.geometry.Vector:normalize](#tapspacegeometryvectornormalize)

Source: [normalize.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/normalize.js)

<a name="tapspacegeometryvectorsubtract"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[subtract](#tapspacegeometryvectorsubtract)

Alias of [tapspace.geometry.Vector:difference](#tapspacegeometryvectordifference)

Source: [difference.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/difference.js)

<a name="tapspacegeometryvectortransformby"></a>
## [tapspace](#tapspace).[geometry](#tapspacegeometry).[Vector](#tapspacegeometryvector):[transformBy](#tapspacegeometryvectortransformby)(tr)

Transform the displacement vector by affine transformation.
This can rotate and scale the vector but cannot translate it
because only position vectors can be translated.

**Parameters:**
- *tr*
  - a Transform

**Returns:**
- a Vector

Source: [transformBy.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/geometry/Vector/transformBy.js)

<a name="tapspaceinteraction"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction)

Interactions define how gestures affect components.

Interactions do not share a common interface.
But, how about WheelInteraction base class for Wheel interactions?

- [tapspace.interaction.Drag](#tapspaceinteractiondrag)
- [tapspace.interaction.PinchView](#tapspaceinteractionpinchview)
- [tapspace.interaction.ResizeAlign](#tapspaceinteractionresizealign)
- [tapspace.interaction.Tap](#tapspaceinteractiontap)
- [tapspace.interaction.WheelRotate](#tapspaceinteractionwheelrotate)
- [tapspace.interaction.WheelZoom](#tapspaceinteractionwheelzoom)


Source: [interaction/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/index.js)

<a name="tapspaceinteractiondrag"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Drag](#tapspaceinteractiondrag)(source, target, options)

Drag interaction. Move the target element around.

**Parameters:**
- *source*
  - a Component. Get drag input form this component.
- *target*
  - a Component. Apply effect to this component.
  - To make the component draggable, use source as the target.
  - To build a handle, target a parent of the source.
- options, object with properties:
  - *minTravel*
    - optional distance. The minimum required distance for the drag to begin.
  - *maxTravel*
    - optional distance. The maximum allowed distance for the element to move during the gesture.

TODO maxDistance
TODO minDistance
TODO minDuration
TODO maxDuration

- [tapspace.interaction.Drag:bind](#tapspaceinteractiondragbind)
- [tapspace.interaction.Drag:setSource](#tapspaceinteractiondragsetsource)
- [tapspace.interaction.Drag:setTarget](#tapspaceinteractiondragsettarget)
- [tapspace.interaction.Drag:unbind](#tapspaceinteractiondragunbind)


Source: [Drag/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Drag/index.js)

<a name="tapspaceinteractiondragbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Drag](#tapspaceinteractiondrag):[bind](#tapspaceinteractiondragbind)()

Source: [Drag/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Drag/index.js)

<a name="tapspaceinteractiondragsetsource"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Drag](#tapspaceinteractiondrag):[setSource](#tapspaceinteractiondragsetsource)(comp)

Set input source component.
Rebinds if the drag was bound.

Source: [Drag/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Drag/index.js)

<a name="tapspaceinteractiondragsettarget"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Drag](#tapspaceinteractiondrag):[setTarget](#tapspaceinteractiondragsettarget)(comp)

Set output target component

Source: [Drag/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Drag/index.js)

<a name="tapspaceinteractiondragunbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Drag](#tapspaceinteractiondrag):[unbind](#tapspaceinteractiondragunbind)()

Source: [Drag/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Drag/index.js)

<a name="tapspaceinteractionpinchview"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[PinchView](#tapspaceinteractionpinchview)(viewport, options)

Pinch interaction for viewports.
Pan, zoom, and rotate viewport planes by using pointers.

**Parameters:**
- *viewport*
  - a Viewport. Get input form this component.
- options, optional object with properties:
  - *freedom*
    - optional object with props:
      - *type*
        - a string, 'TS'
      - *center*
        - a Point. The center point for the freedoms 'S', 'R', 'SR'.
      - *angle*
        - a Direction. The line angle for the freedom 'L'.

- [tapspace.interaction.PinchView:bind](#tapspaceinteractionpinchviewbind)
- [tapspace.interaction.PinchView:getFreedom](#tapspaceinteractionpinchviewgetfreedom)
- [tapspace.interaction.PinchView:unbind](#tapspaceinteractionpinchviewunbind)


Source: [PinchView/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/PinchView/index.js)

<a name="tapspaceinteractionpinchviewbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[PinchView](#tapspaceinteractionpinchview):[bind](#tapspaceinteractionpinchviewbind)()

Bind event listeners

Source: [PinchView/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/PinchView/index.js)

<a name="tapspaceinteractionpinchviewgetfreedom"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[PinchView](#tapspaceinteractionpinchview):[getFreedom](#tapspaceinteractionpinchviewgetfreedom)()

**Returns:**
- object, the freedom object

Source: [PinchView/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/PinchView/index.js)

<a name="tapspaceinteractionpinchviewunbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[PinchView](#tapspaceinteractionpinchview):[unbind](#tapspaceinteractionpinchviewunbind)()

Unbind listeners

Source: [PinchView/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/PinchView/index.js)

<a name="tapspaceinteractionresizealign"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[ResizeAlign](#tapspaceinteractionresizealign)(viewport, options)

Re-align viewport on resize.
Keeps the viewport center relatively at the same position.
Pan the viewport during the resize so that the center stays fixed to
the same space point.

**Parameters:**
- *viewport*
  - a Viewport. Observe resize events form this component.
- options, object with properties:
  - *relativeCenter*
    - optional { rx, ry }. The relative point on the viewport to keep fixed during the resize.

Emits via viewport:
- *resize*
  - with resize event object

- [tapspace.interaction.ResizeAlign:bind](#tapspaceinteractionresizealignbind)
- [tapspace.interaction.ResizeAlign:unbind](#tapspaceinteractionresizealignunbind)


Source: [ResizeAlign/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/ResizeAlign/index.js)

<a name="tapspaceinteractionresizealignbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[ResizeAlign](#tapspaceinteractionresizealign):[bind](#tapspaceinteractionresizealignbind)()

Bind event listeners

Source: [ResizeAlign/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/ResizeAlign/index.js)

<a name="tapspaceinteractionresizealignunbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[ResizeAlign](#tapspaceinteractionresizealign):[unbind](#tapspaceinteractionresizealignunbind)()

Unbind listeners

Source: [ResizeAlign/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/ResizeAlign/index.js)

<a name="tapspaceinteractiontap"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Tap](#tapspaceinteractiontap)(source, target, options)

Tap interaction.

**Parameters:**
- *source*
  - a Component. The tap input source.
- *target*
  - a Component. The target for the tap effect.
  - The target will emit 'tap' events.
- *options*
  - *effect*
    - string, one of 'shrink', 'shake', 'down'
  - *maxTravel*
    - optional number in viewport pixels. default 20.

Makes the target emit:
- *tapstart*
- *tapend*
  - when the tap gesture ends succesfully, before the tap event.
- *tapcancel*
  - when the tap gesture was cancelled or unsuccessful.
  - The gesture is unsuccessful if the gesture requirements were not met.
- *tap*
  - when the tap was successful.

- [tapspace.interaction.Tap:bind](#tapspaceinteractiontapbind)
- [tapspace.interaction.Tap:unbind](#tapspaceinteractiontapunbind)


Source: [Tap/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Tap/index.js)

<a name="tapspaceinteractiontapbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Tap](#tapspaceinteractiontap):[bind](#tapspaceinteractiontapbind)()

Bind gesture event listeners.

Source: [Tap/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Tap/index.js)

<a name="tapspaceinteractiontapunbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[Tap](#tapspaceinteractiontap):[unbind](#tapspaceinteractiontapunbind)()

Unbind capturer.

Source: [Tap/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/Tap/index.js)

<a name="tapspaceinteractionwheelrotate"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[WheelRotate](#tapspaceinteractionwheelrotate)(viewport, options)

Wheel rotate interaction for viewports.
Rotate the origin planes by mouse wheel left-right axis.

**Parameters:**
- *viewport*
  - a Viewport. Get input form this component.
- options, object with properties:
  - *center*
    - a Point. The center point for the rotation. TODO Defaults to the cursor position.

- [tapspace.interaction.WheelRotate:bind](#tapspaceinteractionwheelrotatebind)
- [tapspace.interaction.WheelRotate:unbind](#tapspaceinteractionwheelrotateunbind)


Source: [WheelRotate/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/WheelRotate/index.js)

<a name="tapspaceinteractionwheelrotatebind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[WheelRotate](#tapspaceinteractionwheelrotate):[bind](#tapspaceinteractionwheelrotatebind)()

Bind event listeners

Source: [WheelRotate/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/WheelRotate/index.js)

<a name="tapspaceinteractionwheelrotateunbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[WheelRotate](#tapspaceinteractionwheelrotate):[unbind](#tapspaceinteractionwheelrotateunbind)()

Unbind listeners

Source: [WheelRotate/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/WheelRotate/index.js)

<a name="tapspaceinteractionwheelzoom"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[WheelZoom](#tapspaceinteractionwheelzoom)(viewport, options)

Wheel zoom interaction for viewports.
Scale the origin planes by mouse wheel.

**Parameters:**
- *viewport*
  - a Viewport. Get input form this component.
- options, object with properties:
  - *center*
    - a Point. The center point for the scaling. Defaults to the cursor position.

- [tapspace.interaction.WheelZoom:bind](#tapspaceinteractionwheelzoombind)
- [tapspace.interaction.WheelZoom:unbind](#tapspaceinteractionwheelzoomunbind)


Source: [WheelZoom/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/WheelZoom/index.js)

<a name="tapspaceinteractionwheelzoombind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[WheelZoom](#tapspaceinteractionwheelzoom):[bind](#tapspaceinteractionwheelzoombind)()

Bind event listeners

Source: [WheelZoom/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/WheelZoom/index.js)

<a name="tapspaceinteractionwheelzoomunbind"></a>
## [tapspace](#tapspace).[interaction](#tapspaceinteraction).[WheelZoom](#tapspaceinteractionwheelzoom):[unbind](#tapspaceinteractionwheelzoomunbind)()

Unbind listeners

Source: [WheelZoom/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/interaction/WheelZoom/index.js)

<a name="tapspaceloaders"></a>
## [tapspace](#tapspace).[loaders](#tapspaceloaders)

Helpers to preload content such as images to determine their dimensions
before inserting to space. Provides also utilities for recursive
loading, construction, and destruction.

- [tapspace.loaders.loadImages](#tapspaceloadersloadimages)


Source: [loaders/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/loaders/index.js)

<a name="tapspaceloadersloadimages"></a>
## [tapspace](#tapspace).[loaders](#tapspaceloaders).[loadImages](#tapspaceloadersloadimages)(imgSrcs, callback)

Preload one or more images and call back when finished.

**Usage:**
```
tapspace.loaders.loadImages('hello.png', function (err, img) {
  if (err) { throw err }
  // img is now loaded and has correct dimensions instead of 0x0. 
})
```

See [loadimages](https://www.npmjs.com/package/loadimages) package
for details.

Source: [loadImages.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/loaders/loadImages.js)

<a name="tapspaceversion"></a>
## [tapspace](#tapspace).[version](#tapspaceversion)

The semantic version string, for example '1.2.3'.
It is identical to the version string in the [tapspace](#tapspace) package.json.

Source: [lib/index.js](https://github.com/taataa/tapspace/blob/2.0-dev/lib/index.js)

<p style="text-align: right">
<a href="#top">&uarr; Back To Top</a>
</p>

