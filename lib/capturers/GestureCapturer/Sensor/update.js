module.exports = function (opts) {
  // @Sensor:update(opts)
  //
  // Update Sensor options on the fly.
  //
  // Parameters
  //   opts
  //     preventDefault, optional boolean
  //
  this.options = Object.assign({
    preventDefault: this.options.preventDefault
  }, opts)
}
