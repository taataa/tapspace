const PREC = 8
const fine = require('affineplane')
const vec2 = fine.vec2

module.exports = function (edge) {
  // renderOrthogonalTransform(edge)
  //
  // Draw flat 2D edge.
  //

  // Edge basis
  const tr = edge.tran
  const a = tr.a
  const b = tr.b
  const m = Math.sqrt(a * a + b * b)
  const x = tr.x
  const y = tr.y

  // Start and end points are in inner basis.
  // Starting point is always zero.
  // const start = this.startpoint
  const endpoint = edge.endpoint

  // We trust the edge element width already matches
  // the distance from the start point to the end point.
  // Therefore the task is to find a rotation that will be applied to
  // the tran.
  //   a -b  x   c -d  0   ac-bd -ad-bc  x
  //   b  a  y * d  c  0 = bc+ad -bd+ac  y
  //   0  0  1   0  0  1   0      0      1
  const dir = vec2.unit(endpoint)
  const c = dir.x
  const d = dir.y

  // Adjust translation for the edge width.
  // The adjustment must be done perpendicular to dir.
  // Thus rotate dir -90deg. Then remember that translation is in outer basis.
  // Thus transit the adjustment to outer basis.
  //   a -b    0  1   c   a -b    d   ad+bc
  //   b  a * -1  0 * d = b  a * -c = bd-ac
  const adbc = a * d + b * c
  const bdac = b * d - a * c
  // Half of the border width is the distance of the adjustment.
  const bw = edge.border.width / 2
  const dx = bw * adbc
  const dy = bw * bdac

  // m12 = second column, third row
  const m00 = (-bdac).toFixed(PREC)
  const m01 = (adbc).toFixed(PREC)
  const m10 = (-adbc).toFixed(PREC)
  const m11 = m00
  const m20 = (x + dx).toFixed(PREC)
  const m21 = (y + dy).toFixed(PREC)

  // matrix(m00, m01, m10, m11, m20, m21)
  //   m00 m10 m20
  //   m01 m11 m21
  //   0   0   1
  edge.element.style.transform = 'matrix(' +
    m00 + ',' + m01 + ',' +
    m10 + ',' + m11 + ',' +
    m20 + ',' + m21 +
  ')'
}
