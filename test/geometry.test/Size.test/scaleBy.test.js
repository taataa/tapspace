const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Size:scaleBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = view.createSpace()
    // Create an element
    const hel = tapspace.createItem('hello')
    hel.setSize(200, 200)
    basis.addChild(hel)
    // Get its size
    const size = hel.getSize()

    t.deepEqual(
      size.scaleBy(2).getRaw(),
      { w: 400, h: 400, d: 0 },
      'should double the width and height'
    )

    t.end()
  })
}
