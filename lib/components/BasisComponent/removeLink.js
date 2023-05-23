module.exports = function (key, target) {
  // @BasisComponent:removeLink(key, target)
  //
  // Parameters:
  //   key
  //     a string
  //   target
  //     a BasisComponent
  //

  if (typeof key !== 'string') {
    throw new Error('Invalid key')
  }

  if (!target) {
    delete this.links[key]
  }

  if (target.isBasisComponent) {
    if (this.links[key] === target) {
      delete this.links[key]
    }
  }

  return this
}
