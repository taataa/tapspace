module.exports = (CircleItem) => {
  return (radius, color) => {
    // @tapspace.createCircle(radius, color)
    //
    // Make a circle-shaped element.
    //
    // Parameters:
    //   radius
    //     a number
    //   color
    //     optional CSS color string.
    //     Leave empty if you want to control the color via CSS classes.
    //
    // Return
    //   a CircleItem
    //
    return new CircleItem(radius, color)
  }
}
