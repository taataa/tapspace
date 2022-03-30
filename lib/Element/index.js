const setElementTransform = require('./setElementTransform')
// const proj = require('../geom/proj')

const SpaceElement = function (el) {
  if (typeof el === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    el = document.querySelector(el)
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

  // TODO The parent DOM element must be a space element.
  // TODO Allow bastard space elements.
  // TODO allow viewless dom spaces. Much easier for the programmers
  // Use parentNode instead of parentElement. See:
  //   https://stackoverflow.com/a/8685780/638546

  // TODO capture transformation from css at init

  // Allow us to find the space element of the parent DOM element.
  // This frees us from duplicating the DOM structure.

  // TODO Should we use an id?
  // Store all objects in a global map from affineid --> SpaceElement
  // el.dataset.affineid = Math.random().toFixed(16).substring(2)// TODO unique

  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks. https://stackoverflow.com/a/1402782/638546
  el.affine = this

  this.el = el

  // Why we need to duplicate the coordinates here and in style?
  // Assumption: Too much overhead from parsing the css values
  // possibly thousands of times per second.
  //
  // What if the coordinates change thousands of times per second?
  // Style.transform will be generated thousands of times per second.
  // Perspective panning would ask 60 * n string generations, which
  // is probably as heavy operation as parsing the transform string
  // 60 * n times, where n is the number of space elements.

  // Translation from parent origin in the parent's space
  // this.x = 0
  // this.y = 0
  // this.z = 0 // represented as depth towards view origin
  // NOTE gestures are unable to modify z

  // Scaling and rotation about the set origin.
  // This defines the vector space of the element's affine plane.
  // this.s = 0 // scale, multiplier
  // this.r = 0 // radians
  // TODO or directly multiplicable:
  // this.a
  // this.b
  // this.c
  // this.d

  // TODO capture transformation from css at init
  this.tr = {
    a: 1,
    b: 0,
    x: 0,
    y: 0
  }

  // Relative to the left top corner of the html element,
  // the pixel position for the origin of the space element.
  // Use px,py instead of x,y to emphasize pixel coordinates.
  // this.origin = {
  //   px: 0,
  //   py: 0
  // }
  // TODO Is origin needed? Or does it complicate things by
  // separating element coordinate space (local DOM coordinate space)
  // and the origin for the linear transformation?

  // TODO bind to element resize
}

// SpaceElement.createView = (el) => {
//   // TODO Is separate viewport creation needed?
//   // TODO name viewport or createViewport?
// }

const proto = SpaceElement.prototype

proto.ancestors = function () {
  // Ancestor space elements, ordered from the immediate parent to
  // the farthest ancestor, the immediate parent first.
  const arr = []
  let el = this.el.parentElement
  while (el.affinedom) {
    arr.push(el)
    el = el.parentElement
  }
  return arr
}

proto.at = require('./at')
proto.atNorm = require('./atNorm')

proto.atTopLeft = function () {
  return this.atNorm(0, 0)
}
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

proto.translateBy = require('./translateBy')

// proto.delta =
// proto.vector =
// proto.vectorTo =
// proto.project =
// proto.projection =
// proto.projectionTo = function (target) {
//   // Parameters
//   //   target
//   //     SpaceElement or SpaceView
//   //
//
//   // TODO allow Element as target? Detect if affine element
//
//   // TODO find common root and combine transformations
//   // TODO maybe apply a lowest common ancestor algorithm? See:
//   // TODO https://www.baeldung.com/cs/tree-lowest-common-ancestor
//
//   // Extra naive method: travel always to view
//   // Naive method: assign depth for each, then travel towards root until same
//
//   // See also: element.compareDocumentPosition()
//
//   // TODO benchmark in-memory coordinates versus css parsed ones.
//   // Allow all DOM nodes where position absolute, 0, 0 and
//   // transform set
//
//   // Find our projection to view // TODO why global projection?
//   const sourceProj = this.ancestors().reduce((acc, sel) => {
//     return proj.combine(acc, sel.proj)
//   }, this.proj)
//
//   // Find target's projection to view // TODO why global?
//   const targetProj = this.ancestors().reduce((acc, sel) => {
//     return proj.combine(acc, sel.proj)
//   }, target.proj)
//
//   return proj.between(sourceProj, targetProj)
// }

// proto.move = function (tran4) {
//   // TODO detect if vector2, tran2, tran4
//   // TODO On which plane is the transformation?
//
//   // TODO recompute the projection to parent
//   this.proj = proj.transform(this.proj, tran4)
//
//   // TODO if the view is the parent then account its transformation.
//   // We want to set style.transform on the view coordinates
//   const view = this.el.parentElement.affineview
//   if (view) {
//     const projToView = proj.between(this.proj, view.proj)
//     setElementTransform(this.el, projToView)
//   } else {
//     setElementTransform(this.el, this.proj)
//   }
// }

// proto.off = function (evName, evHandler) {
//   // TODO
// }
//
// proto.on = function (evName, evHandler) {
//   // TODO
// }

proto.size = function () {
  // clientWidth and clientHeight include margin but not border.
  // offsetWidth and offsetHeight include margin and border.
  // Reference:
  // https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
  return {
    basis: this.el,
    w: this.el.offsetWidth,
    h: this.el.offsetHeight
  }
}

// proto.touchable = function () {
//   // TODO return a Touch object
// }
// or draggable

// proto.wheelable = function () {
//   // TODO return a Wheel object
// }
// or scrollable

module.exports = SpaceElement
