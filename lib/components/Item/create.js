module.exports = (Item) => {
  return (content) => {
    // @tapspace.createItem(content)
    //
    // Make an affine item from HTML content. Wraps the content inside a div.
    //
    // Parameters:
    //   content
    //     an HTMLElement or HTML string. The given element(s) will be
    //     ..wrapped in a div.
    //
    // Return
    //   a Item
    //

    // Create a new wrapper element.
    const element = document.createElement('div')

    const item = new Item(element)

    // Insert the content
    item.html(content)

    return item
  }
}
