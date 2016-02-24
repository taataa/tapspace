// API v0.2.0
var nudged = require('nudged');
var SpacePoint = require('./SpacePoint');

var normalize = function (points, plane) {
  // Transform all the points onto the given plane.
  // Arguments
  //   points, a single spacepoint or a list of spacepoints
  //   plane, a SpacePlane e.g. a SpaceTaa where to normalize
  var i, p, np;
  var normalized = [];
  if (!Array.isArray(points)) {
    points = [points];
  }
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
    normPivot = pivot.to(plane).xy;
  }

  // Convert all SpacePoints onto local SpacePlane and to arrays
  var normDomain = normalize(domain, plane);
  var normRange = normalize(range, plane);

  var T = nudged.estimate(type, normDomain, normRange, normPivot);
  // S represents transf from plane to space, so inverse.
  plane._T = T.inverse().multiplyBy(plane._T);
  // Notify especially view about transformation.
  plane.emit('transformed', plane);
};

var Transformer = function (plane) {

  plane.getTransform = function () {
    // Needed when we want to store Space element's position for later use.
    return plane._T;
  };

  plane.setTransform = function (T) {
    // Needed when we whan to restore stored position, maybe after
    // modification.
    plane._T = T;
    plane.emit('transformed', plane);
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

    if (useMultiplier){
      var normPivot = pivot.to(plane).xy;
      var multiplier = multiplierOrDomain;
      // this._T represents transf from space to plane, so inverse scale.
      // For example, if taa is very small, a far away space coordinate
      // needs huge multiplier to be represented on the taa's coords.
      if (multiplier > 0) {
        this._T = this._T.scaleBy(1 / multiplier, normPivot);
        plane.emit('transformed', plane);
      } else {
        throw 'Invalid multiplier: ' + multiplier;
      }
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
      var normPivot = pivot.to(plane).xy;
      var radians = radiansOrDomain;
      // this._T represents transf from space to plane, so inverse rads.
      this._T = this._T.rotateBy(-radians, normPivot);
      plane.emit('transformed', plane);
    } else {
      var domain = radiansOrDomain;
      transformByEstimate(this, 'R', domain, range, pivot);
    }
  };

  // scaleRotate

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
