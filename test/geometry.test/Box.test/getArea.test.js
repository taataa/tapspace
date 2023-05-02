const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getArea', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('hello')
    item.setSize(20, 10)
    space.addChild(item, space.at(10, 20, 30))

    // Get a box
    const box = item.getBoundingBox()
    // Get area
    const area = box.getArea()

    t.deepEqual(area.transitRaw(view), 200, 'should be correct area')

    t.end()
  })
}
