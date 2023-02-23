const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getVolume', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Scaled space
    space.scaleBy(2)

    const front = tapspace.createItem('hello')
    front.setSize(20, 10)
    space.addChild(front, space.at(10, 20, 30))

    const back = tapspace.createItem('hello')
    back.setSize(20, 10)
    space.addChild(back, space.at(10, 20, 50))

    // Get a box
    const box = space.getBoundingBox()
    // Get volume
    const vol = box.getVolume()

    t.deepEqual(
      box.getSize().transitRaw(space),
      { w: 20, h: 10, d: 20 },
      'should have correct boundary'
    )

    t.equal(vol.transitRaw(space), 4000, 'should be correct volume in space')
    t.equal(vol.transitRaw(view), 32000, 'should be correct volume in view')

    t.end()
  })
}
