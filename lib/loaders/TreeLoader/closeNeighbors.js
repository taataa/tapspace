module.exports = function (id, depth) {
  // Close those neighbors that are at the given depth or farther.
  //

  const space = this.spaces[id]

  if (!space) {
    return
  }

  const neighborIds = Object.keys(this.spaces)

  const depths = neighborIds.map(nid => {
    const neighbor = this.spaces[nid]
    return {
      id: nid,
      space: neighbor,
      depth: this.getTreeDistance(id, nid)
    }
  })

  depths.forEach(d => {
    if (d.depth >= depth) {
      delete this.spaces[d.id]
      d.space.remove()
    }
  })
}
