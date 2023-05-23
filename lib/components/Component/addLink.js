module.exports = function (key, target) {
  // @Component:addLink(key, target)
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

  if (!target.isComponent) {
    throw new Error('Invalid target')
  }

  this.links[key] = target

  return this
}
