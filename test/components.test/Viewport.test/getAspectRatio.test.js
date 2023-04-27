const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Viewport:getAspectRatio', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    t.equal(typeof view.getAspectRatio(), 'number', 'should return number')

    t.end()
  })
}
