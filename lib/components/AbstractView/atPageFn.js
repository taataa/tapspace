const Point = require('../../geometry/Point')

module.exports = function () {
  // tapspace.components.AbstractView:atPageFn()
  //
  // Get a function that computes a point on the viewport from page coords.
  // Pointer events are a common source for page coordinates.
  //
  // Efficency: we assume that reading values from DOM is relatively slow
  // and that with lots of points, it is better to query DOM once
  // and apply that to each point, than query DOM for each point separately.
  // TODO proof the efficency
  //
  // Parameters
  //   -
  //
  // Returns
  //   a function
  //     Parameters
  //       pageX
  //         a number
  //       pageY
  //         a number
  //     Returns
  //       a Point on viewport
  //

  // Affine viewport relative to the browser viewport.
  const rect = this.element.getBoundingClientRect()
  // Position of viewport origin on the page
  const originX = window.scrollX + rect.left
  const originY = window.scrollY + rect.top
  // Return coordinates relative to our viewport origin, not page origin.
  return (pageX, pageY) => {
    return new Point(this, pageX - originX, pageY - originY)
  }
}
