# Tapspace progressive architectural notes

These notes try to capture the process that lead to design decisions in
the current Tapspace library. Whenever new features are planned, each aspect
laid out in these notes should be considered.

## Design principles

API design problems:
- explicity vs simplicity
- relative vs absolute
- computation efficiency vs expressiveness
- one vs multiple ways to do things
- state vs parameters

Separation of concerns
- transformation construction vs moving the element
- positioning vs interaction

KISS - Keep it simple stupid
DOT - Do one thing
- Avoid complicated methods and options.
- If the method feels tedious to document, then it probably
  does or allows too much.
- Bad example: addChild(comp, position) where position can be many things.

Premature optimization is the root of all evil
YAGNI - You ain't gonna need it

Minimal state versus minimal options:
- minimal state variables requires verbose API with lots of options.
- for example: relative anchor. Solve via object state or via an options flag?
- Minimal state has great benefit: less unexpected behavior because of smaller
  state space. This comes with a price: options need to be given.

## Construction

The init code style is important. It is the first thing the user learns.

One way is to allow affine elements to exist without a layer, viewport,
or other container as their ancestor.
This enables affinedom to be used for animations and transform controlling.

    aelem = affine(elem)
    aview = affine.viewport(elem)
    alayer = affine.layer(elem)

Alternatively follow the approach of Vis.js and Google Maps JS API:
Require user to give the container element and let the library handle
the rest. Benefit: user does not need to understand how the space elements work
and how they must be arranged in the DOM. Also, if the library updates its
DOM structure, for example to overcome some browser constraints, the user
does not need to migrate the host app DOM.

    aview = new tapspace.View(querystring or element)
    alayer = new tapspace.Layer()
    agroup = new tapspace.Group()

Conceptual difficulty: developer needs to add content like layers/planes
to viewport. Viewport does not sound to be a container into which you
can add things, except some static controls like buttons. Also, in Tapspace v1
devs did not and could not add space content via a viewport. Therefore,
regardless that the viewport is the true container for everything in DOM,
we need explicit conceptual separation between the viewport and space.

    space = tapspace.space(querystring or element)
    view = space.viewport()
    plane = space.plane()

## Affine Element

To avoid duplicating the DOM structure, we must somehow
be able to find affine properties for DOM elements.
We do this by assigning DOM elements with affine property.

HTMLElement.affine
  AffineElement
    el
      HTMLElement (cyclic reference)
    proj (alias tr)
      { a, b, x, y }
    type
      element, viewport, layer

Alternatively we could use dataset and an id.
  Store all objects in a global map from affineid --> AffineElement
  el.dataset.affineid = Math.random().toFixed(16).substring(2)

Why we use tr to store transformation when CSS transform has same info?
  Assumption: Too much overhead from parsing the css values
    possibly thousands of times per second.

Instead of tr we could have { s, r, x, y } where
  s is scale, multiplier
  r is radians
Also we could have all the matrix components: { a, b, c, d, x, y }
We note that { s, r } or { a, b, c, d } define the vector space
of the affine plane.

Alternatively, explicit and verbose placement parameters:
  gravity, anchor, point on the element
  position, origin, point on the parent
  scale, s
  rotation, r
  depth, z
With view, these are converted into a CSS transform matrix.

Consider affine frames instead of affine elements.
AffineFrame, AffineContainer, AffineSection, AffineSpace, or AffineBlock


## Applying transforms in DOM

Tapspace uses CSS Transform to move elements. The CSS transforms allow smooth scale and rotation. In early versions the lib used element.offsetLeft and .offsetTop. Rotations and scalings were difficult.

What happens when we update CSS Transform via JS?
First the code interacts with CSS Object Model (CSSOM).
A change in a CSS property might trigger browser to reflow or repaint content.
The exact stages the browser needs to execute depends on the browser engine and the CSS property.
A reference for which stages CSS properties trigger can be found at https://csstriggers.com/
According to the CSStriggers, changing transform does not trigger geometry changes or painting and is therefore very efficiently carried by the compositor thread. However, Webkit and Edge browsers might reflow and repaint. Blink and Gecko browsers run only the compositor. The Google Chrome is a Blink browser (2022). Safari is still a Webkit browser (2022). Firefox uses the Gecko engine.

When to update CSS Transform?
  Approach 1: in the methods that modify projection.
    Pro: very simple, code within same function
    Pro: usage without viewport might be possible
    Con: every proj change will update CSS.
    Con: the CSS transform might need to depend on viewport settings, e.g. for 3D.
  Approach 2: by the viewport.
    Pro: viewport is in control how to project the elements.
    Pro: viewport can use requestAnimationFrame to time the render.
    Con: The modified elements must somehow inform the viewport that they need CSS update.

Approach 1 is tempting in simplicity. Approach 2 is more complex but more flexible.
If we want to support full 3D in future, the Approach 2 is probably better.

A reference on CSS 3D transformations on nested elements:
https://davidwalsh.name/3d-transforms

We might be able to use CSS 3D in Tapspace. The transform-style:preserve-3d property enables nested 3D elements. A possible risk is that the projection algorithm needs to be rewritten in 3D. Correct projection of input coordinates might be difficult.

Viewport could update mode of planes between 2d and 3d. There also could be a mixture of 3D and 2D elements in the space.

Should we use requestAnimationFrame (RAF)? The MDN example on RAF displays it being applied to CSS transform property. If the viewport drives CSS transforms, RAF usage is possible. Its use would group the CSS transform updates before browser render stage. The fear is that if done like Approach 1, each transform will cause CSS update and trigger browser render, thus slowing down the execution. However, according to [1, p.51], browsers optimize the process by queueing the changes an flushing them from time to time. Access to certain layout properties might unintentionally cause the flush. These properties include clientTop and offsetTop and scrollTop and similar, which we might need to call during interaction.

Modify DOM off the document. Either temporarily display:none or use of document fragment.

Absolute positioning takes the element out of the layout flow [1, p.57]

Custom DOM events versus using Emitter. The former is slower [2].
Each affine element could cache the the viewport for quick access.

Approach 1 is probably enough. CSS can handle nested 3D with perspective. Therefore we can apply things directly in the AbstractPlane. Browsers already group css changes until the flush is needed [1].

[1] Zakas. High Performance JavaScript. Book.
[2] Difference between ways of event handling https://stackoverflow.com/q/6570523/638546

## Affine Layers

Layer position is controlled by its parent.
Layer parent is usually a viewport.
Host app must give layer positions relative terms because
the positions depend on the viewport position.

Naming: Plane vs Layer vs Space. Space is too 3D. Layer is stacky. Plane can be aeroplane. Plane is 2D. Plane has (0,0) origin. There can be many planes. Is every coordinate system a plane? Every element has a plane? Root layer? Plane implies that everything in the plane are on same 2D surface.

Layer positions are relative to the viewport. Transforming the viewport
actually means modification of the layer positions.

affine.viewport(elem, {
  perspective: true,
})
affine.layer(elem, {
  z: 3
})

space = tapspace.space()
view = space.viewport().zoomable().perspective()
plane = space.plane({ x: 2, y: 3, z: 3})

How to project points between planes. Perspective vs orthogonal projection.
We might do well with only orthogonal projection when between planes.
Projection to viewport might produce perspective projection.
Maybe planes could be connected so we can compute orthogonal projections
regardless of perspective?

## Element positioning

### Get positions

aelem.getPosition() .getLocalTransform() .getFormation()
The position of element in the parent coordinates system.

aelem.getTransform( relElem ) where relElem is optional, defaults to parent
aelem.getTransformTo( relElem )
aelem.getPositionOn( relElem )
aelem.getTransformOn( relElem )
aelem.getFormationOn( relElem )

aelem.at(x, y)
aelem.atNorm()
aelem.atTopLeft() .atNW()


### Convert positions

Explicit or implicit basis?
  explicit { basis { transform, element }, geom { x, y } }
  versus { x, y }

Convert transformation from coordinate system to another
affine.transform.rebase(tr, from, to)
alias .proj .project .mapTo() .switchBase .changeBasis

Convert point from coordinate system to another
affine.point.changeBasis(point, from, to)

If implicit basis, programmer needs to do this for each point separately.
Very tedious. On the other hand { basis { transform, element } } too complex.
{ element, a, b, x, y } is probably the simplest for the programmer.
Alternatively alias for element: el, elem, base, basel, basis

In Oct 2022, we saw that trouping the basis element (vec.basis) and
the geometry properties (vec.x, vec.y) in the same namespace leads to
hard-to-detect bugs because raw geometry objects e.g {x,y,z} and the geometry
class instances e.g. Vector { basis, x, y, z } could be used identically in
the same context. This lead to extra checks if the object was raw or based.
Also, all operations on based objects are implemented in affineplane that
understands only the raw objects, thus it was often necessary to first
compute the raw object and then copy the properties to a new based instance
to maintain immutability. Sometimes only the raw object was needed, thus
the constructed based instance had to be deconstructed immediately after its
construction. For these reasons, it was better to follow Tapspace v1 approach
where the "basis invariant" objects contained the raw object as an object.
In Tapspace v2 this means for example Vector { basis, vec } where vec is
a affineplane.vec3 {x,y,z}. This way geometric operations can be done on
raw objects and the resulting object can be used directly without copying
of the properties.


### Setting positions

aelem.transformTo()
aelem.transformBy()


### Estimate moves

affine.transform.estimate({ sourcePoints, targetPoints })
All points must be in same system
sourcePoints.map(affine.point.changeBasis())

component.snap({ anchors, targets })

### Movement coordinate system

Pointer events provide the pointer position in various coordinate systems.

We can use pageX/Y, but the coords are relative to the page and
not relative to our viewport.

We can use clientX/Y, but the coords are relative to the browser viewport and
will change if the user scrolls the page.
Also, they are not relative to our viewport.

We can use screenX/Y, but the coords are relative to the monitor and will
change if the user moves windows.
Also, they are not relative to our viewport.

We cannot use offsetX/Y because they are relative to the target element and
the target can be outside of the space, for example a button inside a form
that floats in the space.

There are ways to compute pageX/Y for elements by using getBoundingClientRect()
See https://stackoverflow.com/q/442404/638546 for details.

### Limiting and linking moves

aelem.on('transformed', fn)

interaction routing
move cause (source) --> filters / middleware / redirection --> move effect

Chaining: way to connect elements not in ancestor-descendant relationship:
aelem.follow(source) => fn unfollow
  Under the hood, listens for transform events
aelem.lock(otherElem) => fn unlock
  Symmetric locking. Transforming the one transforms other.

Limiter options
  hitbox: 'in' or 'all': keep all corners inside limiting area
  hitbox: 'out' or 'one': at least one corner must stay inside limiting area
  hitbox: 'mid' the middle point must stay inside limiting area
  hitbox: <point>, <array of points>


## Interaction

Aspects: freedoms, capabilities, movement limits, modes, restriction

movable, slidable, translatable, pannable

view.setOptions({
  interaction: {
    panning: true,
    scaling: true,
    rotation: true
  }
})

view.makeDraggable()
view.interaction.enable() .enableInteraction()

view.navigation .io .interaction .input

const drag = new tapspace.interaction.Drag(params)

### Direct manipulation

The interaction features enable [direct manipulation](https://www.nngroup.com/articles/direct-manipulation/) in Tapspace apps. They make the elements react in a natural, paper-like way.

Touchable's simplistic interaction design is based on usability research and ensures good design principles:
- **No double tap** or triple+ tap gestures. They are hard for users to discover. Instead, updated the interface after each single tap in a way that tells user that another tap is needed.
- **No hold.** It is hard for users to discover. Use single tap or multiple subsequent single taps with progressive visual feedback instead. [1]
- **No info about number of fingers.** Fingers easily touch the screen by accident and cause unexpected behavior if UI behavior depends on number of fingers. [1]
- **Respect each finger equally.** If only two fingers are respected in transformations such as scaling then movement of additional fingers do not affect at all which is not the way how objects behave in the physical world familiar to users. [2]

Additional design decisions:
- **No hover** even for mouse. We treat mouse as a single finger. Simpler for developers, less bugs for users to discover.

[1] [Microsoft touch design guidelines](https://msdn.microsoft.com/en-us/windows/uwp/input-and-devices/guidelines-for-user-interaction)<br />
[2] Palen, 2016, [Advanced algorithms for manipulating 2D objects on touch screens](http://dspace.cc.tut.fi/dpub/handle/123456789/24173).

### Semantic zoom

Possible ability names:
- tt(space).zoomable()
- tt(el).approachable()
- tt(el).semanticZoom()
- sel.reactive() .sensible() .triggerable() .aware() .morphable()
- .convertible() .openable() .detailable()
- .enableProximitySensor
- .emitOnProximity .emitProximity .emitDistance() .emitApparentSize
- .addProximityListener
- .excitable .sensitive .senseProximity

aelem.getAreaOn( relElem ) .getCover(relElem) .depth()
aelem.getArea( relElem? )
aelem.on('transformed')
aelem.on('gesture-end')

Hysteresis protection: an event processor that maps states to custom events
affine.semanticZoom(el, ) .semanticScale(...) .mapEvents() => fn off
{
  tracker: fn (el) => numeric value (eg. el.getArea),
  valueBands: {
    0.5 => 'small'
    0.8 => 'large'
    default => 'tiny'
  }
  valueBands: [
    { min, max, eventName }
  ]
}

Programming approach:
on viewport gesture-end, find all elements for which z or cover is
within range. Elements do not emit transformed event on viewport changed.
except if controlled by perspective z

initial creation vs depth updates

The feature depends on the distance between viewport camera and the element.
How this works in orthogonal projection?

The element itself might not change due to camera proximity. Instead, the proximity might trigger or undo behavior such as rendering new elements or removal of old elements.



## Viewport

### Perspective vs orthogonal viewport

Do we need to switch between perspective and orthogonal viewport projection modes? Should we project always orthogonally but simulate the depth via extra scaling derived from dz? Or should we implement everything in 3D and use that as the primary way to zoom, even when all the content resides on the same plane?

We cannot implement everything twice for the two projection modes. Therefore APIs and positions must always be in 3D. What we can do, however, is to modify the rendered projection according to the viewport settings. That has the drawback of the need to pass the viewport mode to every transform render, forcing each affine element to either find or carry a reference to the viewport. We would like to avoid the coupling if possible.

The perspective projection is enabled by setting CSS perspective property.
Maybe we can revent back to orthogonal projection just by removing the property from the viewport element.
Better, we can set it to 'perspective:none'.

2022: It seems that 2D projection is about 10x more faster than 3D projection. This limits the number of elements.

Eventually we need to orient elements non-orthogonally. For example to visualize a network in 3D, we must be able to render edges that begin and end at different z-depth.

## Layout managers

Layout managers are DOM elements that control the positions of their immediate children. In contrast, normal affine DOM elements do not manipulate their children.

Examples of layout managers:
- viewport: transformations on the view are reflected on the children.
- perspective viewport: children can be assigned z coordinate.
- fractal: similar to viewport, with recursive modules

We first thought fractal as a layout manager but later decided it to be a loader.

## Loaders

### Image loaders

Image dimensions cannot always be know beforehand. Therefore it is good to load images before adding them to the space. Is it necessary for Tapspace to implement these? Does this responsibility suit the dev better?

### Fractal

Fractal is a framework to drive a sequence of origin planes in order
to implement an infinite progression.

Is Fractal a View? Or is it a Component?
- Can we have multiple fractals on space?
  - Multiple networks on frameless space to interact.
- Can fractals be nested?
- Fractal does not span a coordinate system, so it is not a Component.
- Fractal does not have a unique element in DOM, so it is not a Component.
- Fractal creates and positions other elements, especially origin planes.
  Therefore it shares features with the viewport.
- Fractal takes in a plane template that is kind of a piece of the space.

One approach is to form a new category of classes called "layouts" and
classify the Fractal as a layout.
The term "layout manager" might be appropriate.
In order to show the layouts form a separate category, can we come up with
alternative layouts?
- Grid layout is implemented as a geometry that components can snap to.
  Therefore it is not a layout manager but only provides guides for components.
  However, Grid could be modeled as a layout where it could drive content.
  For example, think of a dynamic grid that can move lots of attached content
  just by modifying the grid properties, phase, and spacing.
  On the other hand Grid spans a coordinate system and it could be a component.
- Tunnel layout helps to position content into a tunnel shape.
  Therefore it is mostly like the grid, and can work as both a geometry
  and component.

Thus, Fractal is not same thing as these basic layouts.
Fractal is quite special recursive utility. An algorithm. A layout algorithm.
Can we come up with other possible layout algorithms?
- force-driven graph. Cyclic graphs would require cyclic Fractal.
  Graph could also be a component and help in creation of edges and nodes.
- L-system. A recursive tree. Kind of same as the Fractal.
- depth-firsth search. Recursive search algorithm that could be applied
  to Fractal but it is not the same thing.

Fractal is a navigational structure with recursive progression.
It facilitates content loading and hiding.
- A quad tree stack could be a special case of a Fractal.
- A network of rooms in some dungeon game. This would benefit from a tool
  that loads and displays the rooms as the player navigates the space.

Fractal is a loader! It is a tool that helps developer to load and forget.
- It is quite different form the image loader. However, the image loader too
  deals with asynchronous interaction.

## Geometries for layout

### Tunnel

Either a true pipe-like arrangement of content in 3D or a flat 2D circle or fan where content gets smaller closer the center point.

### Spiral

Archimedian spiral might be good for even, equally distributed spiral layout.
See for example https://codegolf.stackexchange.com/q/247259/107547


## Accessibility

Ability to navigate space and select content elements via keyboard.

Point and click navigation.
