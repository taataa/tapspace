const nextWithCenter = {
  I: 'S',
  T: 'S',
  S: 'S',
  R: 'SR',
  TS: 'S',
  TR: 'SR',
  SR: 'SR',
  TSR: 'SR'
}

const nextWithoutCenter = {
  I: 'TS',
  T: 'TS',
  S: 'S', // around original center
  R: 'RS', // around original center
  TS: 'TS',
  TR: 'TSR',
  SR: 'SR', // around original center
  TSR: 'TSR'
}

module.exports = (freedom, hasCenter) => {
  // Select a zoomable freedom based on the current freedom
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
