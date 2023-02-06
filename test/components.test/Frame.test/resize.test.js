const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Frame:resize', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(400, 200)
    item.setAnchor(200, 100)
    space.addChild(item, space.at(200, 100))

    // Ensure setup
    t.almostEqualPoint(
      item.at(0, 0).changeBasis(view),
      view.at(0, 0),
      'should match viewport'
    )

    // Resize operation
    item.resize({ w: 300, h: 100 }, item.atBottomRight())

    t.almostEqualPoint(
      item.at(0, 0).changeBasis(view),
      view.at(100, 100),
      'should have moved'
    )

    t.almostEqualPoint(
      item.atBottomRight().changeBasis(view),
      view.at(400, 200),
      'should have preserved corner position'
    )

    t.almostEqualPoint(
      item.atAnchor().changeBasis(view),
      view.at(250, 150),
      'should have preserved origin at middle'
    )

    t.end()
  })
}
