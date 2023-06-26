module.exports = function () {
  // @Component:orderByDepth()
  //
  // Sort the affine child components in DOM according to their z-coordinate.
  // The larger the z coord, the farther the component. In other words,
  // the smallest z coord is positioned to be the last and thus the
  // topmost to render.
  // Note that the order is opposite when compared to the z-index CSS rule.
  // You can use the z-index rule to make exceptions to the rendering order
  // defined by the sorted DOM.
  //
  // Return
  //   this, for chaining
  //
  // Complexity
  //   O(n*log(n)), where n is the number of children.
  //

  const children = this.getChildren()

  children.sort((a, b) => {
    return a.tran.z === b.tran.z ? 0 : (a.tran.z > b.tran.z ? 1 : -1)
  })

  children.forEach(c => {
    this.element.appendChild(c.element)
  })

  return this
}
