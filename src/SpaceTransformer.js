// API v3.0.0
var nudged = require('nudged');
var Transform = require('./Transform');
var SpacePoint = require('./SpacePoint');
var SpaceTransform = require('./SpaceTransform');


var SpaceTransformer = function (plane) {
  // Upgrades SpacePlanes to SpaceTransformers
  //
  // Parameters
  //   plane
  //     a SpacePlane

  plane.setTransform = function (T) {
    // Needed when we whan to restore stored position, maybe after
    // modification.
    if (this._parent === null) {
      // We are root, cannot set.
      return;
    }
    this._T = T;
    this.emit('transformed', this);
  };

  plane.setGlobalTransform = function (T) {
    // Set local transform so that the global transform becomes the given T.
    //
    // Dev note:
    //   Given T is coord. transf. from the plane to root (space).
    //   So is this._T.
    //   current_glob_trans = parent_glob_trans * this_T
    //   new_glob_trans = parent_glob_trans * X
    //   <=> X = inv(parent_glob_trans) * new_glob_trans
    if (this._parent === null) {
      // We are root, cannot set.
      return;
    }
    var parent_global = this._parent.getGlobalTransform();
    this._T = parent_global.inverse().multiplyBy(T);
    this.emit('transformed', this);
  };

  plane.transformBy = function (spaceTransform) {
    // Apply a SpaceTransform to the node.
    // Root nodes cannot be transformed.

    if (this._parent === null) {
      // We are root, cannot set.
      return;
    }
    // Convert on parent plane so we can multiply.
    var normST = spaceTransform.to(this._parent);
    this._T = normST.T.multiplyBy(this._T);
    this.emit('transformed', this);
  };

  plane.translate = function (domain, range) {
    // Move plane horizontally and vertically by example.
    //
    // Translate the plane so that after the translation, the domain points
    // would be as close to given range points as possible.
    //
    // Parameters: see SpaceTransform.prototype.translate
    var st = SpaceTransform.estimate(this, 'T', domain, range);
    this.transformBy(st);
  };

  plane.scale = function (pivot, multiplierOrDomain, range) {
    // Parameters: see SpaceTransform.prototype.scale
    var st = new SpaceTransform(this).scale(pivot, multiplierOrDomain, range);
    this.transformBy(st);
  };

  plane.rotate = function (pivot, radiansOrDomain, range) {
    // Parameters: see SpaceTransform.prototype.rotate
    var st = new SpaceTransform(this).rotate(pivot, radiansOrDomain, range);
    this.transformBy(st);
  };

  plane.translateScale = function (domain, range) {
    // Parameters: see SpaceTransform.prototype.translateScale
    var st = SpaceTransform.estimate(this, 'TS', domain, range);
    this.transformBy(st);
  };

  plane.translateRotate = function (domain, range) {
    // Parameters: see SpaceTransform.prototype.translateRotate
    var st = SpaceTransform.estimate(this, 'TR', domain, range);
    this.transformBy(st);
  };

  plane.scaleRotate = function (pivot, domain, range) {
    // Parameters: see SpaceTransform.prototype.scaleRotate
    var st = SpaceTransform.estimate(this, 'SR', domain, range, pivot);
    this.transformBy(st);
  };

  plane.translateScaleRotate = function (domain, range) {
    // Parameters: see SpaceTransform.prototype.translateScaleRotate
    var st = SpaceTransform.estimate(this, 'TSR', domain, range);
    this.transformBy(st);
  };

  // plane.translateAndScaleToFit, not sure if necessary for now

  plane.on('removed', function (self, oldParent, newParent) {
    // Maintain global location

    if (typeof oldParent === 'undefined') { oldParent = null; }
    if (typeof newParent === 'undefined') { newParent = null; }

    var sameRoot;
    if (newParent === null) {
      // Root nodes cannot move.
      this.resetTransform();
    } else {
      if (oldParent === null) {
        // Removed from null parent?
        throw new Exception('Cannot remove from null parent');
      } else {
        // Moved onto another parent.
        // Let us keep the location in space the same if possible.
        // It is possible only if the parents share same root i.e.
        // are in the same space.
        sameRoot = oldParent.getRootParent() === newParent.getRootParent();
        if (sameRoot) {
          // Keep the location.
          // Let
          //   OT be the old local coord. transformation.
          //   NT be the unknown new local coord. transf.
          //   OPGT be the global coord. transf. of old parent
          //   NPGT be the global coord. transf. of new parent
          // Now, we want to keep global transf. unchanged.
          //   OPGT * OT = NPGT * NT
          //   <=> NT = inv(NPGT) * OPGT * OT
          var opgt = oldParent.getGlobalTransform();
          var npgt = newParent.getGlobalTransform();
          var ot = this._T;
          var nt = npgt.inverse().multiplyBy(opgt).multiplyBy(ot);
          this._T = nt;
          this.emit('transformed', this); // TODO Is needed because inplace?
        } else {
          // In different space: reset
          this.resetTransform();
        }
        // Note: there could be a need to change parent with the same
        // local transformation. Not needed for now.
      }

    }
  });
};

module.exports = SpaceTransformer;
