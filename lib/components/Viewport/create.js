module.exports = (Viewport) => {
  return function (element) {
    // @tapspace.createView(element)
    // @Viewport.create
    //
    // Create a Viewport from an HTMLElement. The viewport provides means to
    // display and navigate one or many Space components and their contents.
    // Internally Viewport maintains an hyperspace with a floating origin
    // in order to handle numeric over- and underflows between remote spaces.
    //
    // Example:
    // ```
    // const view = tapspace.createView('#tapspace')
    // const space = tapspace.createSpace()
    // view.addSpace(space, view.atCenter())
    // ```
    //
    // Parameters
    //   element
    //     an HTMLElement or query string. The element will become
    //     .. the root container for viewport and spaces.
    //
    // Return
    //   a Viewport
    //

    if (typeof element === 'string') {
      // Treat as selector string. The querySelector returns the first match.
      // If not found, results null
      element = document.querySelector(element)
    }

    if (!element) {
      throw new Error('Invalid viewport element or query string')
    }

    const view = new Viewport(element)

    return view
  }
}
