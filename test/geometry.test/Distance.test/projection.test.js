const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Distance :projectTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace().setParent(view)
    // Move the space by the default cam distance for nice half scale
    space.translateBy({ x: 0, y: 0, z: 300 })

    const dist = new tapspace.geometry.Distance(space, 100)
    const distProj = dist.projectTo(view, view.atCamera())
    const distProjDefault = dist.projectTo(view)
    console.log(distProj)

    t.true(distProj.isAlmostEqual(distProjDefault), 'default at camera')

    t.equal(distProj.getNumber(), 50, 'shrinks to half due to perspective')

    t.end()
  })
}
