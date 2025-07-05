module.exports = (source, target, options) => {
  // Factory of wheel event handler.
  //
  // Return
  //   function, the wheel event handler.
  //
  return (ev) => {
    // The wheel roll. Invert if needed.
    const dir = options.invert ? 1 : -1
    const delta = dir * ev.deltaY
    // The scaling factor.
    const factor = Math.pow(2, delta / 500)

    // The scaling pivot stays fixed.
    // Use gesture center. Represented on the viewport.
    const pivot = ev.center

    // Just 2D scaling.
    target.scaleBy(factor, pivot)

    // TODO limit extreme travel

    source.emit('wheel', ev)
  }
}
