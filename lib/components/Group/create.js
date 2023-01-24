module.exports = (Group) => {
  return () => {
    // @tapspace.createGroup()
    // @tapspace.createBasis()
    // @Group.create
    //
    // Create a group for further content.
    // Groups can be used for root planes.
    // Root planes are immediate children of the space.
    // Each root plane spans a coordinate system, unlike the space.
    //
    // Group has zero width and height.
    //
    // Return
    //   a Group
    //
    const elem = document.createElement('div')

    return new Group(elem)
  }
}
