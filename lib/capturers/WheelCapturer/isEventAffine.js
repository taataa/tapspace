module.exports = (ev) => {
  // isEventAffine(ev)
  //
  // Check if event can be used for affine interaction.
  //
  // Returns:
  //   boolean
  //

  // Shortcircuit if event is handled. See [GestureCapturer:Sensor:3].
  if (ev.defaultPrevented) {
    return false
  }

  if (ev.target.affine) {
    return true
  }
  // Find if the current target is a part of a wheel proxy.
  // If the item itself is a proxy, then the target is a part of a proxy.
  if (ev.currentTarget.classList.contains('affine-proxy-wheel')) {
    return true
  }
  // Find if proxy by recursively checking from target until the item.
  let t = ev.target
  while (t && t !== ev.currentTarget) {
    if (t.classList.contains('affine-proxy-wheel')) {
      return true
    }
    t = t.parentElement
  }
  // Not affine and not proxy. Thus pass.
  return false
}
