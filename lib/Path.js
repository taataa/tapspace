//
// Immutable container for Vectors
//
var Vector = require('./Vector')
var convexHull = require('monotone-convex-hull-2d')

var Path = function (segments) {
  if (typeof segments === 'undefined') {
    segments = []
  }
  this._seg = segments
  this.length = segments.length
}

var proto = Path.prototype

proto.add = function (p) {
  // Parameters:
  //   path
  //  OR
  //   vector
  //
  // Return
  //   new Path

  if (p.hasOwnProperty('_seg')) {
    // Path
    return new Path(this._seg.concat(p._seg))
  } else if (p.hasOwnProperty('x')) {
    // Vector
    return new Path(this._seg.concat([p]))
  }

  throw new Error('Invalid Path or Vector')
}

proto.get = function (i) {
  // Get i:th element
  return this._seg[i]
}

proto.bottom = function () {
  var maxv, i

  if (this._seg.length === 0) {
    return null
  }

  maxv = this._seg[0]

  for (i = 1; i < this._seg.length; i += 1) {
    if (this._seg[i].y > maxv.y) {
      maxv = this._seg[i]
    }
  }

  return maxv
}

proto.getBounds = function () {
  // Get bounding box of the path.
  // Return rectangular Path with following path segment vectors.
  //
  // [0]-----[1]
  //  |       |
  // [3]-----[2]
  //
  var minx, miny, maxx, maxy, i, v

  if (this._seg.length === 0) {
    return null
  }

  v = this._seg[0]
  minx = v.x
  miny = v.y
  maxx = v.x
  maxy = v.y

  for (i = 1; i < this._seg.length; i += 1) {
    v = this._seg[i]
    minx = Math.min(minx, v.x)
    miny = Math.min(miny, v.y)
    maxx = Math.max(maxx, v.x)
    maxy = Math.max(maxy, v.y)
  }

  return new Path([
    new Vector(minx, miny),
    new Vector(maxx, miny),
    new Vector(maxx, maxy),
    new Vector(minx, maxy)
  ])
}

proto.equals = function (p) {
  // Test if two paths are equal
  if (this._seg.length === p._seg.length) {
    for (var i = 0; i < this._seg.length; i += 1) {
      if (!this._seg[i].equals(p._seg[i])) {
        return false
      }
    }
    return true
  }
  return false
}

proto.first = function () {
  if (this._seg.length > 0) {
    return this._seg[0]
  }
  return null
}

proto.getHull = function () {
  // Get convex hull of the path
  //
  // Return
  //   a Path
  //
  if (this._seg.length < 1) {
    return this
  }

  var indices = convexHull(this._seg.map(function (vec) {
    return vec.toArray()
  }))

  var seq = indices.map(function (i) {
    return this._seg[i]
  }, this)

  return new Path(seq)
}

proto.last = function () {
  if (this._seg.length > 0) {
    return this._seg[this._seg.length - 1]
  }
  return null
}

proto.left = function () {
  // Leftmost seqment Vector. Return first leftmost if many.
  var minv, i

  if (this._seg.length === 0) {
    return null
  }

  minv = this._seg[0]

  for (i = 1; i < this._seg.length; i += 1) {
    if (this._seg[i].x < minv.x) {
      minv = this._seg[i]
    }
  }

  return minv
}

proto.right = function () {
  var maxv, i

  if (this._seg.length === 0) {
    return null
  }

  maxv = this._seg[0]

  for (i = 1; i < this._seg.length; i += 1) {
    if (this._seg[i].x > maxv.x) {
      maxv = this._seg[i]
    }
  }

  return maxv
}

proto.toArray = function () {
  return this._seg
}

proto.top = function () {
  var minv, i

  if (this._seg.length === 0) {
    return null
  }

  minv = this._seg[0]

  for (i = 1; i < this._seg.length; i += 1) {
    if (this._seg[i].y < minv.y) {
      minv = this._seg[i]
    }
  }

  return minv
}

proto.transform = function (tr) {
  // Multiply the Path segment vectors from left
  //
  // Parameters:
  //   tr
  //     a Transform
  //
  // Return
  //   new Path
  //
  var seg = this._seg.map(function (vec) {
    return vec.transform(tr)
  })
  return new Path(seg)
}

module.exports = Path
