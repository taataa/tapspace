module.exports = (Plane) => {
  return function () {
    // @tapspace.createPlane()
    // @Plane.create
    //
    // Create a flat container for items and other planes.
    //
    // Return
    //   a Plane
    //
    // Create element for the space
    const elem = document.createElement('div')
    elem.className = 'affine-plane'

    return new Plane(elem)
  }
}
