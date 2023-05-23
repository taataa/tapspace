module.exports = function (key) {
  // @Component:hasLink(key)
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
