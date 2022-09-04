module.exports = (viewport) => {
  // Return: function, the wheel event handler.
  //
  return (ev) => {
    // The scaling factor.
    const factor = 1 - ev.deltaY / 1000
    // The scaling center stays fixed. Represented on the viewport.
    const center = ev.center

    if (viewport.isPerspective()) {
      // Perspective.
      // In perspective mode, the zooming in is implemented by moving closer.
      // We cannot scale every distance equally in perspective projection.
      // Doubling sizes close by requires much shorter move than doubling
      // sizes far way. To double perceived size of an item, you must travel
      // half the distance to the item.
      // Let us try just to set a constant target distance.
      // At that distance, the scaling effect of the move should approximate
      // the scaling apparent in the gesture.
      const dz = 300 * ev.deltaY / 1000
      viewport.translateBy({ x: 0, y: 0, z: dz })
    } else {
      // Orthogonal
      viewport.scaleBy(factor, {
        anchor: ev.center
      })
    }
    // TODO limit extreme travel
    viewport.emit('wheel', ev)
  }
}
