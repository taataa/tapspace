module.exports = (viewport) => {
  // Return: function, the wheel event handler.
  //
  return (ev) => {
    // The scaling factor.
    const factor = Math.pow(0.5, ev.deltaY / 500)
    // The scaling pivot stays fixed.
    // Use gesture center. Represented on the viewport.
    const pivot = ev.center

    // Just scale. 2D.
    viewport.scaleBy(1 / factor, pivot)

    // TODO limit extreme travel

    viewport.emit('wheel', ev)
  }
}
