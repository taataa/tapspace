# Taaspace API

Contents:
- [Module](#module)
- [Items](#items)
- [Abstract Items](#abstract-items)
- [Tools](#tools)

![taaspace module dependency graph](taaspace_api_3.png?raw=true)

Image: The module dependency graph represents the relationships between Taaspace modules. Diamond denotes composition: AbstractNode has other AbstractNodes. Arrow head denotes inheritance: AbstractRectangle is an AbstractPlane, AbstractPlane is an AbstractNode et cetera.

## Module

### taaspace

Usage:

    var taaspace = require('taaspace')

### taaspace.version

A semantic version string identical to the version in `package.json`.

## Items

### taaspace.Space

### taaspace.SpaceGroup

### taaspace.SpaceHTML

### taaspace.SpaceImage

### taaspace.SpacePixel

### taaspace.SpaceView

Inherits from AbstractRectangle.

Listens events: added, removed, transformed, resized, contentAdded, contentRemoved

#### #getElementBySpaceItem(item)

Return the HTMLElement that represents the item in this view.

Return null if no HTMLElement found.

#### #getContainer()

Return the root HTMLElement of this view.

#### #getSpaceItemByElementId(id)

Return the item that is represented by HTMLElement having the given id attribute.

Return null if no item found.

## Abstract Items

The items inherit from their abstract prototypes.

## taaspace.AbstractNode

Inherits from Emitter. See API details at [component-emitter](https://www.npmjs.com/package/component-emitter)

#### #emit(eventName, arg1, arg2, ...)

#### #on(eventName, eventHandler)

#### #off(eventName, eventHandler)

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

## taaspace.AbstractPlane

#### taaspace.AbstractPlane#at(xy)

Return a SpacePoint at xy in the coordinate system of this.

#### taaspace.AbstractPlane#getTransform()

Return transform from this to parent.

#### taaspace.AbstractPlane#getGlobalTransform()

Return transform from this to root parent.

#### taaspace.AbstractPlane#resetTransform()

Set transform to identity. Now, the coordinate system matches the system of the parent AbstractPlane.

#### #setTransform(t)

#### #setGlobalTransform(t)

#### #translate(domain, range)

#### #scale(pivot, multiplierOrDomain, range)

#### #rotate(pivot, radiansOrDomain, range)

#### #translateScale(domain, range)

#### #translateRotate(domain, range)

#### #scaleRotate(domain, range)

#### #translateScaleRotate(domain, range)

## taaspace.AbstractRectangle

#### #atMid()

#### #atMidN()

#### #atMidW()

#### #atMidE()

#### #atMidS()

#### #atNorm(x, y)

#### #atNW()

#### #atNE()

#### #atSW()

#### #atSE()

## Tools

## taaspace.geom

A collection of geometric models, including `Vector` and `Transform`.

### taaspace.preload

### taaspace.version
