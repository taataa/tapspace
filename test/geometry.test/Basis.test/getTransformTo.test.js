const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:getTransformTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Create two bases
    const pa = space.getBasis()
    const pb = space.getBasis().offset(10, 20).scaleBy(2, space.at(0, 0))

    // Compute transform between them
    const tr = pa.getTransformTo(pb).getRaw()
    t.deepEqual(
      tr,
      { a: 2, b: 0, x: 20, y: 40, z: 0 },
      'should be transformation'
    )

    // Create two bases
    const pc = space.getBasis().offset(10, 20)
    const pd = space.getBasis().offset(10, 20).scaleBy(2)

    // Compute transform between them
    const trcd = pc.getTransformTo(pd)
    t.deepEqual(
      trcd.getRaw(),
      { a: 2, b: 0, x: 0, y: 0, z: 0 },
      'should be scaling transformation'
    )

    t.almostEqualBasis(
      pc.transformBy(trcd),
      pd,
      'should be same when applied'
    )

    t.end()
  })
}
