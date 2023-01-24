module.exports = function () {
  // @tapspace.interaction.Pinch:enableTranslation()
  //
  // Enable translation freedom. Mix it with other enabled freedoms.
  // This cancels any fixed pivot points.
  //
  // Return
  //   this, for chaining
  //

  const freedom = this.options.freedom
  const type = freedom.type
  const item = this.source
  const capturer = item.capturer('gesture')

  let nextType = 'I'

  switch (type) {
    case 'I':
    case 'T':
      nextType = 'T'
      break
    case 'S':
      nextType = 'TS'
      break
    case 'R':
      nextType = 'TR'
      break
    case 'TS':
    case 'TR':
      nextType = type
      break
    case 'SR':
    case 'TSR':
      nextType = 'TSR'
      break
    default:
      throw new Error('Unexpected freedom type: ' + type)
  }

  this.options.freedom = {
    type: nextType,
    pivot: null
  }

  capturer.update({
    freedom: this.options.freedom
  })

  return this
}
