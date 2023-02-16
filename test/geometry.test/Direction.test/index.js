const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Direction:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    // Create two Points
    const pa = space.at(10, 6)
    const pb = space.at(14, 9)
    // Get a Direction from a to b
    const d = pa.getDirectionTo(pb)

    t.deepEqual(
      d.getRaw(),
      { x: 0.8, y: 0.6, z: 0 },
      'should convert to dir3 unit vector'
    )

    t.end()
  })
}
