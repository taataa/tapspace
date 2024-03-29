const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Path:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace().setParent(view)

    // Create a Path
    const path = [
      { x: 1, y: 2, z: 3 },
      { x: 2, y: 3, z: 4 },
      { x: 3, y: 4, z: 5 }
    ]
    const ps = new tapspace.geometry.Path(basis, path)

    t.deepEqual(
      ps.getRaw(),
      path,
      'should convert to path3'
    )

    t.end()
  })
}
