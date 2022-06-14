const nextWithCenter = {
  I: 'R',
  T: 'R',
  S: 'SR',
  R: 'R',
  TS: 'SR',
  TR: 'R',
  SR: 'SR',
  TSR: 'SR'
}

const nextWithoutCenter = {
  I: 'TR',
  T: 'TR',
  S: 'RS', // around original center
  R: 'R', // around original center
  TS: 'TSR',
  TR: 'TR',
  SR: 'SR', // around original center
  TSR: 'TSR'
}

module.exports = (freedom, hasCenter) => {
  // Select a rotateable freedom based on the current freedom
  // and if the center point has been set.
  //
  // Parameters
  //   freedom
  //     a string, the current freedom to replace.
  //   hasCenter
  //     a boolean, true if the center point is currently set
  //     ..or will be set by the ability.
  //
  // Return
  //   a string, the new zoomable freedom type
  //

  if (hasCenter) {
    // If center point is given, do not allow translation.
    return nextWithCenter[freedom]
  }

  // No fixed center point given. Enable translation if no center set.
  return nextWithoutCenter[freedom]
}
