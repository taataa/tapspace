const AffineCircle = require('./index')

module.exports = (radius, color, options) => {
  // Make a circle-shaped element.
  //
  // Parameters:
  //   radius
  //     a number
  //   color
  //     a CSS color string
  //   options
  //     optional object with properties
  //       id
  //         a string, optional. The id attribute of the element.
  //       className
  //         a string, optional. The class attribute of the element.
  //       anchor
  //         { x, y } on the element. Default {x:0,y:0}
  //
  // Return
  //   a Component
  //
  return new AffineCircle(radius, color, options)
}
