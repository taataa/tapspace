const PHI = (1 + Math.sqrt(5)) / 2
const LOGPHI = Math.log(PHI)

module.exports = (capturer) => {
  return () => {
    // The current distance, measured on the viewport.
    const dist = capturer.viewport.getDistanceTo(capturer.target)

    // Normalize prevDist
    // let prevDist
    if (capturer.previousDistance) {
      // prevDist = capturer.previousDistance
    } else {
      // init
      capturer.previousDistance = dist
      // prevDist = dist
    }

    // Compute shell size in geometric progression of phi
    // phi^x = dist
    // x = log(dist) / log(phi)
    const shell = Math.floor(Math.log(dist.dist) / LOGPHI)

    // Normalize prevShell
    let prevShell
    if (capturer.previousShell) {
      prevShell = capturer.previousShell
    } else {
      // init
      capturer.previousShell = shell
      prevShell = shell
    }

    if (shell === prevShell) {
      // Same shell, no emissions.
      return
    }

    // Different band, emit.
    if (shell < prevShell) {
      // Getting closer
      capturer.emit('cameraenter', {
        shell: shell,
        distance: dist,
        // TODO cover
        viewport: capturer.viewport
      })
    } else {
      // Escaping farther
      capturer.emit('cameraleave', {
        shell: prevShell,
        distance: dist,
        // TODO cover
        viewport: capturer.viewport
      })
    }
  }
}
