Exhaustive sketch for tapspace v2 api.
List all aliases and possible methods here.

# Design principles

API design problems
  explicity vs simplicity
  relative vs absolute
  computation efficiency vs expressiveness

Separation of concerns
  transformation construction vs moving the element


# Construction

aelem = affine(elem)
aview = affine.viewport(elem)
alayer = affine.layer(elem)


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

capabilities, limits, modes

movable, slidable


# Layers and z

affine.viewport(elem, {
  perspective: true,
})

affine.layer(elem, {
  z: 3
})

How to project points between layers. Perspective vs orthogonal projection.
We might do well with only orthogonal projection when between layers.
Projection to viewport will produce perspective projection.


# Tunnel



# Fractal
