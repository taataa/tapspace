const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {

  test('Scale :changeBasis :getPlain', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    // Create two bases
    const ba = space.basis()
    const bb = space.basis()
    // Scale another
    bb.scaleBy(4)
    const scale = bb.getScale()

    t.equal(
      scale.getPlain(),
      1,
      'should convert scale to number'
    )

    t.equal(
      scale.changeBasis(ba).getPlain(),
      4,
      'should convert scale to number'
    )

    t.end()
  })
}
