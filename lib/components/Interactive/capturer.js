const capturers = require('../../capturers')
const throttle = require('throttle-debounce').throttle

module.exports = function (capturerName, opts) {
  // @Interactive:capturer(capturerName, opts)
  //
  // Get or create an input capturer.
  // For Tapspace internal use.
  //
  // Parameters:
  //   capturerName
  //     a string. One of 'gesture', 'keyboard', 'resize', 'wheel'
  //   opts
  //     options for the capturer.
  //
  // Returns
  //   a capturer
  //

  // Get if active.
  const runningCap = this.capturers[capturerName]
  if (runningCap) {
    // Capturer active.
    // If options were given, update the options.
    if (opts) {
      runningCap.update(opts)
    }
    return runningCap
  }

  // Capturer is not active. Create the capturer.
  const Capturer = capturers[capturerName]

  if (!Capturer) {
    throw new Error('Unknown capturer: ' + capturerName)
  }

  const newCap = new Capturer(this, opts)
  this.capturers[capturerName] = newCap

  const self = this
  const throttleIdle = throttle(500, () => {
    self.emit('idle')
  }, { noLeading: true })

  // Begin tracking for idle event
  switch (capturerName) {
    case 'gesture':
      newCap.on('gestureend', throttleIdle)
      newCap.on('gesturecancel', throttleIdle)
      break
    case 'resize':
      newCap.on('resize', throttleIdle)
      break
    case 'wheel':
      newCap.on('wheel', throttleIdle)
      break
    default:
      break
  }

  return newCap
}
