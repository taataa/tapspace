/*
View
*/
var Emitter = require('component-emitter');
var Transformer = require('./transformer');

var SpaceView = function (space, container) {
  Emitter(this);
  Transformer(this);
  var this2 = this;

  this.space = space;
  this.cont = container;

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
