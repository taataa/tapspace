const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Area:projectTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Virtual camera
    const camDist = 300
    const camera = view.atCenter().offset(0, 0, -camDist)

    // Create an element
    const hello = tapspace.createItem('hello')
    hello.setSize({ w: 20, h: 20 })
    space.addChild(hello, space.at(10, 10, camDist))

    // Create area
    const area = hello.getArea()

    // Original area: 400
    t.equal(
      area.projectTo(view, camera).getNumber(),
      100,
      'should have quarter of original area'
    )

    t.end()
  })
}
