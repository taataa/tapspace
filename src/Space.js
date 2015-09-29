/*
Emits
  contentAdded
  contentRemoved
    not thrown if the content to remove did not exist in the first place.
  contentTransformed
*/
var Emitter = require('component-emitter');
var SpaceTaa = require('./SpaceTaa');

var Space = function () {
  Emitter(this);

  this.content = {}; // Dict over list because key search time complexity
};

var proto = Space.prototype;

proto.add = function (taa) {
  // Return
  //   SpaceTaa
  //
  var this2 = this;

  var st = new SpaceTaa(this, taa);
  this.content[st.id] = st;

  st.on('transformed', function (st) {
    this2.emit('contentTransformed', st);
  });

  this.emit('contentAdded', st);

  return st;
};

proto.remove = function (spacetaa) {
  if (this.content.hasOwnProperty(spacetaa.id)) {
    delete this.content[spacetaa.id];
    this.emit('contentRemoved', spacetaa);
  }
  // Nothing to remove, nothing to emit
};

module.exports = Space;
