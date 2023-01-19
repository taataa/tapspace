const template = require('./template.ejs')

module.exports = (test, container, tapspace) => {
  //
  test('Basis:setId', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = view.createSpace()

    // Set basis id
    basis.setId('hero')

    // Common with self
    t.equal(basis.element.id, 'hero', 'should be new element id')

    t.end()
  })
}
