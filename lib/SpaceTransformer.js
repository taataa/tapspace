
var InvariantTransform = require('./InvariantTransform')
var SpacePlane = require('./SpacePlane')
var Transform = require('./Transform')
var extend = require('extend')

var SpaceTransformer = function (plane) {
  // Upgrades SpacePlane to SpaceTransformer
  //
  // Parameters
  //   plane
  //     a SpacePlane
  //
  SpacePlane.call(this)

  this.on('removed', function (self, newParent, oldParent) {
    // Ensure that root nodes have strict identity transformation.
    // If SpaceNode was just moved to a new parent, preserve transformation.
    //
    // Dev. notes:
    //   Should we maintain global location?
    //   Why? To make it easy to attach to view temporarily.
    //   On the other hand, same relative location would be convenient
    //   when moving subelements from group to another.
    //   Would it be easier to do explicitly:
    //     gt = taa.getGlobalTransform()
    //     taa.setParent(foo)
    //     taa.setGlobalTransform(gt)
    //   Yes it would. Therefore, do not maintain global location!

    if (typeof oldParent === 'undefined') { oldParent = null }
    if (typeof newParent === 'undefined') { newParent = null }

    if (newParent === null) {
      // Root nodes cannot be moved.
      //
      // Previously .resetTransform call was used but it unnecessarily
      // emitted 'transformed' event.
      this._T = Transform.IDENTITY
    } else {
      // Assert: removed from null parent?
      if (oldParent === null) {
        throw new Error('Could not be removed from null parent')
      }
    }
  })
}

var p = extend({}, SpacePlane.prototype)
SpaceTransformer.prototype = p

p.resetTransform = function () {
  // Reset transform to identity.
  this._T = Transform.IDENTITY
  this.emit('transformed', this)
}

p.setLocalTransform = function (itr) {
  // Set the transformation of the plane relative to its parent.
  // The effect of the new transformation on _the parent_ is equal to
  // the effect of the given transformation on the space. For example,
  // if the parents are 100x scaled, so is the effect. If want the equal
  // effect regardless the ancestors, use setGlobalLocalTransform.
  //
  // This method is needed when we whan to restore stored position,
  // maybe after modification.
  //
  // Parameters:
  //   itr
  //     InvariantTransform
  //

  // If we are root, cannot set.
  if (this._parent === null) { return }

  this._T = itr.toSpace()
  this.emit('transformed', this)
}

p.setGlobalLocalTransform = function (itr) {
  // Set the transformation of the plane regarding the global transformation
  // of the plane.
  // For example, if the ancestors of the plane produce 100x scaling,
  // then the local effect of the given transformation is 100 times smaller,
  // while the global effect stays the same. In practise, this method
  // preserves the effect on view regardless the planes.
  //
  // Parameters:
  //   itr
  //     InvariantTransform
  //
  // Returns:
  //   this
  //     Because chainable
  //

  // If we are root, cannot set.
  if (this._parent === null) { return }

  this._T = itr.to(this._parent)
  this.emit('transformed', this)

  return this
}

p.setGlobalTransform = function (itr) {
  // Set local transform so that the global transform of the plane becomes
  // equal to the given InvariantTransform. For example, let T be 2x scaling
  // and P a SpacePixel on a 100x upscaled plane. Then P.setGlobalTransform(T)
  // updates P's local transform to 0.02x scaling.
  //
  // Dev note:
  //   Let T be coord. transf. from the plane to root (space).
  //   So is this._T.
  //   current_glob_trans = parent_glob_trans * this_T
  //
  //   new_glob_trans = parent_glob_trans * X
  //   <=> X = inv(parent_glob_trans) * new_glob_trans

  // If we are root, cannot set.
  if (this._parent === null) { return }

  // pgt is mapping from the plane to space.
  var pgt = this._parent.getGlobalTransform().toSpace()
  this._T = pgt.inverse().multiplyBy(itr.toSpace())

  this.emit('transformed', this)

  return this
}

p.transformBy = function (itr, plane) {
  // Apply an InvariantTransform to the node's local transform.
  // By default, itr is first represented on the parent's coordinate plane.
  // If you want to appy the effect the itr has on another plane,
  // you can specify the plane.
  //
  // Parameters:
  //   itr
  //     InvariantTransform
  //   plane
  //     Optional SpacePlane. Default to the parent plane. Provide if
  //     you want to apply the effect the itr has on a plane
  //     different from the parent. Null equals space.
  //
  // Emits
  //   transformed
  //
  // Return
  //   this
  //     To make chainable
  //

  // If we are root, cannot set.
  if (this._parent === null) { return }
  if (typeof plane === 'undefined') {
    plane = this._parent
  }

  this._T = itr.to(plane).multiplyBy(this._T)
  this.emit('transformed', this)

  return this
}

p.translate = function (domain, range) {
  // Move plane horizontally and vertically by example.
  //
  // Translate the plane so that after the translation, the domain points
  // would be as close to given range points as possible.
  //
  // Parameters: see InvariantTransform.prototype.translate
  var st = InvariantTransform.estimate('T', domain, range)
  return this.transformBy(st)
}

p.scale = function (pivot, multiplierOrDomain, range) {
  // Parameters: see InvariantTransform.prototype.scale
  var st = InvariantTransform.IDENTITY.scale(pivot, multiplierOrDomain, range)
  return this.transformBy(st)
}

p.rotate = function (pivot, radiansOrDomain, range) {
  // Parameters: see InvariantTransform.prototype.rotate
  var st = InvariantTransform.IDENTITY.rotate(pivot, radiansOrDomain, range)
  return this.transformBy(st)
}

p.translateScale = function (domain, range) {
  // Parameters: see InvariantTransform.prototype.translateScale
  var st = InvariantTransform.estimate('TS', domain, range)
  return this.transformBy(st)
}

p.translateRotate = function (domain, range) {
  // Parameters: see InvariantTransform.prototype.translateRotate
  var st = InvariantTransform.estimate('TR', domain, range)
  return this.transformBy(st)
}

p.scaleRotate = function (pivot, domain, range) {
  // Parameters: see InvariantTransform.prototype.scaleRotate
  var st = InvariantTransform.estimate('SR', domain, range, pivot)
  return this.transformBy(st)
}

p.translateScaleRotate = function (domain, range) {
  // Parameters: see InvariantTransform.prototype.translateScaleRotate
  var st = InvariantTransform.estimate('TSR', domain, range)
  return this.transformBy(st)
}

// plane.translateAndScaleToFit, not sure if necessary for now

module.exports = SpaceTransformer
