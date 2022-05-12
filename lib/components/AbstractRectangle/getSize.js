const Size = require('../../geometry/Size')

module.exports = function () {
  // clientWidth and clientHeight include margin but not border.
  // offsetWidth and offsetHeight include margin and border.
  // Reference:
  // https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
  //
  const w = this.element.offsetWidth
  const h = this.element.offsetHeight
  return new Size(this, w, h)
}
