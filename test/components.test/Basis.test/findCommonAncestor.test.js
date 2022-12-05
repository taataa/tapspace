const template = require('./template.ejs')
const hierarchy = require('./hierarchy.ejs')

module.exports = (test, container, tapspace) => {
  //
  const Basis = tapspace.components.Basis

  test('findCommonAncestor', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.createSpace('#testspace')
    const basis = space.addBasis()

    // Construct a hierarchy of nodes
    basis.element.innerHTML = hierarchy()
    const na = new Basis(basis.element.querySelector('#affine-a'))
    const naa = new Basis(basis.element.querySelector('#affine-aa'))
    const naaa = new Basis(basis.element.querySelector('#affine-aaa'))
    const naab = new Basis(basis.element.querySelector('#affine-aab'))
    const naac = document.querySelector('#nonaffine-aac')
    // naac is not affine

    // Common with self
    t.equal(
      na.findCommonAncestor(na),
      na,
      'closest common with self'
    )

    // Common ancestor of non-affine
    t.equal(
      na.findCommonAncestor(naac),
      null,
      'non-affine cannot have common'
    )

    // Parent-child
    t.equal(
      na.findCommonAncestor(naa),
      na,
      'parent itself is the closest common'
    )

    // Ancestor
    t.equal(
      na.findCommonAncestor(naaa),
      na,
      'ancestor is the closest common'
    )

    // Common parent
    t.equal(
      naaa.findCommonAncestor(naab),
      naa,
      'common parent is the closest common'
    )

    t.end()
  })
}
