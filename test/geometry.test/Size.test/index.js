const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Size:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.addBasis()
    // Create an element
    const hel = tapspace.element('hello')
    hel.setSize({ w: 200, h: 200 })
    basis.add(hel)
    // Get its size
    const size = hel.getSize()

    t.deepEqual(
      size.getRaw(),
      { w: 200, h: 200 },
      'should convert size to object'
    )

    t.end()
  })

  test('Size:scaleBy', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.addBasis()
    // Create an element
    const hel = tapspace.element('hello')
    hel.setSize(200, 200)
    basis.add(hel)
    // Get its size
    const size = hel.getSize()

    t.deepEqual(
      size.scaleBy(2).getRaw(),
      { w: 400, h: 400 },
      'should double the width and height'
    )

    t.end()
  })
}
