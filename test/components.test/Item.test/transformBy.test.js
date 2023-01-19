const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:transformBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = view.createSpace()

    const tr = tapspace.geometry.Transform.fromFeatures({
      basis: view,
      rotate: Math.PI / 6, // rotate 30 degrees clockwise
      scale: 0.5
    })

    const item = tapspace.createItem('Hello')
    item.setSize(400, 200)
    basis.addChild(item)

    // Allow browser a moment to render
    setTimeout(() => {
      t.equal(document.elementFromPoint(100, 100),
        item.element, 'item not at 100,100')
      item.transformBy(tr, item.atTopRight())

      // Allow browser a moment to render
      setTimeout(() => {
        t.notEqual(document.elementFromPoint(100, 100),
          item.element, 'item not at 100,100')

        t.end()
      }, 0)
    }, 0)
  })
}
