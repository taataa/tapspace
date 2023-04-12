const Plane = require('../Plane')
const InteractiveComponent = require('../InteractiveComponent')

const Group = function (element) {
  // @Group(element)
  //
  // Inherits Plane and InteractiveComponent
  //
  // A container for affine components.
  // The group element has zero width and height.
  // Still, it can be interacted on its content.
  //
  // Parameters:
  //   element
  //     an HTMLElement
  //

  // Use default anchor 0,0
  Plane.call(this, element)
  InteractiveComponent.call(this)

  // Add special class
  element.classList.add('affine-group')
}

module.exports = Group
const proto = Group.prototype
proto.isGroup = true

// Inherit
Object.assign(proto, Plane.prototype)
Object.assign(proto, InteractiveComponent.prototype)

// Functions
Group.create = require('./create')(Group)
