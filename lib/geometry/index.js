// @tapspace.geometry
//
// Various geometries in affine space.
//
// All geometry models are *immutable* meaning that their state
// does not change and new objects are returned instead. For example,
// `vec.rotateBy(PI)` does not change `vec` but returns a new rotated vector.
//
// Geometries differ from components also in the aspect that they do not have
// built-in HTML representation and do not occupy DOM.
//
// Each geometry has methods to transit it between affine elements,
// meaning that its coordinates can be mapped and represented in the
// coordinate systems of other elements.
//
// Geometry transitions are *passive transformations* in a sense that
// they do not change the geometry, only the frame of reference.
//
// An example of an *active transformation* is the Transform class
// which can be used to move both geometry and components around.
//

exports.Area = require('./Area')
exports.Box = require('./Box')
// exports.Dilation
exports.Direction = require('./Direction')
exports.Distance = require('./Distance')
// exports.Extrusion or Resizing
exports.Orientation = require('./Orientation')
exports.Path = require('./Path')
exports.Point = require('./Point')
exports.Polygon = require('./Polygon')
// exports.Rotation
exports.Scale = require('./Scale')
exports.Size = require('./Size')
exports.Sphere = require('./Sphere')
exports.Transform = require('./Transform')
exports.Vector = require('./Vector')
exports.Volume = require('./Volume')

// HACK?
// Handle circular dependencies by constructing
// the dependent methods afterwards.
exports.Direction.patchCircular(exports.Vector)
exports.Distance.patchCircular(exports.Vector)
exports.Sphere.patchCircular(exports.Box)
exports.Transform.patchCircular(exports.Vector)
exports.Vector.patchCircular(exports.Direction, exports.Distance)
