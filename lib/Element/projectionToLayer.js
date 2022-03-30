const transform = require('affineplane').transform

module.exports = () => {
  // Total transformation from the element to the layer.
  //
  let tr = { a: 1, b: 0, x: 0, y: 0 }
  let plane = this.el

  while (plane.parentElement.affine) {
    let proj = plane.affine.tr // map from el to parent
    tr = transform.multiply(proj, tr)
    plane = plane.parentElement
  }

  return tr
}
