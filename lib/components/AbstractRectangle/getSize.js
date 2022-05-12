module.exports = function () {
  // clientWidth and clientHeight include margin but not border.
  // offsetWidth and offsetHeight include margin and border.
  // Reference:
  // https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
  //
  return {
    basis: this,
    w: this.element.offsetWidth,
    h: this.element.offsetHeight
  }
}
