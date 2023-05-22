module.exports = function () {

  const children = this.getChildren()
  children.forEach(child => {
    child.renderTransform()
  })

  return this
}
