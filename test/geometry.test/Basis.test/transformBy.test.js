const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:transformBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(20, 20))

    const tr = tapspace.geometry.Transform.fromFeatures({
      basis: space,
      scale: 2, // TODO dilation
    })
    const basis = item.getBasis().transformBy(tr, item.atCenter())

    t.deepEqual(
      basis.getRaw(),
      { a: 2, b: 0, x: -10, y: -10, z: 0 },
      'should be scaled'
    )

    t.end()
  })
}
