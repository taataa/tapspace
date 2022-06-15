
module.exports = function (viewX, viewY) {
  // Compute a point on the page from a point on the viewport.
  // Practical if points need to be normalised on the page.
  //
  // Parameters
  //   viewX
  //     a number
  //   viewY
  //     a number
  //
  // Return
  //   a point2 on the page
  //

  // Affine viewport relative to the browser viewport.
  const rect = this.element.getBoundingClientRect()
  // The point relative to the browser viewport.
  const clientX = viewX + rect.left
  const clientY = viewY + rect.top
  // The point relative to the whole page.
  const pageX = clientX + window.scrollX
  const pageY = clientY + window.scrollY

  return {
    x: pageX,
    y: pageY
  }
}
