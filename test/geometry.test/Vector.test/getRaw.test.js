const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Vector:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)
    // Create two Points
    const pa = basis.at(10, 6)
    const pb = basis.at(20, 16)
    // Get a Vector between them
    const v = pa.getVectorTo(pb)

    t.deepEqual(
      v.getRaw(),
      { x: 10, y: 10, z: 0 },
      'should convert to vec3'
    )

    t.end()
  })
}
