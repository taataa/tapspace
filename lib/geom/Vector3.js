var Vector = require('./Vector')

var Vector3 = function (x, y, z) {
  if (typeof x === 'object') {
    z = x.z
    y = x.y
    x = x.x
  } else {
    if (typeof x !== 'number' ||
        typeof y !== 'number' ||
        typeof z !== 'number') {
      throw new Error('Missing or invalid z parameter')
    }
  }

  this.x = x
  this.y = y
  this.z = z
}

Vector3.create = (x, y, z) => {
  return new Vector3(x, y, z)
}

var proto = Vector3.prototype

proto.add = (vec3) => {
  return new Vector3(
    this.x + vec3.x,
    this.y + vec3.y,
    this.z + vec3.z
  )
}

proto.subtract = function (vec3) {
  return new Vector3(
    this.x - vec3.x,
    this.y - vec3.y,
    this.z - vec3.z
  )
}

proto.toVector = function (pivot) {
  // Convert to 2D by projecting depth z by taking pivot as a vanishing point.
  //
  if (typeof pivot === 'undefined') {
    pivot = { x: 0, y: 0 }
  }
  // Perspective scale
  var scaleFactor = 1 / Math.pow(2, this.z)
  // Make vector
  var v = new Vector(this.x, this.y)
  // Scale it
  return v.scale(scaleFactor, pivot)
}

module.exports = Vector3
