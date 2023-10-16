const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Viewport:measureGroup', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')

    // Populate space
    const space0 = tapspace.createSpace()
    const space1 = tapspace.createSpace()
    view.addChild(space0, view.at(0, 0))
    view.addChild(space1, view.at(100, 100))
    space1.scaleBy(2)
    // Items to measure
    const item00 = tapspace.createNode(10)
    const item01 = tapspace.createNode(10)
    space0.addChild(item00, space0.at(10, 20))
    space0.addChild(item01, space0.at(20, 40))
    const item10 = tapspace.createNode(10)
    space1.addChild(item10, space1.at(10, 20))

    const measures0 = view.measureGroup(space0)
    t.equal(measures0.length, 3, 'should have three measurements')
    t.equal(measures0[0].target, space0, 'should have space as first')
    t.equal(measures0[1].target, item00, 'should have item as second')
    t.equal(measures0[1].dilation, 1, 'should have correct dilation')
    t.equal(measures0[1].areaPx, 400, 'should have correct area')

    const measures1 = view.measureGroup(space1)
    t.equal(measures1.length, 2, 'should have num of measurements')
    t.equal(measures1[1].dilation, 2, 'should have scaled dilation')
    t.equal(measures1[1].areaPx, 1600, 'should have scaled area')

    t.end()
  })
}
