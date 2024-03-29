const Size = require('../../geometry/Size')

module.exports = function () {
  // @Viewport:getSize()
  //
  // Get viewport size. The size is read from the viewport
  // element.offsetWidth and element.offsetHeight.
  //
  // Return
  //   a Size
  //

  // clientWidth and clientHeight include margin but not border.
  // offsetWidth and offsetHeight include margin and border.
  // Reference:
  // https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
  const size = {
    w: this.element.offsetWidth,
    h: this.element.offsetHeight,
    d: 0
  }

  return new Size(this, size)
}
