const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Vector.fromSpherical', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.basis()
    // Create a vector
    const magn = 2
    const d90 = Math.PI / 2
    const vec = tapspace.geometry.Vector.fromSpherical(basis, magn, d90, d90)

    t.almostEqualVector(
      vec.getRaw(),
      { x: 0, y: 2, z: 0 },
      'should point down'
    )

    t.end()
  })
}
