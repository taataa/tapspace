const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:at', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    const item = tapspace.createItem('<h1>Hello</h1>')
    basis.addChild(item)
    item.translateBy({ x: 10, y: 6 })

    const xyOnElem = item.at(0, 0)
    const xyOnView = item.at(0, 0).changeBasis(view)

    t.equal(xyOnElem.basis, item, 'item is the basis')
    t.equal(xyOnElem.point.x, 0)
    t.equal(xyOnElem.point.y, 0)
    t.equal(xyOnView.basis, view, 'view is the basis')
    t.equal(xyOnView.point.x, 10, 'view x match')
    t.equal(xyOnView.point.y, 6, 'view y match')

    t.end()
  })
}
