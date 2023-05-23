module.exports = function (key) {
  // @BasisComponent:hasLink(key)
  //
  // Parameters:
  //   key
  //     a string
  //
  // Return
  //   a boolean
  //
  return key in this.links
}
