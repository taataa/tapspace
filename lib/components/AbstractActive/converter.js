const converters = {
  mouse: require('./converters/MouseConverter')
}

module.exports = function (converterName, opts) {
  // @Interactive:capturer(capturerName, opts)
  //
  // Get or create an input converter.
  // The converters modify or redirect input events.
  // For Tapspace internal use.
  //
  // Parameters:
  //   converterName
  //     a string. One of 'mouse'
  //   opts
  //     options for the converter.
  //
  // Returns
  //   a converter
  //

  // Get if active.
  const runningCap = this.converters[converterName]
  if (runningCap) {
    // Converter active
    return runningCap
  }

  // Converter is not active. Create the converter.
  const Converter = converters[converterName]
  if (Converter) {
    const newConv = new Converter(this, opts)
    this.converters[converterName] = newConv
    return newConv
  }

  throw new Error('Unknown converter: ' + converterName)
}
