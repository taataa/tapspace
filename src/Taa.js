var Emitter = require('component-emitter');

var Taa = function (imgSrc, onLoad) {
  // Parameters
  //   imgSrc
  //   onLoad
  //     optional, function (taa)
  Emitter(this);
  var this2 = this;

  if (typeof onLoad !== 'function') {
    onLoad = function () {};
  }

  this.img = new Image(256, 256);
  this.img.addEventListener('load', function () {
    onLoad(this2);
    this2.emit('load', this2);
  }, false); // useCapture=false

  // Allow on('load') binding to fire after 'new Taa(...)'
  // even when image is already cached. The following executes
  // event after the current stack has been executed.
  setTimeout(function () {
    this2.img.src = imgSrc;
  }, 0);
};

var proto = Taa.prototype;

module.exports = Taa;
