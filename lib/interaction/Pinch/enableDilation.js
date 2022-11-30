module.exports = function (pivot) {
  // tapspace.interaction.Pinch:enableDilation(pivot)
  //
  // Enable scaling freedom. Mix it with other enabled freedoms.
  //
  // Parameters:
  //   pivot
  //     optional Point. The scaling is only allowed about this fixed point.
  //
  // Return
  //   this, for chaining
  //

  const freedom = this.options.freedom
  const type = freedom.type
  const item = this.source
  const capturer = item.capturer('gesture')

  const hasPivot = (
    typeof pivot === 'object' &&
    typeof freedom.pivot === 'object'
  )

  let nextType = 'I'
  let nextPivot = null

  switch (type) {
    case 'I':
      nextType = (pivot ? 'S' : 'TS')
      nextPivot = (pivot || null)
      break
    case 'T':
      nextType = (pivot ? 'S' : 'TS')
      nextPivot = (pivot || null)
      break
    case 'S':
      nextType = (hasPivot ? 'S' : 'TS')
      nextPivot = (pivot || freedom.pivot || null) // replace or preserve
      break
    case 'R':
      nextType = (hasPivot ? 'SR' : 'TSR')
      nextPivot = (pivot || freedom.pivot || null) // replace or preserve
      break
    case 'TS':
      nextType = (pivot ? 'S' : 'TS')
      nextPivot = (pivot || null)
      break
    case 'TR':
      nextType = (pivot ? 'SR' : 'TSR')
      nextPivot = (pivot || null)
      break
    case 'SR':
      nextType = (hasPivot ? 'SR' : 'TSR')
      nextPivot = (pivot || freedom.pivot || null) // replace or preserve
      break
    case 'TSR':
      nextType = (pivot ? 'SR' : 'TSR')
      nextPivot = (pivot || null)
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
