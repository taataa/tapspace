const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:fromPoints', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createCircle(2, 'black')
    space.addChild(item, space.at(4, 2, 1))

    // A bunch of points:
    //
    // +orig
    //     +p0     +p1
    //         +item
    //         +p2
    //
    // Unit:
    // ++ 1
    // +--+ 2
    // +----+ 3
    //
    const points = [
      view.at(2, 1),
      space.at(6, 1),
      item.at(2, 3)
    ]

    // Get the box, represent on item
    const bounds = tapspace.geometry.Box.fromPoints(item, points)

    t.deepEqual(
      bounds.getSize().getRaw(),
      { w: 4, h: 2, d: 1 },
      'should have correct depth'
    )

    t.end()
  })
}
