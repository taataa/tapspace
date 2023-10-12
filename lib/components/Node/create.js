module.exports = (Node) => {
  return (radius, color) => {
    // @tapspace.createNode(radius)
    //
    // Make a circle-shaped element.
    //
    // Parameters:
    //   radius
    //     a number
    //   color
    //     optional CSS color string.
    //     Omit if you want to control the color via CSS classes.
    //
    // Return
    //   a Node
    //
    return new Node(radius, color)
  }
}
