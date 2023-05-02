const template = require('./template.ejs')
const hierarchy = require('./hierarchy.ejs')

module.exports = (test, container, tapspace) => {
  //
  const BasisComponent = tapspace.components.BasisComponent

  test('BasisComponent:removeChild', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // HACK Construct a hierarchy of nodes
    space.element.innerHTML = hierarchy()
    // eslint-disable-next-line
    const na = new BasisComponent(space.element.querySelector('#affine-a'))
    const naa = new BasisComponent(space.element.querySelector('#affine-aa'))
    const naaa = new BasisComponent(space.element.querySelector('#affine-aaa'))
    const naab = new BasisComponent(space.element.querySelector('#affine-aab'))
    // const naac = document.querySelector('#nonaffine-aac')
    // naac is not affine

    // Ensure connected
    t.equal(
      naab.getViewport(),
      view,
      'should be connected to view'
    )

    // Remove leaf
    naab.remove()
    t.equal(
      naab.getViewport(),
      null,
      'should be disconnected via remove'
    )

    // Ensure connected
    t.equal(
      naaa.getViewport(),
      view,
      'should be connected to view'
    )

    // Remove child
    naa.removeChild(naaa)
    t.equal(
      naaa.getViewport(),
      null,
      'should be disconnected via removeChild'
    )

    t.end()
  })
}
