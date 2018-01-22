
var IVector = require('./IVector')
var SpacePlane = require('./SpacePlane')
var Vector = require('./Vector')
var IPath = require('./IPath')
var Path = require('./Path')
var extend = require('extend')

var SpaceRectangle = function () {
  // A rectangular area in space.
  //
  SpacePlane.call(this)

  // Rectangles have size. We represent the size as a diagonal vector.
  // In its own coordinates, rectangle's right bottom corner
  // is located at _diag.
  // By default transformation, width 1 and height 1 equal to 1 space unit.
  this._diag = new Vector(1, 1)
}

var p = extend({}, SpacePlane.prototype)
SpaceRectangle.prototype = p

p.atNorm = function (x, y) {
  // Return an IVector by coordinates normalized about the size.
  // atNorm(1, 0) returns the point at the right upper corner.
  //
  if (typeof y !== 'number') {
    // Helps to detect bugs, especially as the interface has changed in v4
    throw new Error('Invalid (x, y) coordinates. Numbers are required.')
  }

  return new IVector(
    new Vector(this._diag.x * x, this._diag.y * y),
    this
  )
}

p.atMid = function () {
  return new IVector(this._diag.multiply(0.5), this)
}

p.atMidN = function () {
  return new IVector(new Vector(this._diag.x / 2, 0), this)
}

p.atMidW = function () {
  return new IVector(new Vector(0, this._diag.y / 2), this)
}

p.atMidE = function () {
  return new IVector(new Vector(this._diag.x, this._diag.y / 2), this)
}

p.atMidS = function () {
  return new IVector(new Vector(this._diag.x / 2, this._diag.y), this)
}

p.atNW = function () {
  return new IVector(new Vector(0, 0), this)
}

p.atNE = function () {
  return new IVector(new Vector(this._diag.x, 0), this)
}

p.atSW = function () {
  return new IVector(new Vector(0, this._diag.y), this)
}

p.atSE = function () {
  return new IVector(new Vector(this._diag.x, this._diag.y), this)
}

p.fitScale = function (ipa) {
  // Scale and translate to fit around ipa.
  //
  // Parameters:
  //   ipa
  //     IPath, SpaceRectangle, or SpaceGroup
  //
  // Emits:
  //   transformed
  //
  // Return
  //   self
  //     for chaining
  //

  // Rectangular paths
  var selfBounds = this.getHull().to(this).getBounds()
  var ipaBounds = ipa.getHull().to(this).getBounds()
  // The goal is to scale and translate self so that
  // the ipa is entirely inside self but still maximal in size.
  // We could just take selfBounds as the domain and ipaBounds as the range
  // and then translateScale(domain, range) but that leads to a correct
  // solution only when the width-height ratios are equal. Otherwise
  // the translateScale estimation leaves self too small.
  //
  // A more general solution is achieved by making a custom domain
  // by picking such points along selfBounds that form a width-height ratio
  // equal to ipaBounds.
  var ihh, hh, iwh, wh, domain, idomain, irange
  var w = selfBounds.get(2).x - selfBounds.get(0).x
  var h = selfBounds.get(2).y - selfBounds.get(0).y
  var iw = ipaBounds.get(2).x - ipaBounds.get(0).x
  var ih = ipaBounds.get(2).y - ipaBounds.get(0).y
  var r = w / h // TODO h=0
  var ir = iw / ih // TODO ih=0

  if (ir > r) {
    // Ipa has wider shape than self.
    // Thus in the result the widths are equal.
    //        w
    // A +---------+ B         +     +
    //   |         |           | hh  |
    // A'+---------+ B' +      +     |
    //   |   ipa   |    | ihh        | h
    // D'+---------+ C' +      +     |
    //   |         |           | hh  |
    // D +---------+ C         +     +
    ihh = w / ir // TODO ir=0
    hh = (h / 2) - (ihh / 2)
    // We have everything we need for a squeezed domain
    domain = new Path([
      new Vector(selfBounds.get(0).x, selfBounds.get(0).y + hh), // A'
      new Vector(selfBounds.get(1).x, selfBounds.get(1).y - hh), // D'
      new Vector(selfBounds.get(2).x, selfBounds.get(2).y - hh), // C'
      new Vector(selfBounds.get(3).x, selfBounds.get(3).y + hh)  // B'
    ])
  } else {
    // Self has wider shape than ipa.
    // Thus in the result the heights are equal.
    //        A'  B'
    // A +----+---+----+ B  +
    //   |    |   |    |    |
    //   |    |ipa|    |    | h
    //   |    |   |    |    |
    // D +----+---+----+ C  +
    //        D'  C'
    //
    //        +---+      iwh
    //   +----+          wh
    //            +----+ wh
    //   +-------------+ w
    iwh = h * ir
    wh = (w / 2) - (iwh / 2)
    domain = new Path([
      new Vector(selfBounds.get(0).x + wh, selfBounds.get(0).y), // A'
      new Vector(selfBounds.get(1).x + wh, selfBounds.get(1).y), // D'
      new Vector(selfBounds.get(2).x - wh, selfBounds.get(2).y), // C'
      new Vector(selfBounds.get(3).x - wh, selfBounds.get(3).y)  // B'
    ])
  }

  idomain = new IPath(domain, this)
  irange = new IPath(ipaBounds, this)
  return this.translateScale(idomain, irange)
}

p.fitSize = function (ipa) {
  // Resize and translate to fit around ipa without altering
  // the scale of the plane. The size aspect ratio of the rectangle
  // may change.
  // The algorithm goes as follows:
  // 1. represent the path in the coordinate system of the resizable self
  // 2. take bounding box of the path
  // 3. resize self to match the size of the bounding box
  // 4. translate self to match the location of the bounding box
  // As a result, the rectangle's area covers the given path.
  //
  // Parameters:
  //   ipa
  //     IPath, SpaceRectangle, or SpaceGroup
  //
  // Emits:
  //   transformed
  //   resized
  //
  // Return:
  //   self
  //     for chaining
  //
  var ipaBounds = ipa.getHull().to(this).getBounds()
  // Compute size and resize
  var nw = ipaBounds.get(0)  // Vector
  var se = ipaBounds.get(2)
  var w = se.x - nw.x
  var h = se.y - nw.y
  this._diag = new Vector(w, h)
  // Translate to center
  this.translate(this.atNW(), new IVector(nw, this))
  this.emit('resized', this)

  return this
}

p.getHull = function () {
  // Get bounding IPath
  //
  // 0--3
  // |  |
  // 1--2
  //
  return new IPath(new Path([
    new Vector(0, 0),
    new Vector(0, this._diag.y),
    new Vector(this._diag.x, this._diag.y),
    new Vector(this._diag.x, 0)
  ]), this)
}

p.getLocalSize = function () {
  // Get size as Vector v in units of its own coordinate plane.
  // Note, v.x equals width, v.y equals height.
  return this._diag
}

p.getSize = function () {
  // Get size as IVector diagonal. Handy if you need the size in
  // global unitsor in units of another plane.
  return new IVector(this._diag, this)
}

p.setSize = function (invariantDiagonal) {
  // Set rectangle dimensions. IVector takes care of
  // required coordinate transformations. Handy if you want
  // two rectangles to have globally equal size.
  //
  // Parameter
  //   invariantDiagonal
  //     IVector
  //
  this._diag = invariantDiagonal.to(this)
  this.emit('resized', this)

  return this
}

p.setLocalSize = function (diagonal) {
  // Set size of the rectangle in units of its own plane.
  //
  // Parameter
  //   diagonal
  //     Vector(width, height)
  //
  this._diag = diagonal
  this.emit('resized', this)

  return this
}

module.exports = SpaceRectangle
