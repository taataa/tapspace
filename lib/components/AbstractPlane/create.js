module.exports = (Plane) => {
  return () => {
    // tapspace.createBasis()
    // @Plane.create
    //
    // Create a root plane for further content. Root planes
    // are immediate children of the space. Each root plane
    // spans a coordinate system, unlike the space.
    //
    // Root plane element has zero width and height.
    // Root planes cannot be interacted with, except via viewport.
    //
    // Return
    //   a Plane
    //
    const elem = document.createElement('div')
    elem.className = 'affine-plane'

    return new Plane(elem)
  }
}
