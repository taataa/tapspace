// @Hyperspace:getBoundingBox([basis])
//
// Get bounding box of all the content in all spaces.
// Optional basis determines the orientation of the box.
// Can be computationally intensive if the spaces have hundreds of elements.
// Therefore avoid calling this at every frame.
//
// Parameters:
//   basis
//     optional Component, default to this. The resulting box will be
//     in this basis and have the same orientation.
//
// Return
//   a Box
//
module.exports = require('../Plane/getBoundingBox')
