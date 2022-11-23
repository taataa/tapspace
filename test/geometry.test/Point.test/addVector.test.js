const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Point:addVector', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.addBasis()
    // Create a Point
    const p = basis.at(10, 6)
    // Create a Vector
    const v = new tapspace.geometry.Vector(basis, { x: 2, y: 3, z: 4 })

    t.deepEqual(
      p.addVector(v).getRaw(),
      { x: 12, y: 9, z: 4 },
      'should increase properties'
    )

    t.end()
  })
}
