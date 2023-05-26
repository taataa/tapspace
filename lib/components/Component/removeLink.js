module.exports = function (key, target) {
  // @Component:removeLink(key, target)
  //
  // Parameters:
  //   key
  //     a string
  //   target
  //     a Component
  //

  if (typeof key !== 'string') {
    throw new Error('Invalid key')
  }

  if (!target) {
    delete this.links[key]
  }

  if (target.isComponent) {
    if (this.links[key] === target) {
      delete this.links[key]
    }
  }

  return this
}
