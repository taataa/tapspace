module.exports = function () {
  // Same as the normal requestIdle but targets the viewport.
  // Hyperspace is not interactive, thus it does not track idle status
  // unlike viewport.

  this.viewport.requestIdle()

  return this
}
