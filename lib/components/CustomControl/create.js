module.exports = (CustomControl) => {
  return (content) => {
    // @tapspace.createControl(content)
    // @CustomControl.create
    //
    // Create a viewport control with custom HTML content.
    // Useful for logos, search, and legal text.
    //
    // Parameters:
    //   content
    //     an HTMLElement or HTML string. The given element(s) will be
    //     ..wrapped in a div.
    //
    // Return
    //   a CustomControl
    //
    return new CustomControl(content)
  }
}
