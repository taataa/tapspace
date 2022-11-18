module.exports = function () {
  // tapspace.interaction.Pinch:disableTranslation()
  //
  // Disable translation freedom. Preserve other enabled freedoms.
  // If freedom did not have center set,
  // the item anchor becomes the new center.
  //
  // Return
  //   this, for chaining
  //
  const freedom = this.options.freedom
  const type = freedom.type
  const center = freedom.center
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
      nextType = 'I'
      nextCenter = null
      break
    case 'S':
    case 'R':
      nextType = type
      nextCenter = center // preserve
      break
    case 'TS':
      nextType = 'S'
      nextCenter = (center || item.atAnchor())
      break
    case 'TR':
      nextType = 'R'
      nextCenter = (center || item.atAnchor())
      break
    case 'SR':
      nextType = type
      nextCenter = center // preserve
      break
    case 'TSR':
      nextType = 'SR'
      nextCenter = (center || item.atAnchor())
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
