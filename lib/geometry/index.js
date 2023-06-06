// @tapspace.geometry
//
// Tensor geometry for the affine 3D space. Each geometry class implements
// a tensor that helps the programmer to care less about coordinate basis
// and numeric representation. Tensors make it easy to do layouts and move
// components and geometry. They kind of float in space relative to each other
// without absolute origin.
//
// Unlike components, the geometry classes are *immutable* meaning that their state
// does not change. Instead, new objects are returned. For example,
// `vec.rotateBy(PI)` does not change `vec` but returns a new rotated vector.
//
// Geometry classes differ from components also in the aspect that
// they are virtual, meaning that they do not have HTML representation
// and do not occupy DOM.
//
// Each geometry has changeBasis(...) method for recomputing the interal raw
// numeric representation for the basis of another component. The raw value
// can be exposed by getRaw() and transitRaw(...) methods.
//
// The basis changes of the geometry are *passive transformations* in a sense
// that they do not change the geometry, only the frame of reference.
//
// An example of an *active transformation* is the Transform class
// which can be used to move both geometry and components around.
// Many geometry classes also provide methods to move i.e. actively transform
// them in various ways like rotateBy(radians, origin). See also offset(..,),
// scaleBy(...) and translateBy(...).
//

exports.Area = require('./Area')
exports.Basis = require('./Basis')
exports.Box = require('./Box')
exports.Circle = require('./Circle')
// exports.Dilation
exports.Direction = require('./Direction')
exports.Distance = require('./Distance')
// exports.Extrusion or Resizing
exports.Line = require('./Line')
exports.Orientation = require('./Orientation')
exports.Path = require('./Path')
exports.Point = require('./Point')
exports.Polygon = require('./Polygon')
exports.Ray = require('./Ray')
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
exports.Basis.patchCircular(exports.Transform)
exports.Box.patchCircular(exports.Sphere)
exports.Circle.patchCircular(exports.Box)
exports.Direction.patchCircular(exports.Vector)
exports.Distance.patchCircular(exports.Vector)
exports.Sphere.patchCircular(exports.Box)
exports.Transform.patchCircular(exports.Vector)
exports.Vector.patchCircular(exports.Direction, exports.Distance)
