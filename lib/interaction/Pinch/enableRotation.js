module.exports = function (center) {
  // tapspace.interaction.Pinch:enableRotation(center)
  //
  // Enable rotation freedom. Mix it with other enabled freedoms.
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
      nextType = 'R'
      nextCenter = (center || item.atAnchor())
      break
    case 'T':
      nextType = (center ? 'R' : 'TR')
      nextCenter = (center || null)
      break
    case 'S':
      nextType = 'SR'
      nextCenter = (center || freedom.center)
      break
    case 'R':
      nextType = 'R'
      nextCenter = (center || freedom.center)
      break
    case 'TS':
      nextType = (center ? 'SR' : 'TSR')
      nextCenter = (center || null)
      break
    case 'TR':
      nextType = (center ? 'R' : 'TR')
      nextCenter = (center || null)
      break
    case 'SR':
      nextType = 'SR'
      nextCenter = (center || freedom.center)
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
