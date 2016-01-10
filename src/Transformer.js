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

var Transformer = function (plane) {
  // As Space is only null SpacePlane,
  // Transformers cannot have null transformations.
  plane._T = new nudged.Transform(1, 0, 0, 0); // identity transformation

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
      this._T = this._T.scaleBy(multiplier, normPivot);
    } else {
      var domain = multiplierOrDomain;
      // Convert all SpacePoints onto local SpacePlane and to arrays
      var normDomain = normalize(domain, plane);
      var normRange = normalize(range, plane);
      var S = nudged.estimateS(normDomain, normRange, normPivot);
      this._T = S.multiplyBy(this._T);
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
      this._T = this._T.rotateBy(radians, normPivot);
    } else {
      var domain = radiansOrDomain;
      // Convert all SpacePoints onto local SpacePlane and to arrays
      var normDomain = normalize(domain, plane);
      var normRange = normalize(range, plane);
      var R = nudged.estimateR(normDomain, normRange, normPivot);
      this._T = R.multiplyBy(this._T);
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

    var T = nudged.estimateT(normDomain, normRange);
    this._T = T.multiplyBy(this._T);
    plane.emit('transformed', plane);
  };

  plane.translateScaleRotate = function (domain, range) {
    // Parameter
    //   domain
    //   range

    // Convert all SpacePoints onto local SpacePlane and to arrays
    var dom = normalize(domain, plane);
    var ran = normalize(range, plane);

    var T = nudged.estimateTSR(dom, ran);
    this._T = T.multiplyBy(this._T);
    plane.emit('transformed', plane);
  };

  // plane.translateAndScaleToFit, not sure if necessary for now
};

module.exports = Transformer;
