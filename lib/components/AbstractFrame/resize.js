const fine = require('affineplane')
const point3 = fine.point3
const vec3 = fine.vec3
const plane3 = fine.plane3

module.exports = function (newSize, options) {
  // tapspace.components.AbstractFrame:resize(newSize)
  //
  // Set component size and move component so that both the anchor position in
  // space and the anchor position relative to the component size are preserved.
  //
  // For example, let component be 100x100 and anchor at (50,50).
  // Then resize component to the size 200x100. New anchor becomes (100, 50)
  // and the component is translated in space by (-50,0) to match the anchor.
  //
  // To preserve the anchor's absolute position, i.e. pixels from
  // the top-left corner of the component to the anchor,
  // see AbstractFrame:setSize.
  //
  // Parameters:
  //   newSize
  //     a {w,h}, a {width,height}, or a Size.
  //     .. If {w,h} or {width,height} format is used, the dimensions can be
  //     .. either number of pixels or CSS length strings. Note that if the
  //     .. component is not yet in DOM, relative length units might not work.
  //
  // Return
  //   this, for chaining
  //

  // Read original anchor position.
  const oldAnchor = this.anchor
  // Read the relative anchor position.
  const rx = oldAnchor.x / this.size.w
  const ry = oldAnchor.y / this.size.h
  // Update size
  this.setSize(newSize, options)
  // Update anchor to the new position.
  const newAnchor = {
    x: rx * this.size.w,
    y: ry * this.size.h,
    z: oldAnchor.z
  }
  this.anchor = newAnchor
  // Move the component so that the anchor stays at the same space position.
  const vecNewToOld = point3.diff(newAnchor, oldAnchor)
  // Transit vec to outer basis so we can translate.
  const vecOnOuter = vec3.transitFrom(vecNewToOld, this.tran)
  // Now translate the component
  this.tran = plane3.translateBy(this.tran, vecOnOuter)

  this.renderTransform()

  return this
}
