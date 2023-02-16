const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Point:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)
    // Create a Point
    const p = basis.at(10, 6)

    t.deepEqual(
      p.getRaw(),
      { x: 10, y: 6, z: 0 },
      'should convert to point3'
    )

    t.end()
  })
}
