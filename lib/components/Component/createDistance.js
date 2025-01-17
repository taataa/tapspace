const Distance = require('../../geometry/Distance')

module.exports = function (dist) {
  // @Component:createDistance(dist)
  //
  // Create a Distance relative to the component.
  //
  // Parameters
  //   dist
  //     a number, a distance in the coordinate space of the component.
  //
  // Return
  //   a Distance
  //

  if (typeof dist !== 'number') {
    throw new Error('Invalid distance. Must be a number.')
  }

  return new Distance(this, dist)
}
