
const AffineElement = function (element, opts) {
  // Parameters:
  //   element
  //     a HTMLElement or HTML string
  //   opts
  //     gravity
  //       { x, y } on the element
  //     size
  //       { width, height }
  //
  if (typeof element === 'string') {
    // Treat as HTML string.
    element = document.createElement('div')
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

  // TODO check that given element is not already affine

  // Default options
  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    gravity: { x: 0, y: 0 },
    size: { width: 256, height: 256 },
  }, opts)

  // Set up a way to access element's affine properties outside.
  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  element.affine = this

  // The DOM element
  this.el = element

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
  // TODO capture transformation from css at init.

  // Affine elements must have a size.
  // TODO capture style width and height at init.
  if (element.dataset.width) {
    element.style.width = parseInt(el.dataset.width) + 'px'
  }
  if (element.dataset.height) {
    element.style.height = parseInt(el.dataset.height) + 'px'
  }

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

// proto.getRotation() is problematic because it would
// give only relative rotation to parent.
// Maybe elem.getProjectionTo(x).getRotation() is better.

proto.getSize = require('./getSize')

proto.isAffineRoot = require('./isAffineRoot')

proto.getProjectionTo = require('./getProjectionTo')
proto.getProjectionToParent = require('./getProjectionToParent')

proto.rotateBy = require('./rotateBy')

proto.transformBy = require('./transformBy')
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