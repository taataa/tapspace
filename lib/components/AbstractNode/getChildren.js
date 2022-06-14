module.exports = function () {
  // Get all affine children from DOM.
  //
  const el = this.element
  const result = []
  for (let i = 0; i < el.children.length; i += 1) {
    if (el.children[i].affine) {
      result.push(el.children[i].affine)
    }
  }
  return result
}
