/*
Manager

Handles integration to Tapspace and higher level events such as tap event.

Keep all tapspace-related stuff in Manager.
Keep Recognizer compatible with all html elements.

Notes
  [1] For press event detection, we can place a threshold how far
      we allow fingers to move to still classify it as a press.
*/
var Recognizer = require('./Recognizer')
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
  // to Recognizer, it looks like the parameter was not given.
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

var Manager = function (element, plane, view, emitter, mode) {
  // Create a Manager
  //   var man = new Manager(...)
  //
  // Parameters:
  //   element
  //     HTML element to listen to
  //   plane
  //     a tapspace.AbstractPlane, the object to move
  //   view
  //     a tapspace.SpaceView
  //   emitter
  //     public emitter the user listens to
  //   mode
  //     a transformation type
  //
  var self = this

  this.mode = mode
  this.plane = plane
  this.view = view

  var startTime = null
  var totalTravel = null
  var pointersOnItem = {}

  var onStart = function (firstPointers) {
    startTime = Date.now()
    totalTravel = 0

    pointersOnItem = rebase(firstPointers, view, plane)

    emitter.emit('gesturestart', {
      distance: 0,
      duration: 0,
      element: element,
      item: self.plane
    })
  }

  var onMove = function (prevPointers, nextPointers) {
    var k, n, pivot, type, tr, oldT
    var domain = []
    var range = []

    // Current location of new pointers on the plane.
    // This approach zeroes the effects caused by
    // 1) transformations of the view
    // 2) transformations of the parents of the plane
    var nextPointersOnItem = rebase(nextPointers, view, plane)

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
    pivot = toRawPivot(self.mode, self.plane)
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
    if (self.view === self.plane) {
      // Somehow we do not need the following line with views:
      // pointersOnItem = multiplyLeft(nextPointersOnItem, tr)
      // If we use the line, everything shakes.
      pointersOnItem = nextPointersOnItem
      // Shortcut for:
      //   itr = new tapspace.geom.ITransform(tr, plane)
      //   plane.transformBy(itr.inverse())
      // Why? See below.
      oldT = plane._T
      plane._T = plane._T.multiplyRight(tr.inverse())
      plane.emit('transformed', {
        source: plane,
        newTransform: plane._T,
        oldTransform: oldT
      })
    } else {
      pointersOnItem = multiplyLeft(nextPointersOnItem, tr.inverse())
      // We cannot depend on tapspace.
      // Therefore we must find a shortcut for:
      //   itr = new tapspace.geom.ITransform(tr, plane)
      //   plane.transformBy(itr)
      // <=>
      //   itr._tr = getTrOnPlane(tr, plane.getGlobalTransform().toSpace())
      //   plane._T = itr.to(plane._parent).multiplyRight(plane._T)
      // <=>
      //   gt = plane.getGlobalTransform().toSpace()
      //   itr._tr = gt.multiplyBy(tr.multiplyBy(gt.inverse()))
      //   pt = itr.to(plane._parent)
      //   plane._T = pt.multiplyRight(plane._T)
      // <=>
      //   gt = plane._parent._parent._T * plane._parent._T * plane._T
      //   itr._tr = gt * tr * inv(gt)
      //   covTr = plane._parent.getGlobalTransform().toSpace().inverse()
      //   pt = getTrOnPlane(itr._tr, covTr)
      //   next.plane._T = pt * plane._T
      // <=>
      //   gt = plane._parent._parent._T * plane._parent._T * plane._T
      //   itr._tr = gt * tr * inv(gt)
      //   covTr = inv(plane._parent._parent._T * plane._parent._T)
      //   pt = covTr * itr._tr * inv(covTr)
      //   next.plane._T = pt * plane_T
      // <=>
      //   gt = ppT * pT * T
      //   R = gt * tr * inv(gt)
      //   C = inv(ppT * pT)
      //   pt = C * R * inv(C)
      //   next.T = pt * T
      // <=>
      //   R = ppT * pT * T * tr * inv(ppT * pT * T)
      //   pt = inv(ppT * pT) * R * inv(inv(ppT * pT))
      //   next.T = pt * T
      // <=>
      //   R = ppT * pT * T * tr * inv(T) * inv(pT) * inv(ppT)
      //   next.T = inv(pT) * inv(ppT) * R * ppT * pT * T
      // <=>
      //   next.T = T * tr * inv(T) * inv(pT) * inv(ppT) * ppT * pT * T
      // <=>
      //   next.T = T * tr
      oldT = plane._T
      plane._T = plane._T.multiplyRight(tr)
      plane.emit('transformed', {
        source: plane,
        newTransform: plane._T,
        oldTransform: oldT
      })
    }

    emitter.emit('gesturemove', {
      distance: totalTravel,
      duration: Date.now() - startTime,
      element: element,
      item: self.plane
    })
  }

  var onEnd = function (lastPointers) {
    emitter.emit('gestureend', {
      distance: totalTravel,
      duration: Date.now() - startTime,
      element: element,
      item: self.plane
    })

    pointersOnItem = {}

    if (mode.tap && totalTravel < mode.tapMaxTravel) {
      emitter.emit('tap', {
        distance: totalTravel,
        duration: Date.now() - startTime,
        element: element,
        item: self.plane
      })
    }
  }

  this.recognizer = new Recognizer(element, {
    start: onStart,
    move: onMove,
    end: onEnd
  }, this.mode.propagate)
}

Manager.prototype.update = function (mode) {
  this.mode = mode
  this.recognizer.setPropagation(this.mode.propagate)
}

Manager.prototype.destroy = function () {
  this.recognizer.destroy()
}

module.exports = Manager
