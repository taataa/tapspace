module.exports = function () {
  // @Item:disable()
  //
  // Makes the item non-operational, a kind of anti-interaction.
  // In addition to removing all ongoing interactions, it prevents
  // the default actions of its parents and ancestors.
  //
  // Return
  //   this, for chaining
  //

  this.removeAllInteractions()

  this.capturer('gesture', {
    preventDefault: true
  })

  // TODO prevent default in other capturers too.

  return this
}
