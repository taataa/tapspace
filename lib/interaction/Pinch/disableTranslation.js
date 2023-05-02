module.exports = function () {
  // @tapspace.interaction.Pinch:disableTranslation()
  //
  // Disable translation freedom. Preserve other enabled freedoms.
  // If freedom did not have a pivot set,
  // the item anchor becomes the new pivot.
  //
  // Return
  //   this, for chaining
  //
  const freedom = this.options.freedom
  const type = freedom.type
  const pivot = freedom.pivot
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
      nextType = 'I'
      nextPivot = null
      break
    case 'S':
    case 'R':
      nextType = type
      nextPivot = pivot // preserve
      break
    case 'TS':
      nextType = 'S'
      nextPivot = (pivot || item.atAnchor())
      break
    case 'TR':
      nextType = 'R'
      nextPivot = (pivot || item.atAnchor())
      break
    case 'SR':
      nextType = type
      nextPivot = pivot // preserve
      break
    case 'TSR':
      nextType = 'SR'
      nextPivot = (pivot || item.atAnchor())
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
