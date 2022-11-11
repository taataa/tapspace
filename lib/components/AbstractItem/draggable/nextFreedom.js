const next = {
  I: 'T',
  T: 'T',
  S: 'TS',
  R: 'TR',
  TS: 'TS',
  TR: 'TR',
  SR: 'TSR',
  TSR: 'TSR'
}

module.exports = (exFreedom, inFreedom) => {
  // Select a draggable freedom based on the current freedom.
  // If the center point is set, lose the center point.
  // If the slide angle is set, lose the angle.
  //
  // Parameters
  //   exFreedom
  //     an object, the current freedom object to replace.
  //   inFreedom
  //     an object, the new freedom properties.
  //
  // Return
  //   a freedom object, the new draggable freedom type
  //

  // Construct freedom based on previous freedom.
  const exType = exFreedom.type

  // Lose the center and angle.
  return {
    type: next[exType]
  }
}
