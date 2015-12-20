// API v0.2.0
var nudged = require('nudged');
var SpacePoint = require('./SpacePoint');

var normalize = function (points, plane) {
  return points.map(function (p) {
    return p.to(plane).xy;
  });
};

var Transformer = function (plane) {
  // As Space is only null SpacePlane,
  // Transformers cannot have null transformations.
  plane.T = new nudged.Transform(1, 0, 0, 0); // identity transformation

  plane.scale = function (pivot, multiplierOrDomain, range) {
    // Parameter
    //   pivot, a SpacePoint
    //   multiplier, the scale factor
    //  OR
    //   pivot
    //   domain
    //   range

    var normPivot = pivot.to(plane).xy;
    var useMultiplier = (typeof range === 'undefined');

    if (useMultiplier){
      var multiplier = multiplierOrDomain;
      this.T = this.T.scaleFixed(normPivot, multiplier);
    } else {
      var domain = multiplierOrDomain;
      // Convert all SpacePoints onto local SpacePlane and to arrays
      var normDomain = normalize(domain, plane);
      var normRange = normalize(range, plane);
      var S = nudged.estimateScalerFixed(normPivot, normDomain, normRange);
      this.T = S.multiply(this.T);
    }

    plane.emit('transformed', plane);
  };

  plane.rotate = function (pivot, radiansOrDomain, range) {
    // Parameter
    //   pivot
    //   radians
    //  OR
    //   pivot
    //   domain
    //   range

    var normPivot = pivot.to(plane).xy;
    var useRadians = (typeof range === 'undefined');

    if (useRadians){
      var radians = radiansOrDomain;
      this.T = this.T.rotateFixed(normPivot, radians);
    } else {
      var domain = radiansOrDomain;
      // Convert all SpacePoints onto local SpacePlane and to arrays
      var normDomain = normalize(domain, plane);
      var normRange = normalize(range, plane);
      var R = nudged.estimateRotatorFixed(normPivot, normDomain, normRange);
      this.T = R.multiply(this.T);
    }

    plane.emit('transformed', plane);
  };

  plane.translate = function (domain, range) {
    // Parameter
    //   domain
    //   range

    // Convert all SpacePoints onto local SpacePlane and to arrays
    var normDomain = normalize(domain, plane);
    var normRange = normalize(range, plane);

    var T = nudged.estimateTranslator(normDomain, normRange);
    this.T = T.multiply(this.T);
    plane.emit('transformed', plane);
  };

  plane.translateScaleRotate = function (domain, range) {
    // Parameter
    //   domain
    //   range

    // Convert all SpacePoints onto local SpacePlane and to arrays
    var dom = normalize(domain, plane);
    var ran = normalize(range, plane);

    var T = nudged.estimate(dom, ran);
    this.T = T.multiply(this.T);
    plane.emit('transformed', plane);
  };

  // plane.translateAndScaleToFit, not sure if necessary for now
};

module.exports = Transformer;
