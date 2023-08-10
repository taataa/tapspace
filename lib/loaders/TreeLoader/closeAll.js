module.exports = function (data) {
  // @TreeLoader:closeAll([data])
  //
  // Close all spaces. Useful to clear loader before TreeLoader:initSpace call.
  // Makes the loader emit 'close' for each closing space.
  // The event should be handled at least by calling loader.removeSpace()
  //
  // Parameters:
  //   data
  //     optional object, the context data passed to 'close' event.
  //

  // Default data
  if (!data) {
    data = {}
  }

  Object.keys(this.spaces).forEach((id) => {
    const space = this.spaces[id]
    this.emit('close', { id, space, data })
  })
}
