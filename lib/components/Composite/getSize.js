module.exports = function () {
  // @Composite:getSize()
  //
  // Get the size of the bounding box of the component,
  // including the children and their descendants.
  // Can be computationally heavy if there is lots of descendants.
  //
  // Return
  //   a Size
  //
  const bounds = this.getBoundingBox()
  return bounds.getSize()
}
