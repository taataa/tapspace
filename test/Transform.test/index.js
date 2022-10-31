const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {

  test('Transform:getPlain', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.basis()
    // Create a Transformation
    const helm = { a: 1, b: 2, x: 3, y: 4, z: 5 }
    const tr = new tapspace.geometry.Transform(basis, helm)

    t.deepEqual(
      tr.getPlain(),
      helm,
      'should convert to helm3'
    )

    t.end()
  })
}
