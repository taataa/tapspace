
module.exports = function (target) {
  // Total transformation from this element to the target element.
  //
  //
  //
  return { a: 1, b: 0, x: 0, y: 0 }
}

// proto.delta =
// proto.vector =
// proto.vectorTo =
// proto.project =
// proto.projection =
// proto.projectionTo = function (target) {
//   // Parameters
//   //   target
//   //     SpaceElement or SpaceView
//   //
//
//   // Find our projection to view // TODO why global projection?
//   const sourceProj = this.ancestors().reduce((acc, sel) => {
//     return proj.combine(acc, sel.proj)
//   }, this.proj)
//
//   // Find target's projection to view // TODO why global?
//   const targetProj = this.ancestors().reduce((acc, sel) => {
//     return proj.combine(acc, sel.proj)
//   }, target.proj)
//
//   return proj.between(sourceProj, targetProj)
// }
