
const AffineElement = function (el, opts) {
  if (typeof el === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    el = document.querySelector(el)
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

  // Default options
  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    width: 256,
    height: 256
  }, opts)

  // Set up a way to access element's affine properties outside.
  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  el.affine = this

  // The DOM element
  this.el = el

  // Projection from this element to its parent,
  // presented as an affine transformation.
  // { a, b } define the linear transformation (scale, rotation)
  //   that defines the vector space of the element's affine plane.
  // { x, y } is the displacement or origin.
  //   The origin of this element can be found on parent at { x, y }
  this.proj = {
    a: 1,
    b: 0,
    x: 0,
    y: 0
  }
  // TODO capture transformation from css at init

  this.type = 'element'

  // TODO bind to element resize
  // TODO do we need to bind to element resize anymore?
}

const proto = AffineElement.prototype

proto.at = require('./at')
proto.atNorm = require('./atNorm')
proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = require('./atTopMid')
proto.atTopRight = require('./atTopRight')
proto.atMidLeft = require('./atMidLeft')
proto.atCenter =
proto.atMid =
proto.atMidMid = require('./atMidMid')
proto.atMidRight = require('./atMidRight')
proto.atBottomLeft = require('./atBottomLeft')
proto.atBottomMid = require('./atBottomMid')
proto.atBottomRight = require('./atBottomRight')

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
