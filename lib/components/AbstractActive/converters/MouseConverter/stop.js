module.exports = (container, handlers) => {
  // Stop mouse conversion
  //
  // Parameters
  //   container
  //     HTMLElement
  //
  var h = handlers
  var c = container

  c.removeEventListener('mousedown', h.onmousedown)
  c.removeEventListener('mousemove', h.onmousemove)
  c.removeEventListener('mouseup', h.onmouseup)
  c.removeEventListener('mouseleave', h.onmouseleave)

  c.removeEventListener('ratstart', h.onratstart)
  c.removeEventListener('ratmove', h.onratmove)
  c.removeEventListener('ratend', h.onratend)
}
