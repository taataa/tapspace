const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Point:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.addBasis()
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
