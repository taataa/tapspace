
const Space = function (el) {

}

const proto = Space.prototype

proto.addElementAt = function (element, placement) {
  // Add an existing element into the space.
  //
  // Parameters:
  //   element
  //     HTMLElement
  //   placement
  //     position
  //       Point on the space
  //     gravity
  //       Point on the element
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //     size
  //       Size
  //
  // Return
  //   AffineElement
  //
}

proto.createElementAt = function (placement) {
  // Create a div and add it to the space.
  //
  // Parameters:
  //   placement
  //     position
  //       Point on the space
  //     gravity
  //       Point on the element
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //     size
  //       Size
  //
  // Return
  //   AffineElement
  //
}

module.exports = Space
