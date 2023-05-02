module.exports = function () {
  // @tapspace.interaction.Pinch:disableDilation()
  //
  // Disable scaling freedom. Preserve other enabled freedoms.
  //
  // Return
  //   this, for chaining
  //
  const freedom = this.options.freedom
  const type = freedom.type
  const item = this.source
  const capturer = item.capturer('gesture')

  let nextType = 'I'
  let nextPivot = null

  switch (type) {
    case 'I':
    case 'T':
      nextType = type
      break
    case 'S':
      nextType = 'I'
      break
    case 'R':
      nextType = 'R'
      nextPivot = freedom.pivot // preserve
      break
    case 'TS':
      nextType = 'T'
      break
    case 'TR':
      nextType = 'TR'
      break
    case 'SR':
      nextType = 'R'
      nextPivot = freedom.pivot // preserve
      break
    case 'TSR':
      nextType = 'TR'
      break
    default:
      throw new Error('Unexpected freedom type: ' + type)
  }

  this.options.freedom = {
    type: nextType,
    pivot: nextPivot
  }

  capturer.update({
    freedom: this.options.freedom
  })

  return this
}
