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

module.exports = (exFreedom, inFreedom) => {
  // Select a rotateable freedom based on the current freedom
  // and if the center point has been set.
  //
  // Parameters
  //   exFreedom
  //     an object, the current freedom object to replace.
  //   inFreedom
  //     an object, the new freedom properties
  //
  // Return
  //   a freedom object, the new rotatable freedom type
  //

  // Use the old center if none given.
  const center = inFreedom.center || exFreedom.center
  const hasCenter = !!center

  // Construct freedom based on previous freedom.
  const exType = exFreedom.type

  // If center point is given, do not allow translation.
  if (hasCenter) {
    return {
      type: nextWithCenter[exType],
      center: center
    }
  }

  // No fixed center point given.
  return {
    type: nextWithoutCenter[exType]
  }
}
