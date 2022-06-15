const Point = require('../../geometry/Point')

module.exports = function (pageX, pageY) {
  // Compute a point on the viewport from page coordinates.
  // Pointer events are a common source for page coordinates.
  //
  // Parameters
  //   pageX
  //     a number
  //   pageY
  //     a number
  //
  // Return
  //   a Point on viewport
  //

  // Affine viewport relative to the browser viewport.
  const rect = this.element.getBoundingClientRect()
  // Browser viewport relative to the page available via scrollX and scrollY
  const clientX = pageX - window.scrollX
  const clientY = pageY - window.scrollY
  // Finally, coords relative to the affine viewport
  const offsetX = clientX - rect.left
  const offsetY = clientY - rect.top

  return new Point(this, offsetX, offsetY)
}
