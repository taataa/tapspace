module.exports = (Circle) => {
  return (radius, color) => {
    // tapspace.createCircle(radius, color)
    //
    // Make a circle-shaped element.
    //
    // Parameters:
    //   radius
    //     a number
    //   color
    //     a CSS color string
    //
    // Return
    //   a Circle
    //
    return new Circle(radius, color)
  }
}
