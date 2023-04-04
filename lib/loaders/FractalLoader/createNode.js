module.exports = function (id) {
  const node = this.generator(id)
  node.fractalId = id
  return node
}
