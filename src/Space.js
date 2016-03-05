/*
Emits
  contentAdded
  contentRemoved
    not thrown if the content to remove did not exist in the first place.
  contentTransformed
*/
var Emitter = require('component-emitter');
var SpacePlane = require('./SpacePlane');
var SpaceContainer = require('./SpaceContainer');

var Space = function () {
  Emitter(this);

  SpaceContainer(this);
  // TODO remove possibility to add to parent.

  SpacePlane(this);
  // Space has constant identity transformation _T
};

module.exports = Space;
