var Emitter = require('component-emitter');

var Taa = function (imgSrc, onLoad) {
	// Parameters
	//
	//   onLoad, function (taa)
	Emitter(this);
	var this2 = this;

	this.img = new Image(256, 256);
	img.addEventListener('load', function () {
		onLoad(this2);
		this2.emit('onload', this2);
	}, false); // useCapture=false
	this.img.src = imgSrc;
};
