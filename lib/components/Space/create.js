module.exports = (Space) => {
  return function () {
    // tapspace.createSpace()
    // @Space.create
    //
    // Create a space. The space is an HTMLElement that represents a 3D basis.
    // It has an origin point, orientation, and scale. Therefore it spans
    // a coordinate system into which we can position other tapspace components.
    //
    // To display the space in DOM, add it to a Viewport.
    // A viewport can manage multiple spaces.
    // Internally the viewport maintains a *hyperspace* that handles nasty
    // underflows and overflows caused by floating point arithmetic when
    // we travel between remote spaces.
    //
    // Example:
    // ```
    // const space = tapspace.createSpace()
    // const view = tapspace.createView('#tapspace')
    // const position = view.atCenter()
    // view.addSpace(space, position)
    // ```
    //
    // Return
    //   a Space
    //
    return new Space()
  }
}
