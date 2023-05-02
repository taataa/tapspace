const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Distance:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    // Create two Points
    const pa = space.at(10, 6)
    const pb = space.at(14, 9)
    // Get a Distance between them
    const d = pa.getDistanceTo(pb)

    t.equal(
      d.getRaw(),
      5,
      'should convert to dist3 number'
    )

    t.end()
  })
}
