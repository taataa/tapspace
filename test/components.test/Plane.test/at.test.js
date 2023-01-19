const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Plane:at', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = view.createSpace()

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
