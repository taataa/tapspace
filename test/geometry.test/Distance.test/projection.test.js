const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Distance :projectTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace().setParent(view)

    // Virtual camera
    const camDist = 300
    const camera = view.atCenter().offset(0, 0, -camDist)

    // Move the space by the default cam distance for nice half scale
    space.translateBy({ x: 0, y: 0, z: camDist })

    const dist = new tapspace.geometry.Distance(space, 100)
    const distProj = dist.projectTo(view, camera)

    t.equal(distProj.getNumber(), 50, 'shrinks to half due to perspective')

    t.end()
  })
}
