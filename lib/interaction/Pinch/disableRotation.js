module.exports = function () {
  // @tapspace.interaction.Pinch:disableRotation()
  //
  // Disable rotation freedom. Preserve other enabled freedoms.
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
      nextType = 'I'
      nextPivot = null
      break
    case 'T':
      nextType = 'T'
      nextPivot = null
      break
    case 'S':
      nextType = 'S'
      nextPivot = freedom.pivot // preserve
      break
    case 'R':
      nextType = 'I'
      nextPivot = null
      break
    case 'TS':
      nextType = 'TS'
      nextPivot = null
      break
    case 'TR':
      nextType = 'T'
      nextPivot = null
      break
    case 'SR':
      nextType = 'S'
      nextPivot = freedom.pivot // preserve
      break
    case 'TSR':
      nextType = 'TS'
      nextPivot = null
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
