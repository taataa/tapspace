module.exports = function (center) {
  // tapspace.interaction.Pinch:enableDilation(center)
  //
  // Enable scaling freedom. Mix it with other enabled freedoms.
  //
  // Parameters:
  //   center
  //     optional Point
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
      nextType = (center ? 'S' : 'TS')
      nextCenter = (center || null)
      break
    case 'T':
      nextType = (center ? 'S' : 'TS')
      nextCenter = (center || null)
      break
    case 'S':
      nextType = 'S'
      nextCenter = (center || freedom.center) // replace or preserve
      break
    case 'R':
      nextType = 'SR'
      nextCenter = (center || freedom.center) // replace or preserve
      break
    case 'TS':
      nextType = (center ? 'S' : 'TS')
      nextCenter = (center || null)
      break
    case 'TR':
      nextType = (center ? 'SR' : 'TSR')
      nextCenter = (center || null)
      break
    case 'SR':
      nextType = 'SR'
      nextCenter = (center || freedom.center) // replace or preserve
      break
    case 'TSR':
      nextType = (center ? 'SR' : 'TSR')
      nextCenter = (center || null)
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
