module.exports = (CircleElement) => {
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
    //   a CircleElement
    //
    return new CircleElement(radius, color)
  }
}
