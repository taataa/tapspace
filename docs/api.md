# Taaspace API

![taaspace module dependency graph](taaspace_api_3.png?raw=true)

Image: The module dependency graph represents the relationships between Taaspace modules. Diamond denotes composition: SpaceTaa has a Taa. Arrow head denotes inheritance: AbstractRectangle is a SpaceTransformer, SpaceTransformer is a AbstractPlane et cetera. Arrow head with dotted line denotes some weak dependency between AbstractPlane and SpacePoint :)

## taaspace.Emitter(obj)

Upgrades `obj` to an Emitter. See API details at [component-emitter](https://www.npmjs.com/package/component-emitter)

#### #emit(eventName, arg1, arg2, ...)

#### #on(eventName, eventHandler)

#### #off(eventName, eventHandler)



## taaspace.SpaceViewHTML(space, htmlContainer)

Is an Emitter, AbstractNode, AbstractPlane, SpaceTransformer, and AbstractRectangle.

Listens events: added, removed, transformed, resized, contentAdded, contentRemoved

#### #getElementByAbstractNode(abstractNode)

Return the HTMLElement that represents the abstractNode in this view.

Return null if no HTMLElement found.

#### #getRootElement()

Return the container HTMLElement of this view.

#### #getAbstractNodeByElementId(id)

Return the AbstractNode that is represented by HTMLElement having the given id attribute.

Return null if AbstractNode not found.



## taaspace.Space()

Is an Emitter, AbstractNode, and AbstractPlane.

Cannot have a parent AbstractNode.



## taaspace.SpaceHTML(parent, html)

Is an Emitter, AbstractNode, AbstractPlane, SpaceTransformer, and AbstractRectangle.

#### #getHTML()

Return string.



## taaspace.AbstractNode(emitter)

Upgrades `emitter` to a AbstractNode.

#### #getParent()

Return a AbstractNode.

Return null if no parent.

#### #getRootParent()

Return a AbstractNode.

#### #getChildren()

Return an array of AbstractNodes.

#### #getDescendants()

Return an array of AbstractNodes.

#### #hasChild(abstractNode)

Return true if abstractNode is a child of this.

#### #setParent(newParent)

Move this onto a parent AbstractNode. Will be removed from the old parent if there was one.

#### #remove()

Detach from the current parent.



## taaspace.AbstractPlane(abstractNode)

Upgrades `abstractNode` to a AbstractPlane.

#### taaspace.AbstractPlane#at(xy)

Return a SpacePoint at xy in the coordinate system of this.

#### taaspace.AbstractPlane#getTransform()

Return transform from this to parent.

#### taaspace.AbstractPlane#getGlobalTransform()

Return transform from this to root parent.

#### taaspace.AbstractPlane#resetTransform()

Set transform to identity. Now, the coordinate system matches the system of the parent AbstractPlane.



## taaspace.SpacePoint(xy, reference)

Properties: xy

Immutable.

#### #equals(point)

#### #offset(dx, dy)

#### #polarOffset(distance, radians)

#### #to(targetPlane)

Return a new SpacePoint on the coordinate system of `targetPlane`.

#### #toSpace()

Return a new SpacePoint on the space coordinate system.

#### #transform(tr)

Return a new SpacePoint by transforming this by the given Transform.



## taaspace.AbstractRectangle(transformer)

Upgrade a SpaceTransformer to a AbstractRectangle.

Emit: `resized`

#### #atNorm(xy)

#### #atMid()

#### #atMidN()

#### #atMidW()

#### #atMidE()

#### #atMidS()

#### #atNW()

#### #atNE()

#### #atSW()

#### #atSE()

#### #getSize()

Return [width, height] as array.

#### #resize(dimensions)

Update dimensions [width, height]. Emit `resized`.



## taaspace.SpaceTaa(parent, taa)

Is an Emitter, AbstractNode, AbstractPlane, SpaceTransformer, AbstractRectangle.

Properties: taa



## taaspace.Taa(imageSrc, onLoaded)

Is an Emitter.

Properties: image

Emit: `loaded` (err, taa)



## taaspace.Transform

For API, see [nudged.Transform](https://github.com/axelpale/nudged#nudgedtransforms-r-tx-ty)



## taaspace.SpaceTransformer(plane)

Upgrade a given AbstractPlane to a SpaceTransformer.

Listens events: `removed`

#### #setTransform(t)

#### #setGlobalTransform(t)

#### #translate(domain, range)

#### #scale(pivot, multiplierOrDomain, range)

#### #rotate(pivot, radiansOrDomain, range)

#### #translateScale(domain, range)

#### #translateRotate(domain, range)

#### #scaleRotate(domain, range)

#### #translateScaleRotate(domain, range)



## taaspace.version

Semantic version string.
