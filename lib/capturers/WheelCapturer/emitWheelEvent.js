const Basis = require('../../components/Basis')
const findAffineAncestor = Basis.findAffineAncestor

module.exports = (capturer) => {
  return function (ev) {
    // Build and emit capturer wheel emit.
    //
    // Parameters
    //   ev
    //     browser wheel event
    //

    if (capturer.options.preventDefault) {
      ev.preventDefault()
    }
    if (capturer.options.stopPropagation) {
      ev.stopPropagation()
    }

    // Get cursor position to scale around.
    let xy
    // Normalise page coordinates onto the root component if possible.
    // We assume the root component has the same coord system as the page.
    // Root component i.e Viewport.
    const root = capturer.component.getRoot()
    if (root.atPage) {
      xy = root.atPage(ev.pageX, ev.pageY)
    } else {
      // Fall back to page coordinates
      xy = root.at(ev.pageX, ev.pageY)
    }

    // Wheel movement
    const dx = ev.deltaX
    const dy = ev.deltaY
    // const dz = ev.deltaZ // for 3D-mouses

    // Unit of wheel movement
    const dmode = ev.deltaMode

    // Attempt to normalise the unit based on the delta mode.
    // TODO find or compute more accurate multipliers
    let multiplier = 1
    switch (dmode) {
      case 0x00:
        // Deltas in pixels
        multiplier = 1
        break
      case 0x01:
        // Deltas in lines
        multiplier = 14
        break
      case 0x02:
        // Deltas in pages
        multiplier = 400
        break
      default:
        multiplier = 1
    }

    // Find an affine component closest to the true ev.target in DOM.
    const affineTarget = findAffineAncestor(ev.target)

    capturer.emit('wheel', {
      /// Point for gesture center
      center: xy,
      component: capturer.component,
      target: affineTarget,
      // TODO use Vector for delta
      deltaX: multiplier * dx,
      deltaY: multiplier * dy
    })
  }
}
