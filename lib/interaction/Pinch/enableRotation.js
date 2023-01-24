module.exports = function (pivot) {
  // @tapspace.interaction.Pinch:enableRotation(pivot)
  //
  // Enable rotation freedom. Mix it with other enabled freedoms.
  //
  // Parameters:
  //   pivot
  //     optional Point. The rotation is allowed only around this point.
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
      nextType = 'R'
      nextPivot = (pivot || item.atAnchor())
      break
    case 'T':
      nextType = (pivot ? 'R' : 'TR')
      nextPivot = (pivot || null)
      break
    case 'S':
      nextType = (hasPivot ? 'SR' : 'TSR')
      nextPivot = (pivot || freedom.pivot || null)
      break
    case 'R':
      nextType = (hasPivot ? 'R' : 'TR')
      nextPivot = (pivot || freedom.pivot || null)
      break
    case 'TS':
      nextType = (pivot ? 'SR' : 'TSR')
      nextPivot = (pivot || null)
      break
    case 'TR':
      nextType = (pivot ? 'R' : 'TR')
      nextPivot = (pivot || null)
      break
    case 'SR':
      nextType = (hasPivot ? 'SR' : 'TSR')
      nextPivot = (pivot || freedom.pivot || null)
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
