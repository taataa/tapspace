const Animatable = function () {
  // @Animatable
  //
  // Provides a Component animation abilities.
  //

  // To be able to stop CSS transitions and remove listeners gracefully,
  // we must remember possible handler functions.
  // See :animate and :animateOnce.
  this.ontransitionend = null
}

module.exports = Animatable
const proto = Animatable.prototype
proto.isAnimatable = true

proto.animate = require('./animate')
proto.animateOnce = require('./animateOnce')
proto.cancelAnimation = require('./cancelAnimation')
