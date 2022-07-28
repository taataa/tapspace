const Component = require('./index')

module.exports = (content, options) => {
  // taataa.component(content, options)
  //
  // Make element an affine component. Wraps the content inside
  // an affine div.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string. The given element(s) will be
  //     ..wrapped in a div.
  //   options
  //     optional object with properties
  //       id
  //         a string, optional. The id attribute of the wrapper element.
  //       className
  //         a string, optional. The class attribute of the wrapper element.
  //       anchor
  //         { x, y } on the element. Default {x:0,y:0}
  //       size
  //         { width, height }
  //
  // Return
  //   a tapspace.components.Component
  //
  return new Component(content, options)
}
