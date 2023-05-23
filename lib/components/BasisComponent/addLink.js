module.exports = function (key, target) {
  // @BasisComponent:addLink(key, target)
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

  if (!target.isBasisComponent) {
    throw new Error('Invalid target')
  }

  this.links[key] = target

  return this
}
