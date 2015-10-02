var affine = require('kld-affine');
var SpacePoint = require('./SpacePoint');

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
