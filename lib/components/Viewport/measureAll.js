module.exports = function (filter) {
  // @Viewport:measureAll([filter])
  //
  // Compute element distances, areas, and visibility relative to the viewport.
  // Useful of semantic zooming and other spatially triggered behavior.
  // Computation can be computationally intensive, and therefore it is
  // advisable to measure only occasionally or at viewport 'idle' event.
  //
  // Example:
  // ```
  // const measurements = view.measureAll()
  // measurements.forEach((measurement) => {
  //   const item = measurement.target
  //   if (measurement.areaRatio >= 0.3) {
  //     item.addClass('large')
  //   } else {
  //     item.removeClass('large')
  //   }
  // })
  // ```
  //
  // Parameters:
  //   filter
  //     optional function (item) => boolean.
  //     .. Limit the set of items to measure.
  //
  // Returns:
  //   an array of Measurement.
  //
  // Complexity:
  //   O(n) where n is the number of nodes in the spaces.
  //
  return this.measureGroup(this.hyperspace, filter)
}
