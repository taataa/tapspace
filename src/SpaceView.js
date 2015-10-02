/*
View
*/
var Emitter = require('component-emitter');
var Transformer = require('./transformer');
var affine = require('kld-affine');

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
      this2.content[spacetaa.id] = spacetaa;
      // Make transformation
    }
  });

  this.space.on('contentRemoved', function (spacetaa) {
    delete this2.content[spacetaa.id]; // does not throw if does not exist
  });

  this.space.on('contentTransformed', function (spacetaa) {
    // Update transformation
  });
};

module.exports = SpaceView;
