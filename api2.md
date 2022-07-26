Exhaustive sketch for tapspace v2 api.
List all aliases and possible methods here.

# Design principles

API design problems
  explicity vs simplicity
  relative vs absolute
  computation efficiency vs expressiveness

Separation of concerns
  transformation construction vs moving the element
  positioning vs interaction

# Construction

aelem = affine(elem)
aview = affine.viewport(elem)
alayer = affine.layer(elem)

Allow affine elements without layer or viewport as an ancestor.
This enables affinedom to be used for animations and transform controlling.

Alternatively follow the approach of Vis.js and Google Maps JS API:
Require user to give the container element and let the library handle
the rest. Benefit: user does not need to understand how the space elements work
and how they must be arranged in the DOM. Also, if the library updates its
DOM structure, for example to overcome some browser constraints, the user
does not need to migrate the host app DOM.

aview = new tapspace.View(querystring or element)
alayer = new tapspace.Layer()
agroup = new tapspace.Group()



# Affine Element

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

# Layout managers

Layout managers are DOM elements that control the positions of their immediate children. In contrast, normal affine DOM elements do not manipulate their children.

Examples of layout managers:
- viewport: transformations on the view are reflected on the children.
- perspective viewport: children can be assigned z coordinate.
- fractal: similar to viewport, with recursive modules

# Applying transforms in DOM

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

# Affine Layers

Layer position is controlled by its parent.
Layer parent is usually a viewport.
Host app must give layer positions relative terms because
the positions depend on the viewport position.


# Get positions

aelem.getPosition() .getLocalTransform() .getFormation()
The position of element in the parent coordinates system.

aelem.getTransform( relElem ) where relElem is optional, defaults to parent
aelem.getPositionOn( relElem )
aelem.getTransformOn( relElem )
aelem.getFormationOn( relElem )

aelem.at(x, y)
aelem.atNorm()
aelem.atTopLeft() .atNW()


# Convert positions

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


# Setting positions

aelem.transformTo()
aelem.transformBy()


# Estimate moves

affine.transform.estimate({ sourcePoints, targetPoints })
All points must be in same system
sourcePoints.map(affine.point.changeBasis())

component.snap({ anchors, targets })

# Movement coordinate system

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

# Limiting and linking moves

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

# Semantic zoom

tt(space).zoomable()
tt(el).approachable()
tt(el).semanticZoom()

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


# Interaction

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

## Direct manipulation

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

# Layers and z

Naming: Plane vs Layer vs Space. Space is too 3D. Layer is stacky. Plane can be aeroplane. Plane is 2D. Plane has (0,0) origin. There can be many planes. Is every coordinate system a plane? Every element has a plane? Root layer? Plane implies that everything in the plane are on same 2D surface.

Layer positions are relative to the viewport. Transforming the viewport
actually means modification of the layer positions.

## Layer API
affine.viewport(elem, {
  perspective: true,
})
affine.layer(elem, {
  z: 3
})

How to project points between planes. Perspective vs orthogonal projection.
We might do well with only orthogonal projection when between planes.
Projection to viewport might produce perspective projection.
Maybe planes could be connected so we can compute orthogonal projections
regardless of perspective?


# Tunnel



# Fractal


# Spiral

Archimedian spiral might be good for even, equally distributed spiral layout.
See for example https://codegolf.stackexchange.com/q/247259/107547
