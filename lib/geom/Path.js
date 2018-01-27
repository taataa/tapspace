//
// Immutable container for Vectors
//
var Vector = require('./Vector')
var EPSILON = require('./Transform').EPSILON
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

proto.almostEqual = function (p) {
  // Test if two paths are equal
  if (this._seg.length === p._seg.length) {
    for (var i = 0; i < this._seg.length; i += 1) {
      if (!this._seg[i].almostEqual(p._seg[i])) {
        return false
      }
    }
    return true
  }
  return false
}

proto.atMid = function () {
  // Mass centroid of the closed path.
  // The result is valid only if the path is non-self-intersecting.
  //
  // Return
  //   Vector
  //   null
  //     if empty path
  //
  // Source:
  //   https://en.wikipedia.org/wiki/Centroid
  //   2018-01-16
  //
  var i, d
  var s = this._seg
  var cx = 0
  var cy = 0
  var area = 0

  if (s.length === 0) {
    return null
  }

  if (s.length === 1) {
    return this._seg[0]
  }

  for (i = 0; i + 1 < s.length; i += 1) {
    d = (s[i].x * s[i + 1].y) - (s[i + 1].x * s[i].y)
    cx += (s[i].x + s[i + 1].x) * d
    cy += (s[i].y + s[i + 1].y) * d
    area += d
  }

  // Close the path
  // i + 1 === s.length
  d = (s[i].x * s[0].y - s[0].x * s[i].y)
  cx += (s[i].x + s[0].x) * d
  cy += (s[i].y + s[0].y) * d
  area += d

  // Area might be zero. For example, consider lines.
  // If so, return mean of points.
  if (Math.abs(area) < EPSILON) {
    cx = 0
    cy = 0
    for (i = 0; i < s.length; i += 1) {
      cx += s[i].x
      cy += s[i].y
    }
    return new Vector(cx / s.length, cy / s.length)
  }

  // Normalize
  area *= 0.5
  cx *= 1 / (6 * area)
  cy *= 1 / (6 * area)

  return new Vector(cx, cy)
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

proto.equal =
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

proto.get = function (i) {
  // Get i:th element
  return this._seg[i]
}

proto.getBounds = function () {
  // Get bounding box of the path.
  // Return rectangular Path with following path segment vectors.
  //
  // [0]-----[3]
  //  |       |
  // [1]-----[2]
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
    new Vector(minx, maxy),
    new Vector(maxx, maxy),
    new Vector(maxx, miny)
  ])
}

proto.getHull = function () {
  // Get convex hull of the path. Counter-clockwise.
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

  // The convexHull returns the points in clockwise order
  // but assumes positive y to head up. In web browsers,
  // positive y heads down and thus convexHull returns
  // them in counterclockwise order.
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
