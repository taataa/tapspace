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

  const hasCenter = (
    typeof center === 'object' &&
    typeof freedom.center === 'object'
  )

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
      nextType = (hasCenter ? 'SR' : 'TSR')
      nextCenter = (center || freedom.center || null)
      break
    case 'R':
      nextType = (hasCenter ? 'R' : 'TR')
      nextCenter = (center || freedom.center || null)
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
      nextType = (hasCenter ? 'SR' : 'TSR')
      nextCenter = (center || freedom.center || null)
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
