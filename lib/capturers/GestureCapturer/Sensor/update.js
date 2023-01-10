module.exports = function (opts) {
  // @Sensor:update(opts)
  //
  // Update Sensor options on the fly.
  //
  // Parameters
  //   opts
  //     preventDefault, optional boolean
  //     stopPropagation, optional boolean
  //
  this.options = Object.assign({
    preventDefault: this.options.preventDefault,
    stopPropagation: this.options.stopPropagation
  }, opts)
}
