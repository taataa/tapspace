// tapspace.loaders.loadImages(imgSrcs, callback)
//
// Preload one or more images and call back when finished.
//
// Usage:
// ```
// tapspace.loaders.loadImages('hello.png', function (err, img) {
//   if (err) { throw err }
//   // img is now loaded and has correct dimensions instead of 0x0.
//   ...
// })
// ```
//
// See [loadimages](https://www.npmjs.com/package/loadimages) package
// for details.
//
module.exports = require('loadimages')
