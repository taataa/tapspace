module.exports = function (el, origin) {
  // Update transform-origin css property.
  //
  // Parameters:
  //   el
  //     an HTMLElement
  //   origin
  //     a point {x, y}
  //
  el.style.transformOrigin = origin.x + 'px ' + origin.y + 'px'
}
