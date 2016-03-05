// API v0.2.0
var nudged = require('nudged');
var Transform = require('./Transform');
var SpacePoint = require('./SpacePoint');

var normalize = function (points) {
  // Transform all the points onto the space and then to array.
  // Arguments
  //   points, a single spacepoint or a list of spacepoints
  //   plane, a SpacePlane e.g. a SpaceTaa where to normalize
  // Return
  //   array of xy points in space.
  var i, p, np, normalized;
  if (!Array.isArray(points)) {
    // Single SpacePoint
    p = points;
    np = p.toSpace().xy;
    return [np];
  } // else
  normalized = [];
  for (i = 0; i < points.length; i += 1) {
    p = points[i];
    np = p.toSpace().xy;
    normalized.push(np);
  }
  return normalized;
};


var transformByEstimate = function (plane, type, domain, range, pivot) {
  // Types: T,S,R,TS,TR,SR,TSR (see nudged for further details)

  var normPivot;
  if (typeof pivot !== 'undefined') {
    normPivot = normalize(pivot)[0];
  }

  // Convert all SpacePoints onto the space and to arrays
  var normDomain = normalize(domain);
  var normRange = normalize(range);

  // Then compute optimal transformation in space
  var H_space = nudged.estimate(type, normDomain, normRange, normPivot);
  // See 2016-03-05-11:
  //   To apply transformation to a space object:
  //     T_hat = toSpace(H) * T
  // Therefore:
  plane._T = H_space.multiplyBy(plane._T);

  // Notify especially view about transformation.
  plane.emit('transformed', plane);
};


var Transformer = function (plane) {

  plane.getTransform = function () {
    // Return
    //   transformation from plane to space, i.e.
    //     xy_space = T * xy_plane
    // Needed when we want to store Space element's position for later use.
    return this._T;
  };

  plane.setTransform = function (T) {
    // Needed when we whan to restore stored position, maybe after
    // modification.
    this._T = T;
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
      var normPivot = normalize(pivot)[0];
      var multiplier = multiplierOrDomain;
      // Multiplier does not depend on plane.
      // We create a pivoted scaling transform on space.
      var S_space = Transform.IDENTITY.scaleBy(multiplier, normPivot);
      // See 2016-03-05-11
      //   We transform space objects by:
      //   T_hat = H_space * T
      this._T = S_space.multiplyBy(this._T);
      plane.emit('transformed', plane);
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
      var normPivot = normalize(pivot)[0];
      var radians = radiansOrDomain;
      // Radians do not depend on plane.
      // We create a pivoted rotation transform on space.
      var R_space = Transform.IDENTITY.rotateBy(radians, normPivot);
      // See 2016-03-05-11
      //   We transform space objects by:
      //   T_hat = H_space * T
      this._T = R_space.multiplyBy(this._T);
      plane.emit('transformed', plane);
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
};

module.exports = Transformer;
