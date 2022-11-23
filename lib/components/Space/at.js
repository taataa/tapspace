module.exports = function () {
  // Ensure users do not try to call space.at()
  throw new Error('Invalid at() call. ' +
    'Space has no coordinate system. ' +
    'Use view.at() or basis.at() instead.')
}
