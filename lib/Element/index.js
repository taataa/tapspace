
const AffineElement = function (el) {
  if (typeof el === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    el = document.querySelector(el)
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  el.affine = this

  this.el = el

  // Projection from this element to its parent,
  // presented as an affine transformation.
  // { a, b } define the linear transformation (scale, rotation)
  //   that defines the vector space of the element's affine plane.
  // { x, y } is the displacement or origin.
  //   The origin of this element can be found on parent at { x, y }
  this.tr = {
    a: 1,
    b: 0,
    x: 0,
    y: 0
  }
  // TODO capture transformation from css at init

  this.type = 'element'

  // TODO bind to element resize
}

const proto = AffineElement.prototype

proto.at = require('./at')
proto.atNorm = require('./atNorm')
proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = function () {
  return this.atNorm(0.5, 0)
}
proto.atTopRight = function () {
  return this.atNorm(1, 0)
}
proto.atMidLeft = function () {
  return this.atNorm(0, 0.5)
}
proto.atCenter =
proto.atMidMid =
proto.atMid = function () {
  return this.atNorm(0.5, 0.5)
}
proto.atMidRight = function () {
  return this.atNorm(1, 0.5)
}
proto.atBottomLeft = function () {
  return this.atNorm(0, 1)
}
proto.atBottomMid = function () {
  return this.atNorm(0.5, 1)
}
proto.atBottomRight = function () {
  return this.atNorm(1, 1)
}

proto.getAncestors = require('./getAncestors')
proto.getSize = require('./getSize')

proto.isAffineRoot = require('./isAffineRoot')

proto.projectionTo = require('./projectionTo')
proto.projectionToParent = require('./projectionToParent')

proto.translateBy = require('./translateBy')

// proto.off // TODO
// proto.on // TODO

// proto.touchable = function () {
//   // TODO return a Touch object
// }
// or draggable

// proto.wheelable = function () {
//   // TODO return a Wheel object
// }
// or scrollable

module.exports = AffineElement
