const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Vector.fromPolar', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.addBasis()
    // Create a vector
    const radius = 2
    const d90 = Math.PI / 2
    const vec = tapspace.geometry.Vector.fromPolar(basis, radius, d90, 3)

    t.almostEqualVector(
      vec.getRaw(),
      { x: 0, y: 2, z: 3 },
      'should point back down'
    )

    t.end()
  })
}
