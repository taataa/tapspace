# Taaspace API



## taaspace.Emitter(obj)

Upgrades `obj` to an Emitter. See API details at [component-emitter](https://www.npmjs.com/package/component-emitter)

#### taaspace.Emitter#emit(eventName, arg1, arg2, ...)

#### taaspace.Emitter#on(eventName, eventHandler)

#### taaspace.Emitter#off(eventName, eventHandler)



## taaspace.HTMLSpaceView(space, htmlContainer)

Is an Emitter, SpaceNode, SpacePlane, Transformer, and SpaceRectangle.

Listens events: added, removed, transformed, contentAdded, contentRemoved, contentTransformed

#### taaspace.HTMLSpaceView#getElementBySpaceNode(spaceNode)

Return the HTMLElement that represents the spaceNode in this view.

Return null if no HTMLElement found.

#### taaspace.HTMLSpaceView#getRootElement()

Return the container HTMLElement of this view.

#### taaspace.HTMLSpaceView#getSpaceNodeByElementId(id)

Return the SpaceNode that is represented by HTMLElement having the given id attribute.

Return null if SpaceNode not found.



## taaspace.Space()

Is an Emitter, SpaceNode, and SpacePlane.

Cannot have a parent SpaceNode.



## taaspace.SpaceHTML(parent, html)

Is an Emitter, SpaceNode, SpacePlane, Transformer, and SpaceRectangle.

#### taaspace.SpaceHTML#getHTML()

Return string.



## taaspace.SpaceNode(emitter)

Upgrades `emitter` to a SpaceNode.

#### taaspace.SpaceNode#getParent()

Return a SpaceNode.

Return null if no parent.

#### taaspace.SpaceNode#getRootParent()

Return a SpaceNode.

#### taaspace.SpaceNode#getChildren()

Return an array of SpaceNodes.

#### taaspace.SpaceNode#getDescendants()

Return an array of SpaceNodes.

#### taaspace.SpaceNode#hasChild(spaceNode)

Return true if spaceNode is a child of this.

#### taaspace.SpaceNode#setParent(newParent)

Move this onto a parent SpaceNode. Will be removed from the old parent if there was one.

#### taaspace.SpaceNode#remove()

Detach from the current parent.



## taaspace.SpacePlane(spaceNode)

Upgrades `spaceNode` to a SpacePlane.

#### taaspace.SpacePlane#at(xy)

Return a SpacePoint at xy in the coordinate system of this.

#### taaspace.SpacePlane#getTransform()

Return transform from this to parent.

#### taaspace.SpacePlane#getGlobalTransform()

Return transform from this to root parent.

#### taaspace.SpacePlane#resetTransform()

Set transform to identity. Now, the coordinate system matches the system of the parent SpacePlane.



## taaspace.SpacePoint(xy, reference)

Properties: xy

Immutable.

#### taaspace.SpacePoint#equals(point)

#### taaspace.SpacePoint#offset(dx, dy)

#### taaspace.SpacePoint#polarOffset(distance, radians)

#### taaspace.SpacePoint#to(targetPlane)

Return a new SpacePoint on the coordinate system of `targetPlane`.

#### taaspace.SpacePoint#toSpace()

Return a new SpacePoint on the space coordinate system.

#### taaspace.SpacePoint#transform(tr)

Return a new SpacePoint by transforming this by the given Transform.



## taaspace.SpaceRectangle(transformer)

Upgrade a Transformer to a SpaceRectangle.

Emit: `resized`

#### taaspace.SpaceRectangle#atNorm(xy)

#### taaspace.SpaceRectangle#atMid()

#### taaspace.SpaceRectangle#atMidN()

#### taaspace.SpaceRectangle#atMidW()

#### taaspace.SpaceRectangle#atMidE()

#### taaspace.SpaceRectangle#atMidS()

#### taaspace.SpaceRectangle#atNW()

#### taaspace.SpaceRectangle#atNE()

#### taaspace.SpaceRectangle#atSW()

#### taaspace.SpaceRectangle#atSE()

#### taaspace.SpaceRectangle#getSize()

Return [width, height] as array.

#### taaspace.SpaceRectangle#resize(dimensions)

Update dimensions [width, height]. Emit `resized`.



## taaspace.SpaceTaa(parent, taa)

Is an Emitter, SpaceNode, SpacePlane, Transformer, SpaceRectangle.

Properties: taa



## taaspace.Taa(imageSrc, onLoaded)

Is an Emitter.

Properties: image

Emit: `loaded` (err, taa)



## taaspace.Transform

For API, see [nudged.Transform](https://github.com/axelpale/nudged#nudgedtransforms-r-tx-ty)



## taaspace.Transformer(plane)

Upgrade a given SpacePlane to a Transformer.

Listens events: `removed`

#### Transformer#setTransform(t)

#### taaspace.Transformer#setGlobalTransform(t)

#### translate(domain, range)

#### #scale(pivot, multiplierOrDomain, range)

#### #rotate(pivot, radiansOrDomain, range)

#### translateScale(domain, range)

#### translateRotate(domain, range)

#### scaleRotate(domain, range)

#### translateScaleRotate(domain, range)



## taaspace.version

Semantic version string.
