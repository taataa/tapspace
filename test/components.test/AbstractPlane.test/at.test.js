const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('AbstractPlane.at', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.basis()

    // Take a point
    const p = basis.at(1, 2)

    t.almostEqualPoint(
      p,
      { basis: basis, point: { x: 1, y: 2, z: 0 } },
      'should fill z'
    )

    t.end()
  })
}
