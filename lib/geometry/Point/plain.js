module.exports = function () {
  // tapspace.geometry.Point:plain()
  //
  // Return plain point3 object {x,y,z} without basis data.
  //
  return {
    x: this.x,
    y: this.y,
    z: this.z
  }
}
