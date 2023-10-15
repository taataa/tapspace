module.exports = function () {
  // @Interactive:removeAllInteractions()
  //
  // Unregister all interactions.
  //
  // return
  //   this, for chaining
  //
  const names = Object.keys(this.interactions)

  for (let i = 0; i < names.length; i += 1) {
    this.removeInteraction(names[i])
  }

  return this
}
