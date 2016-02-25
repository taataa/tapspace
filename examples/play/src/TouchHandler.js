var Emitter = require('component-emitter');
var Model = require('./Model');

var TouchHandler = function (element) {
  Emitter(this);
  var this2 = this;

  var model = new Model();

  // Touch support

  var onTouchStart = function (ev) {
    var cts, i;
    cts = ev.changedTouches;
    for (i = 0; i < cts.length; i += 1) {
      model.startTouchPoint(cts[i].identifier, cts[i].pageX, cts[i].pageY);
    }
    ev.preventDefault();
    ev.stopPropagation();
  };
  var onTouchMove = function (ev) {
    var cts, i;
    cts = ev.changedTouches;
    for (i = 0; i < cts.length; i += 1) {
      model.moveTouchPoint(cts[i].identifier, cts[i].pageX, cts[i].pageY);
    }
    ev.preventDefault();
    ev.stopPropagation();
  };
  var onTouchEndTouchCancel = function (ev) {
    var cts, i;
    cts = ev.changedTouches;
    for (i = 0; i < cts.length; i += 1) {
      model.endTouchPoint(cts[i].identifier);
    }
    ev.preventDefault();
    ev.stopPropagation();
  };

  element.addEventListener('touchstart', onTouchStart);
  element.addEventListener('touchmove', onTouchMove);
  element.addEventListener('touchend', onTouchEndTouchCancel);
  element.addEventListener('touchcancel', onTouchEndTouchCancel);

  // Mouse support

  var mouseDown = false;

  var onMouseDown = function (ev) {
    if (!mouseDown) {
      mouseDown = true;
      model.startTouchPoint('mouse', ev.pageX, ev.pageY);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  var onMouseMove = function (ev) {
    if (mouseDown) {
      model.moveTouchPoint('mouse', ev.pageX, ev.pageY);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  var onMouseUp = function (ev) {
    if (mouseDown) {
      mouseDown = false;
      model.endTouchPoint('mouse');
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseup', onMouseUp);
  element.addEventListener('mouseout', onMouseUp);

  // We forward the events from the model

  model.on('start', function () {
    this2.emit('start');
  });

  model.on('move', function (totalTransformation) {
    this2.emit('move', totalTransformation);
  });

  model.on('end', function () {
    this2.emit('end');
  });

};


module.exports = TouchHandler;
