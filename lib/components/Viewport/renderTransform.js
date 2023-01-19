module.exports = function (alt) {
  // @Viewport:renderTransform(alt)
  //
  // Updates the element.style.transform according to the plane transition.
  //
  // You need to call this function only when you have manually edited
  // or replaced a plane.tran object.
  //
  // Parameters:
  //   alt
  //     optional plane3 transition to render instead of this.tran.
  //     .. See Plane:renderTransform for details.
  //

  // Delegate to each plane.
  const spaces = this.hyperspace.getChildren()
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].renderTransform(alt)
  }
}
