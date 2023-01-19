const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:rotateBy', (t) => {
    // Setting
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = view.createSpace()

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(400, 200)
    basis.addChild(item)

    item.rotateBy(Math.PI / 2, item.atTopLeft())
    // Bring back to visible area
    item.matchPoints(item.atBottomLeft(), view.at(0, 0))

    setTimeout(() => {
      t.notEqual(document.elementFromPoint(300, 100),
        item.element, 'item not at 300,100')
      t.equal(document.elementFromPoint(100, 300),
        item.element, 'item at 100,300')

      t.end()
    }, 10)
  })
}
