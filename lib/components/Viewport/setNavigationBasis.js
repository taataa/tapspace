module.exports = function (basis) {
  // @Viewport:setNavigationBasis(basis)
  //
  // The navigation basis determines the default pinch and zoom depth
  // when the user interacts with the viewport background.
  // Interactions may call this method in the beginning of interaction
  // to lock the navigation basis for the duration of the interaction.
  //
  // Parameters:
  //   basis
  //     a Component or null. The null value resets the basis.
  //
  // Return
  //   this, for chaining
  //

  // Default the basis
  if (!basis) {
    basis = this.hyperspace
  }

  if (!basis.isComponent) {
    throw new Error('Invalid navigation basis')
  }

  this.navigationBasis = basis

  return this
}
