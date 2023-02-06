const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Orientation:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createItem('<p>Hello</p>')
    item.setSize(200, 200)
    space.addChild(item)

    item.rotateBy(Math.PI)
    const orientation = item.getOrientation()

    t.almostEqualOrientation(
      orientation.changeBasis(view).getRaw(),
      { a: -1, b: 0 },
      'should produce plain object'
    )

    t.end()
  })
}
