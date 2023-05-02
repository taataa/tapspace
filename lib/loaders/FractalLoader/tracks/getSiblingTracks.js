module.exports = (tracker, backtracker, track) => {
  // Get tracks of the siblings of the given ID.
  //
  // Parameters:
  //   tracker
  //     a forward-tracking function
  //   backtracker
  //     a backward-tracking function
  //   track
  //     the origin track
  //
  // Return:
  //   array of track, excluding the track with the given id.
  //   .. The track ids are quaranteed to be unique.
  //

  // Do back and forward tracking to get the siblings.
  const possibleSiblings = {}
  const parentTracks = backtracker([track])

  parentTracks.forEach((parentTrack) => {
    const childTracks = tracker([parentTrack])
    childTracks.forEach((childTrack) => {
      const childId = childTrack.id
      possibleSiblings[childId] = childTrack
    })
  })

  // Exclude given track
  delete possibleSiblings[track.id]

  const siblingTracks = Object.values(possibleSiblings)

  return siblingTracks
}
