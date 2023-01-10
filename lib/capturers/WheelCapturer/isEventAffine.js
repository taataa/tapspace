module.exports = (ev) => {
  // isEventAffine(ev)
  //
  // Check if event can be used for affine interaction.
  //
  // Returns:
  //   boolean
  //
  if (ev.target.affine) {
    return true
  }
  // Find if the current target is a part of a proxy.
  // If the item itself is a proxy, then the target is a part of a proxy.
  if (ev.currentTarget.classList.contains('affine-proxy')) {
    return true
  }
  // Find if proxy by recursively checking from target until the item.
  let t = ev.target
  while (t && t !== ev.currentTarget) {
    if (t.classList.contains('affine-proxy')) {
      return true
    }
    t = t.parentElement
  }
  // Not affine and not proxy. Thus pass.
  return false
}
