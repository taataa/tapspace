const findAffineAncestor = require('../../utils/findAffineAncestor')

module.exports = function (point) {
  // @View:getItemAt(point)
  //
  // Find affine item under the given point.
  //
  // Parameters:
  //   point
  //     a Point
  //
  // Return
  //   a Block. The affine component that is under the point.
  //   If no other elements at the point, will return the viewport.
  //

  // Normalize the point onto the viewport.
  if (point.transitRaw) {
    point = point.transitRaw(this)
  }

  // document.elementFromPoint is relative to the browser viewport.
  // Therefore we must convert tapspace viewport coordinates to
  // browser viewport coordinates.

  // Affine viewport relative to the browser viewport.
  // Use rect.left and rect.top
  const rect = this.element.getBoundingClientRect()
  const vx = rect.left + point.x
  const vy = rect.top + point.y
  // Use browser built-in hit detection.
  const el = document.elementFromPoint(vx, vy)

  // Find nearest affine node for el in DOM. Can be null if no affine elems.
  const affine = findAffineAncestor(el)

  if (affine) {
    return affine
  }

  // No affine ancestor. Point is somehow outside the viewport DOM.
  // Best guess is to return the viewport itself.
  // TODO There could be elements in space but outside the visible rectangle.
  return this
}
