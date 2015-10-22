var affine = require('kld-affine');
var SpacePoint = require('./SpacePoint');

// Monkey patch
affine.Matrix2D.prototype.translateBy = function (tx, ty) {
  return new this.constructor(
    this.a,
    this.b,
    this.c,
    this.d,
    tx + this.e,
    ty + this.f
  );
};
affine.Matrix2D.prototype.translateTo = function (tx, ty) {
  return new this.constructor(
    this.a,
    this.b,
    this.c,
    this.d,
    tx,
    ty
  );
};

var Transformer = function (emitter) {
  emitter.tr = new affine.Matrix2D(); // def to identity

  emitter.transformTo = function (transformation) {
    emitter.tr = transformation;
    emitter.emit('transformed', emitter);
  };

  emitter.transformBy = function (transformation) {
    emitter.tr = emitter.tr.multiply(transformation);
    emitter.emit('transformed', emitter);
  };

  emitter.rotateBy = function (cycles) {
    emitter.tr = emitter.tr.rotate(2 * Math.PI * cycles);
    emitter.emit('transformed', emitter);
  };

  emitter.translateTo = function (xy) {
    // Parameter
    //   xy
    //     Vector2D
    emitter.tr = emitter.tr.translateTo(xy.x, xy.y);
    emitter.emit('transformed', emitter);
  };

  emitter.translateBy = function (xy) {
    // Parameter
    //   xy
    //     Vector2D
    emitter.tr = emitter.tr.translateBy(xy.x, xy.y);
    emitter.emit('transformed', emitter);
  };

  emitter.getSpacePoint = function (xy) {
    // Parameter
    //   xy
    //     Vector2D
    return new SpacePoint(xy, emitter);
  };
  // alias
  emitter.at = emitter.getSpacePoint;

  emitter.getSpacePointNormalized = function (xy, dimensions) {
    var w = dimensions.x;
    var h = dimensions.y;
    var nxy = new affine.Vector2D(xy.x * w, xy.y * h);
    return new SpacePoint(nxy, emitter);
  };
};

module.exports = Transformer;
