const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Scale :changeBasis :getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    // Create two bases
    const ba = tapspace.createSpace().setParent(view)
    const bb = tapspace.createSpace().setParent(view)
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
