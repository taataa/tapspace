const Plane = require('../Plane')
const Interactive = require('../Interactive')

const Group = function (element) {
  // tapspace.components.Group(element)
  //
  // Inherits Plane
  // Inherits Interactive
  //
  // A container for affine components.
  // The group element has zero width and height.
  // Still, it can be interacted on its content.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //

  // Use default anchor 0,0
  Plane.call(this, element)
  Interactive.call(this)

  // Add special class
  element.classList.add('affine-group')
}

module.exports = Group
const proto = Group.prototype

// Inherit
Object.assign(proto, Plane.prototype)
Object.assign(proto, Interactive.prototype)

// Functions
Group.create = require('./create')(Group)
