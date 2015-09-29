var affine = require('kld-affine');
var SpacePoint = require('./SpacePoint');

var Transformer = function (emitter) {
  emitter.tr = new affine.Matrix2D(); // def to identity

  emitter.transformTo = function (transformation) {
    emitter.tr = transformation;
    emitter.emit('transformed', emitter);
  };

  emitter.transformBy = function (transformation) {
    emitter.tr = ctx.tr.multiply(transformation);
    emitter.emit('transformed', emitter);
  };

  emitter.getPoint = function (xy) {
    return new SpacePoint(xy, emitter);
  };
};

module.exports = Transformer;
