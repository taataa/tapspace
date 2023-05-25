module.exports = function (id, cb) {
  // Register a callback.
  // Modifies the callbacks object.
  //
  const cbs = this.callbacks[id]
  if (cbs) {
    cbs.push(cb)
  } else {
    this.callbacks[id] = [cb]
  }
}
