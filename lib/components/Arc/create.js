module.exports = (Arc) => {
  return (angle, border) => {
    // @Arc.create(angle, border)
    // tapspace.createArc
    //
    // Create an Arc item. Arcs are like edges but with a curved shape.
    //
    // Parameters:
    //   angle
    //     a number in degrees. The range is limited between 10 and 180 degrees.
    //   border
    //     a string, the border CSS style, for example '1px solid black'.
    //
    // Return
    //   an Arc
    //
    return new Arc(angle, border)
  }
}
