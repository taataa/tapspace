module.exports = function (id, err) {
  // Resolve callbacks
  //
  setTimeout(() => {
    const cbs = this.callbacks[id]
    if (cbs) {
      delete this.callbacks[id]
      if (err) {
        cbs.forEach(cb => cb(err))
      } else {
        const space = this.spaces[id]
        if (space) {
          cbs.forEach(cb => cb(null, id, space))
        } else {
          cbs.forEach(cb => cb(null, id, null))
        }
      }
    }
  }, 0)
}
