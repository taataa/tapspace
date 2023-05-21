module.exports = (viewport, ev) => {
  // Find a target for the wheel zoom.
  //
  // Especially in 3D it is necessary to transform viewport
  // with respect to the target element or a close-by element.
  //

  // If user interacts with the viewport background, what depth to use?
  if (ev.target === viewport || ev.target === viewport.getHyperspace()) {
    // const defaultTarget = viewport.findNearestMass()
    // const defaultTarget = viewport.findNearestProjected(pivot)
    const defaultTarget = viewport.navigationBasis

    if (defaultTarget) {
      return defaultTarget
    }

    // Space is empty of solids. Thus use the viewport itself.
    return viewport
  }

  // Target is a component in space.
  // Zoom closer to solid objects and zoom through nonsolids.

  if (ev.target.isSolid()) {
    return ev.target
  }

  // Target is non-solid. Use viewport navigation basis if any.
  const defaultTarget = viewport.navigationBasis

  if (defaultTarget) {
    return defaultTarget
  }

  // Space is likely empty, thus target the viewport itself.
  return viewport
}
