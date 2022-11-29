const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Scale :changeBasis :getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.createSpace('#testspace')
    // Create two bases
    const ba = space.addBasis()
    const bb = space.addBasis()
    // Scale another
    bb.scaleBy(4)
    const scale = bb.getScale()

    t.equal(
      scale.getRaw(),
      1,
      'should convert scale to number'
    )

    t.equal(
      scale.changeBasis(ba).getRaw(),
      4,
      'should convert scale to number'
    )

    t.end()
  })
}
