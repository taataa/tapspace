const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Area:transitRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    space.scaleBy(2, space.at(0, 0))

    // Create an element
    const hello = tapspace.createItem('hello')
    hello.setSize({ w: 20, h: 20 })
    space.addChild(hello, space.at(10, 10, 10))

    // Create area
    const area = hello.getArea()

    t.deepEqual(area.getRaw(), 400, 'should have correct area')
    t.deepEqual(area.transitRaw(view), 1600, 'should scale as area')

    t.end()
  })
}
