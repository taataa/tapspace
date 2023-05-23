module.exports = function (key) {
  // @BasisComponent:followLink(key)
  //
  // Get link target.
  //
  // Parameters:
  //   key
  //     a string
  //
  // Return
  //   a BasisComponent or null
  //
  
  const target = this.links[key]

  if (target) {
    return target
  }

  return null
}
