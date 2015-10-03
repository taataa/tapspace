/*
View
*/
var Emitter = require('component-emitter');
var Transformer = require('./transformer');
var affine = require('kld-affine');
var move = require('movejs');

var SpaceView = function (space, container) {
  Emitter(this);
  Transformer(this);
  var this2 = this;

  // Test valid space
  if (typeof space !== 'object' || !('add' in space)) {
    throw 'Space should be a Space object';
  }
  // Test if valid dom element
  if (!('tagName' in container)) {
    throw 'Container should be a DOM Element';
  }

  this.space = space;
  this.cont = container;

  // Transformation from space to view
  this.transformTo((new affine.Matrix2D()).scale(256));

  this.content = {}; // Dict over list because key search time complexity

  // Listen the space for new taas or transformations

  this.space.on('contentAdded', function (spacetaa) {
    if (this2.content.hasOwnProperty(spacetaa.id)) {
      // SpaceTaa is already drawn.
    } else {
      var img = spacetaa.taa.img.cloneNode(false); // deep=false
      img.className = 'taaspace-taa';
      this2.cont.appendChild(img);
      this2.content[spacetaa.id] = img;
      // Make transformation
      move(img).matrix(spacetaa.tr.a, spacetaa.tr.b,
                       spacetaa.tr.c, spacetaa.tr.d,
                       spacetaa.tr.e, spacetaa.tr.f).end();
    }
  });

  this.space.on('contentRemoved', function (spacetaa) {
    var el;
    if (this2.content.hasOwnProperty(spacetaa.id)) {
      el = this2.content[spacetaa.id];
      this2.cont.removeChild(el);
      delete this2.content[spacetaa.id]; // does not throw if does not exist
    }
  });

  this.space.on('contentTransformed', function (spacetaa) {
    // Update transformation
    var el;
    if (this2.content.hasOwnProperty(spacetaa.id)) {
      el = this2.content[spacetaa.id];
      move(el).matrix(spacetaa.tr.a, spacetaa.tr.b,
                      spacetaa.tr.c, spacetaa.tr.d,
                      spacetaa.tr.e, spacetaa.tr.f).end();
    }
  });
};

module.exports = SpaceView;
