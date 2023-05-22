module.exports = (viewport) => {
  // Return: function, the wheel event handler.
  //
  return (ev) => {
    // The scaling factor.
    const factor = 1 - ev.deltaY / 1000
    // The scaling pivot stays fixed.
    // Use gesture center. Represented on the viewport.
    const pivot = ev.center

    // Just scale. 2D.
    viewport.scaleBy(1 / factor, pivot)

    // TODO limit extreme travel

    viewport.emit('wheel', ev)
  }
}
