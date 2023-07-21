module.exports = function (width) {
  // @Edge:setWidth(width)
  //
  // Change edge pixel width.
  //
  // Parameters:
  //   width
  //     an integer
  //
  // Return
  //   this, for chaining
  //

  if (typeof width !== 'number') {
    throw new Error('Invalid edge width: ' + width)
  }

  // Points before changing width.
  const start = this.atStart()
  const end = this.atEnd()

  this.width = width

  // Reset points
  this.setPoints(start, end)

  return this
}
