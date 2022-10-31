const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {

  test('Size:getPlain', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.basis()
    // Create an element
    const hel = tapspace.element('hello', {
      size: { w: 200, h: 200 }
    })
    // Get its size
    const size = hel.getSize()

    t.deepEqual(
      size.getPlain(),
      { w: 200, h: 200 },
      'should convert size to object'
    )

    t.end()
  })
}
