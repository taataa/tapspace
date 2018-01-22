// API v4

exports.Rectangle = require('./lib/Rectangle')
exports.Vector = require('./lib/Vector')
exports.Path = require('./lib/Path')
exports.Grid = require('./lib/Grid')
exports.Transform = require('./lib/Transform')
exports.IScalar = require('./lib/IScalar')
exports.IVector = require('./lib/IVector')
exports.IPath = require('./lib/IPath')
exports.ITransform = require('./lib/ITransform')
exports.IGrid = require('./lib/IGrid')
exports.SpaceGroup = require('./lib/SpaceGroup')
exports.SpaceHTML = require('./lib/SpaceHTML')
exports.SpaceImage = require('./lib/SpaceImage')
exports.SpacePixel = require('./lib/SpacePixel')
exports.Space = require('./lib/Space')
exports.SpaceViewHTML = require('./lib/SpaceViewHTML')
// Maybe in future:
// exports.SpacePoint = require('./lib/SpacePoint')
// exports.SpaceTransform = require('./lib/SpaceTransform')

exports.preload = require('loadimages')
exports.version = require('./lib/version')
