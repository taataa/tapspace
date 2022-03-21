const setElementTransform = require('./Element/setElementTransform')

exports.rotate =
exports.rotateBy =
exports.rotateTo = (el, rotation, opts) => {
  // Make space element
  if (!el.affinedom) {
    el.affinedom = affinedom.create(el)
  }
  const ad = el.affinedom
  if (typeof rotation.r === 'number') {
    // setRotation
    proj.rotateTo(ad.proj, rotation.r)
  }
  let rot = geom.tran.createRotation(rotation.dr)
  let rotated = proj.transform(el.affinedom.proj, rot)

  lib.setElementTransform(el, rotated)
}
