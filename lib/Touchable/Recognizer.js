/*
Recognizer

Handles integration to Tapspace and higher level events such as tap event.

Keep all tapspace-related stuff in Recognizer.
Keep Sensor compatible with all html elements.

Notes
  [1]
    For press event detection, we can place a threshold how far
    we allow fingers to move to still classify it as a press.
  [2]
    Find a shortcut for:
      itr = new tapspace.geom.ITransform(tr, plane)
      plane.transformBy(itr)
    <=>
      itr._tr = getTrOnPlane(tr, plane.getGlobalTransform().toSpace())
      plane._T = itr.to(plane._parent).multiplyRight(plane._T)
    <=>
      gt = plane.getGlobalTransform().toSpace()
      itr._tr = gt.multiplyBy(tr.multiplyBy(gt.inverse()))
      pt = itr.to(plane._parent)
      plane._T = pt.multiplyRight(plane._T)
    <=>
      gt = plane._parent._parent._T * plane._parent._T * plane._T
      itr._tr = gt * tr * inv(gt)
      covTr = plane._parent.getGlobalTransform().toSpace().inverse()
      pt = getTrOnPlane(itr._tr, covTr)
      next.plane._T = pt * plane._T
    <=>
      gt = plane._parent._parent._T * plane._parent._T * plane._T
      itr._tr = gt * tr * inv(gt)
      covTr = inv(plane._parent._parent._T * plane._parent._T)
      pt = covTr * itr._tr * inv(covTr)
      next.plane._T = pt * plane_T
    <=>
      gt = ppT * pT * T
      R = gt * tr * inv(gt)
      C = inv(ppT * pT)
      pt = C * R * inv(C)
      next.T = pt * T
    <=>
      R = ppT * pT * T * tr * inv(ppT * pT * T)
      pt = inv(ppT * pT) * R * inv(inv(ppT * pT))
      next.T = pt * T
    <=>
      R = ppT * pT * T * tr * inv(T) * inv(pT) * inv(ppT)
      next.T = inv(pT) * inv(ppT) * R * ppT * pT * T
    <=>
      next.T = T * tr * inv(T) * inv(pT) * inv(ppT) * ppT * pT * T
    <=>
      next.T = T * tr

*/
var Sensor = require('./Sensor')
var utils = require('./utils')
var nudged = require('nudged')

var toRawPivot = function (mode, plane) {
  // The pivot needs to be converted to [x, y]
  // on plane's coordinate plane.
  //
  if (mode.pivot) {
    return mode.pivot.to(plane).toArray()
  }

  // Use middle of plane as a default pivot if translation not allowed.
  if (mode.translate === false) {
    return plane.atMid().to(plane).toArray()
  }

  // Return undefined so that when rawPivot is given as a parameter
  // to Sensor, it looks like the parameter was not given.
}

var rebase = function (pointers, sourcePlane, targetPlane) {
  // Represent pointers on another AbstractPlane
  //
  // Parameters
  //   pointers
  //     a map: id -> [x, y]
  //   sourcePlane
  //     a AbstractPlane of the pointers
  //   targetPlane
  //     a AbstractPlane of the returned pointers
  //
  if (sourcePlane === targetPlane) {
    return pointers
  }

  var k
  var result = {}
  var sourceToSpace = sourcePlane.getGlobalTransform()
  var targetToSpace = targetPlane.getGlobalTransform()
  var sourceToTarget = targetToSpace.inverse().multiplyRight(sourceToSpace)
  for (k in pointers) {
    if (pointers.hasOwnProperty(k)) {
      result[k] = sourceToTarget.transform(pointers[k])
    }
  }
  return result
}

var multiplyLeft = function (pointers, transform) {
  // Transform pointers. Regard pointers as a row vector
  // of column vectors. Multiply each column vector from left by
  // a transformation matrix.
  var k
  var result = {}
  for (k in pointers) {
    if (pointers.hasOwnProperty(k)) {
      result[k] = transform.transform(pointers[k])
    }
  }
  return result
}

var Recognizer = function (manager) {
  // Create a Recognizer
  //   var rec = new Recognizer(...)
  //
  // Parameters:
  //   manager
  //     Touchable with the following properties
  //       element
  //         HTML element to listen to
  //       item
  //         a tapspace.AbstractPlane, the object to move
  //       view
  //         a tapspace.SpaceView
  //       mode
  //         a transformation type
  //
  var self = this

  this.man = manager

  var startTime = null
  var totalTravel = null
  var pointersOnItem = {}

  var onStart = function (firstPointers) {
    var item = self.man.targetItem
    var view = self.man.view
    var el = self.man.element

    startTime = Date.now()
    totalTravel = 0

    pointersOnItem = rebase(firstPointers, view, item)

    self.man.emit('gesturestart', {
      distance: 0,
      duration: 0,
      element: el,
      item: item
    })
  }

  var onMove = function (prevPointers, nextPointers) {
    var k, n, pivot, type, tr, newT
    var domain = []
    var range = []
    var el = self.man.element
    var view = self.man.view
    var item = self.man.targetItem
    var mode = self.man.mode

    // Current location of new pointers on the plane.
    // This approach zeroes the effects caused by
    // 1) transformations of the view
    // 2) transformations of the parents of the plane
    var nextPointersOnItem = rebase(nextPointers, view, item)

    // Set intersection. Do not use removed or appeared pointers
    // in estimation.
    for (k in pointersOnItem) {
      if (pointersOnItem.hasOwnProperty(k) &&
          nextPointersOnItem.hasOwnProperty(k)) {
        domain.push(pointersOnItem[k])
        range.push(nextPointersOnItem[k])
      }
    }

    // Accumulate to travelled distance. See [1]
    // Use Manhattan distance for simpler computation.
    // Goal is to form a threshold to filter out small
    // involuntary movement of the fingers or arm.
    //
    // N. Divide distance by number of fingers. This way
    // an involuntary arm movement has same threshold regardless of
    // the number of touching fingers.
    //
    // Note that we compute travel on view instead of travel on
    // the plane. This way travel does not depend on transformations
    // of the space, but only the screen pixels.
    n = domain.length
    for (k in prevPointers) {
      if (prevPointers.hasOwnProperty(k) && nextPointers.hasOwnProperty(k)) {
        totalTravel += Math.abs(prevPointers[k][0] - nextPointers[k][0]) / n
        totalTravel += Math.abs(prevPointers[k][1] - nextPointers[k][1]) / n
      }
    }

    // Compute current position of the pivot on the plane.
    // Pivot will be undefined if mode has no pivot but enables translation.
    pivot = toRawPivot(mode, item)
    // Get current nudged-compatible transformation type string
    type = utils.convertToTransformationType(mode)

    // Estimate optimal transformation
    tr = nudged.estimate(type, domain, range, pivot)

    // Apply the transformation to plane. We also
    // memorize the new pointers for the next onMove call.
    // We want to memorize only their relative location on the plane.
    // This way transformations of the view and parents between
    // onMove calls become part of the resulting transformation.
    // Note that transformBy emits 'transformed' that might eventually
    // cause transformations in the space. Therefore we should do all
    // coordinate-plane conversions before transformBy to avoid weird bugs.
    if (view === item) {
      // Somehow we do not need the following line with views:
      // pointersOnItem = multiplyLeft(nextPointersOnItem, tr)
      // If we use the line, everything shakes.
      pointersOnItem = nextPointersOnItem
      // Shortcut for:
      //   itr = new tapspace.geom.ITransform(tr, plane)
      //   plane.transformBy(itr.inverse())
      // Why? See below.
      newT = item._T.multiplyRight(tr.inverse())
      item.setLocalTransform(newT)
    } else {
      pointersOnItem = multiplyLeft(nextPointersOnItem, tr.inverse())
      // Shortcut for (see [2] for full derivation):
      //  itr = new tapspace.geom.ITransform(tr, plane)
      //  plane.transformBy(itr)
      // <=> next.T = T * tr
      newT = item._T.multiplyRight(tr)
      item.setLocalTransform(newT)
    }

    self.man.emit('gesturemove', {
      distance: totalTravel,
      duration: Date.now() - startTime,
      element: el,
      item: item
    })
  }

  var onEnd = function (lastPointers) {
    var el = self.man.element
    var item = self.man.targetItem
    var mode = self.man.mode

    self.man.emit('gestureend', {
      distance: totalTravel,
      duration: Date.now() - startTime,
      element: el,
      item: item
    })

    pointersOnItem = {}

    if (mode.tap && totalTravel < mode.tapMaxTravel) {
      self.man.emit('tap', {
        distance: totalTravel,
        duration: Date.now() - startTime,
        element: el,
        item: item
      })
    }
  }

  // Handlers defined, construct sensor
  this.sensor = new Sensor(this.man.element, {
    start: onStart,
    move: onMove,
    end: onEnd
  }, this.man.mode)
}

Recognizer.prototype.update = function (mode) {
  this.sensor.update(mode)
}

Recognizer.prototype.destroy = function () {
  this.sensor.destroy()
}

module.exports = Recognizer
