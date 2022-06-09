module.exports = function () {
  // Return all control group components of the viewport.
  //
  // Return
  //   array of ControlGroups
  //
  const children = this.controlsElem.children

  const affineChildren = []
  const len = children.length
  for (let i = 0; i < len; i += 1) {
    const child = children[i]
    if (child.affine) {
      affineChildren.push(child)
    }
  }

  return affineChildren
}
