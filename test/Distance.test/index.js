const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {

  test('Distance:getPlain', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.basis()
    // Create two Points
    const pa = basis.at(10, 6)
    const pb = basis.at(14, 9)
    // Get a Distance between them
    const d = pa.getDistanceTo(pb)

    t.equal(
      d.getPlain(),
      5,
      'should convert to dist3 number'
    )

    t.end()
  })
}