module.exports = function (key) {
  // @Component:followLink(key)
  //
  // Get link target.
  //
  // Parameters:
  //   key
  //     a string
  //
  // Return
  //   a Component or null
  //

  const target = this.links[key]

  if (target) {
    return target
  }

  return null
}
