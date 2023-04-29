const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Viewport:getFieldOfView', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    const fov = view.getFieldOfView()
    t.equal(typeof fov, 'object', 'should return object')
    t.equal(typeof fov.horizontal, 'number', 'should have horizontal')
    t.equal(typeof fov.vertical, 'number', 'should have vertical')
    t.ok(fov.horizontal > 0, 'horizontal fov should be positive')
    t.ok(fov.vertical > 0, 'vertical fov should be positive')

    t.end()
  })
}
