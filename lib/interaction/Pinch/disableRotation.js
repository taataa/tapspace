module.exports = function () {
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
  let nextCenter = null

  switch (type) {
    case 'I':
      nextType = 'I'
      nextCenter = null
      break
    case 'T':
      nextType = 'T'
      nextCenter = null
      break
    case 'S':
      nextType = 'S'
      nextCenter = freedom.center // preserve
      break
    case 'R':
      nextType = 'I'
      nextCenter = null
      break
    case 'TS':
      nextType = 'TS'
      nextCenter = null
      break
    case 'TR':
      nextType = 'T'
      nextCenter = null
      break
    case 'SR':
      nextType = 'S'
      nextCenter = freedom.center // preserve
      break
    case 'TSR':
      nextType = 'TS'
      nextCenter = null
      break
    default:
      throw new Error('Unexpected freedom type: ' + type)
  }

  this.options.freedom = {
    type: nextType,
    center: nextCenter
  }

  capturer.update({
    freedom: this.options.freedom
  })

  return this
}
