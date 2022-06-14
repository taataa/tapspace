module.exports = (ev, system) => {
  // Pick cursor position according to the selected coordinate system.
  // See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
  // for available systems.
  //
  // Parameters
  //   ev
  //     a wheel event
  //   system
  //     string, the coordinate system. Default 'page'.
  //
  // Return
  //   a point2
  //
  switch (system) {
    case 'client':
      return {
        x: ev.clientX,
        y: ev.clientY
      }
    case 'offset':
      return {
        x: ev.offsetX,
        y: ev.offsetY
      }
    case 'page':
      return {
        x: ev.pageX,
        y: ev.pageY
      }
    case 'screen':
      return {
        x: ev.screenX,
        y: ev.screenY
      }
    default:
      return {
        x: ev.pageX,
        y: ev.pageY
      }
  }
}
