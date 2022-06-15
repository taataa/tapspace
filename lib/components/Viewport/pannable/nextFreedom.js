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
  // Select a pannable freedom based on the current freedom.
  // If the center point is set, lose the center point.
  //
  // Parameters
  //   exFreedom
  //     an object, the current freedom object to replace.
  //   inFreedom
  //     an object, the new freedom properties.
  //
  // Return
  //   a freedom object, the new pannable freedom type
  //

  // Construct freedom based on previous freedom.
  const exType = exFreedom.type

  // Lose the center
  return {
    type: next[exType]
  }
}
