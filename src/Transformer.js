// API v0.2.0
var nudged = require('nudged');
var Transform = require('./Transform');
var SpacePoint = require('./SpacePoint');

var normalize = function (points, plane) {
  // Transform all the points onto the parent and
  // represent them in array [[x0,y0], [x1,y1], ...].
  //
  // Arguments
  //   points, a single spacepoint or a list of spacepoints
  //   plane, a SpacePlane e.g. a SpaceTaa onto normalize.
  // Return
  //   array of xy points in space.
  var i, p, np, normalized;

  if (!Array.isArray(points)) {
    // Single SpacePoint
    p = points;
    np = p.to(plane).xy;
    return [np];
  } // else
  normalized = [];
  for (i = 0; i < points.length; i += 1) {
    p = points[i];
    np = p.to(plane).xy;
    normalized.push(np);
  }
  return normalized;
};


var transformByEstimate = function (plane, type, domain, range, pivot) {
  // Types: T,S,R,TS,TR,SR,TSR (see nudged for further details)

  var normPivot;
  if (typeof pivot !== 'undefined') {
    normPivot = normalize(pivot, plane._parent)[0];
  }

  // Convert all SpacePoints onto the space and to arrays
  var normDomain = normalize(domain, plane._parent);
  var normRange = normalize(range, plane._parent);

  // Then compute optimal transformation in space
  var H_space = nudged.estimate(type, normDomain, normRange, normPivot);
  // See 2016-03-05-11:
  //   To apply transformation to a space object:
  //     T_hat = toParent(H) * T
  // Therefore:
  plane._T = H_space.multiplyBy(plane._T);

  // Notify especially view about transformation.
  plane.emit('transformed', plane);
};


var Transformer = function (plane) {
  //
  // Parameters
  //   plane
  //     a SpaceContainer

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

  plane.translate = function (domain, range) {
    // Move plane horizontally and vertically by example.
    //
    // Translate the plane so that after the translation, the domain points
    // would be as close to given range points as possible.
    //
    // Parameter
    //   domain
    //   range

    transformByEstimate(this, 'T', domain, range);
  };

  plane.scale = function (pivot, multiplierOrDomain, range) {
    // Parameter
    //   pivot, a SpacePoint
    //   multiplier, the scale factor, > 0
    //  OR
    //   pivot
    //   domain
    //   range

    var useMultiplier = (typeof range === 'undefined');

    if (useMultiplier) {
      var normPivot = normalize(pivot, this._parent)[0];
      var multiplier = multiplierOrDomain;
      // Multiplier does not depend on plane.
      // We create a pivoted scaling transform on parent.
      var S_parent = Transform.IDENTITY.scaleBy(multiplier, normPivot);
      // See 2016-03-05-11
      //   We transform space objects by:
      //   T_hat = H_space * T
      this._T = S_parent.multiplyBy(this._T);
      this.emit('transformed', this);
    } else {
      var domain = multiplierOrDomain;
      transformByEstimate(this, 'S', domain, range, pivot);
    }
  };

  plane.rotate = function (pivot, radiansOrDomain, range) {
    // Parameter
    //   pivot
    //   radians
    //  OR
    //   pivot
    //   domain
    //   range

    var useRadians = (typeof range === 'undefined');

    if (useRadians){
      var normPivot = normalize(pivot, this._parent)[0];
      var radians = radiansOrDomain;
      // Radians do not depend on plane.
      // We create a pivoted rotation transform on parent.
      var R_parent = Transform.IDENTITY.rotateBy(radians, normPivot);
      // See 2016-03-05-11
      //   We transform space objects by:
      //   T_hat = H_space * T
      this._T = R_parent.multiplyBy(this._T);
      this.emit('transformed', this);
    } else {
      var domain = radiansOrDomain;
      transformByEstimate(this, 'R', domain, range, pivot);
    }
  };

  plane.translateScale = function (domain, range) {
    // Parameter
    //   domain
    //   range

    transformByEstimate(this, 'TS', domain, range);
  };

  plane.translateRotate = function (domain, range) {
    // Parameter
    //   domain
    //   range

    transformByEstimate(this, 'TR', domain, range);
  };

  plane.scaleRotate = function (pivot, domain, range) {
    // Parameter
    //   domain
    //   range

    transformByEstimate(this, 'SR', domain, range, pivot);
  };

  plane.translateScaleRotate = function (domain, range) {
    // Parameter
    //   domain
    //   range

    transformByEstimate(this, 'TSR', domain, range);
  };

  // plane.translateAndScaleToFit, not sure if necessary for now

  plane.on('removed', function (self, oldParent, newParent) {
    if (typeof oldParent === 'undefined') { oldParent = null; }
    if (typeof newParent === 'undefined') { newParent = null; }

    var sameRoot;
    if (newParent === null) {
      // Root containers cannot move.
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

module.exports = Transformer;
