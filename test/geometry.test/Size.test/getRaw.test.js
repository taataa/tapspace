const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Size:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = view.createSpace()
    // Create an element
    const hel = tapspace.createItem('hello')
    hel.setSize({ w: 200, h: 200 })
    basis.addChild(hel)
    // Get its size
    const size = hel.getSize()

    t.deepEqual(
      size.getRaw(),
      { w: 200, h: 200, d: 0 },
      'should convert size to object'
    )

    t.end()
  })
}
