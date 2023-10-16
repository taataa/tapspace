module.exports = (Space) => {
  return function () {
    // @tapspace.createSpace()
    // @Space.create
    //
    // Create a container for items and other spaces.
    //
    // Return
    //   a Space
    //
    return new Space()
  }
}
