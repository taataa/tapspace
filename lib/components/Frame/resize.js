const fine = require('affineplane')
const point3 = fine.point3
const vec3 = fine.vec3
const plane3 = fine.plane3

module.exports = function (newSize, pivot) {
  // @Frame:resize(newSize[, pivot])
  //
  // Set component size and move component so that the pivot point position
  // stays intact. For example, if the pivot is at right edge then a width
  // decrease would keep the right edge still and bring the left edge closer.
  //
  // By default, the pivot is equal to the transform origin of the component.
  // In that case the transform origin stays fixed in space during the resize.
  // With a custom pivot that is not equal to the transform origin,
  // the transform origin will move in space during resize but its relative
  // position on the component is preserved. For example if the transform
  // origin was at the component center, it is still at the component center
  // after the resize.
  //
  // To preserve the absolute position of the transform origin and
  // the space position of the top left corner, see Frame:setSize.
  //
  // Parameters:
  //   newSize
  //     a {w,h}, a {width,height}, or a Size.
  //     .. If {w,h} or {width,height} format is used, the dimensions can be
  //     .. either number of pixels or CSS length strings. Note that if the
  //     .. component is not yet in DOM, relative length units might not work.
  //   pivot
  //     optional Point, default is the transform origin.
  //
  // Return
  //   this, for chaining
  //

  if (!pivot) {
    pivot = this.atAnchor()
  }

  // Read relative position of the pivot.
  const oldPivot = this.at(pivot).point
  const pivotRelX = oldPivot.x / this.size.w
  const pivotRelY = oldPivot.y / this.size.h

  // Read relative position of the transform origin.
  const oldOrigin = this.anchor
  const originRelX = oldOrigin.x / this.size.w
  const originRelY = oldOrigin.y / this.size.h

  // Update size
  this.setSize(newSize)

  // Update transform origin to the new position.
  const newOrigin = {
    x: originRelX * this.size.w,
    y: originRelY * this.size.h,
    z: oldOrigin.z
  }
  this.anchor = newOrigin

  // Read new temporary pivot position
  const newPivot = {
    x: pivotRelX * this.size.w,
    y: pivotRelY * this.size.h,
    z: oldPivot.z
  }

  // Move the component so that the pivot stays at the same space position.
  const vecNewToOld = point3.diff(newPivot, oldPivot)
  // Transit vec to outer basis so we can translate.
  const vecOnOuter = vec3.transitFrom(vecNewToOld, this.tran)
  // Now translate the component
  this.tran = plane3.translateBy(this.tran, vecOnOuter)

  this.renderTransform()

  return this
}
