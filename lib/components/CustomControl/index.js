const Control = require('../Control')

const CustomControl = function (html) {
  // @CustomControl(html)
  //
  // Inherits Control
  //
  // This control provides a way to display custom HTML content that is
  // fixed to the viewport. Useful for logos, search, and legal text.
  //
  // Parameters:
  //   html
  //     an HTMLElement or HTML string.
  //

  // Create the wrapper element.
  const wrapper = document.createElement('div')

  // Inherit
  Control.call(this, wrapper)

  this.html(html)
}

module.exports = CustomControl
const proto = CustomControl.prototype
proto.isCustomControl = true

// Inherit
Object.assign(proto, Control.prototype)

// Functions
CustomControl.create = require('./create')(CustomControl)

// Methods
proto.html = require('./html')
