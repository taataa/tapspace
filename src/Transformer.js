var affine = require('kld-affine');
var SpacePoint = require('./SpacePoint');

// Replace
affine.Matrix2D.prototype.translate = function (tx, ty) {
  return new this.constructor(
    this.a,
    this.b,
    this.c,
    this.d,
    tx + this.e,
    ty + this.f
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

  emitter.translateBy = function (xy) {
    // Parameter
    //   xy
    //     Vector2D
    emitter.tr = emitter.tr.translate(xy.x, xy.y);
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
};

module.exports = Transformer;
