/*
Emits
  contentAdded
  contentRemoved
    not thrown if the content to remove did not exist in the first place.
  contentTransformed
*/
var Emitter = require('component-emitter');
var SpacePlane = require('./SpacePlane');
var SpaceTaa = require('./SpaceTaa');

var Space = function () {
  Emitter(this);
  SpacePlane(this);
  // Has constant identity transformation _T

  this.content = {}; // Dict over list because key search time complexity
  this.transformedHandlers = {}; // To be able to remove event handlers
};

var proto = Space.prototype;

proto.has = function (spacetaa) {
  // Return
  //   true if spacetaa in space
  return spacetaa.space === this;
};

proto.add = function (taa) {
  // Return
  //   SpaceTaa
  //
  var st = new SpaceTaa(this, taa); // Calls space._add
  return st;
};

proto._add = function (spacetaa) {
  // To be called from the SpaceTaa constructor
  //
  // Return
  //   undefined

  var st = spacetaa; // alias
  var this2 = this;

  this.content[st.id] = st;

  // Listen if transformed
  var handler = function () {
    this2.emit('contentTransformed', st);
  };
  st.on('transformed', handler);
  this.transformedHandlers[st.id] = handler;

  this.emit('contentAdded', st);
};

proto.remove = function (spacetaa) {
  if (this.content.hasOwnProperty(spacetaa.id)) {
    spacetaa.remove(); // calls space._remove
  }  // else
  // Nothing to remove, nothing to emit
};

proto._remove = function (spacetaa) {
  // To be called from SpaceTaa#remove
  // Precondition: spacetaa in space

  var st = spacetaa; // alias
  delete this.content[st.id];

  // Remove handlers
  var h = this.transformedHandlers[st.id];
  delete this.transformedHandlers[st.id];
  spacetaa.off('transformed', h);

  this.emit('contentRemoved', st);
};

module.exports = Space;
