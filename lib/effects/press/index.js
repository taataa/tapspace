
module.exports = (component, options) => {
  // Pressing effect: the element moves down a bit and then back up.
  //
  // Parameters:
  //   options
  //     distance
  //       optional number. Displacement during press in pixels. Default 2.
  //     attack
  //       time to press down. ms
  //     hold
  //       time between presses. ms
  //     release
  //       time to press up. ms
  //
  if (!options) {
    options = {}
  }

  options = Object.assign({
    distance: 4,
    attack: 0,
    hold: 500,
    release: 0
  }, options)

  // Save original position
  const originProj = component.proj

  // Construct animation
  // TODO smoothen
  component.translateBy({ x: 0, y: options.distance })
  setTimeout(() => {
    component.translateBy({ x: 0, y: -options.distance })
    component.proj = originProj

    // TODO promise
  }, options.hold)
}
