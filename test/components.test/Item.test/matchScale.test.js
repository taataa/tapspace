const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:matchScale', (t) => {
    // Setting
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()

    const ref = tapspace.createItem('<h1>Hello</h1>')
    ref.setSize(200, 200)
    ref.setAnchor(0, 0)
    space.addChild(ref)
    ref.setScale(2)

    const item = tapspace.createItem('<h1>World</h1>')
    item.setSize(200, 200)
    item.setAnchor(0, 0)
    space.addChild(item)

    item.matchScale(ref, item.atBottomRight())

    t.almostEqualPoint(
      item.at(0, 0).changeBasis(space),
      space.at(-200, -200),
      'should have doubled about corner'
    )

    t.equal(
      item.getScale().transitRaw(space),
      2,
      'should have correct scale'
    )

    t.end()
  })
}
