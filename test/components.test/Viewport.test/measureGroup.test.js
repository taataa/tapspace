const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Viewport:measureGroup', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const c = view.getCameraDistance().getNumber()

    // Populate space
    const space0 = tapspace.createSpace()
    const space1 = tapspace.createSpace()
    view.addChild(space0, view.at(0, 0))
    view.addChild(space1, view.at(100, 100))
    space1.scaleBy(2)
    // Items to measure
    const item00 = tapspace.createCircle(10)
    const item01 = tapspace.createCircle(10)
    space0.addChild(item00, space0.at(10, 20, c))
    space0.addChild(item01, space0.at(20, 40, c + c))
    const item10 = tapspace.createCircle(10)
    space1.addChild(item10, space1.at(10, 20, c / 2))

    const measures = view.measureGroup(space0)
    t.equal(measures.length, 3, 'should have three measurements')
    t.equal(measures[0].target, space0, 'should have space as first')
    t.equal(measures[1].target, item00, 'should have item as second')
    t.equal(measures[1].dilation, 0.5, 'should have correct dilation')
    t.equal(measures[1].areaPx, 100, 'should have projected area')

    const measures1 = view.measureGroup(space1)
    t.equal(measures1.length, 2, 'should have num of measurements')
    t.equal(measures1[1].dilation, 1, 'should have scaled dilation')

    t.end()
  })
}
