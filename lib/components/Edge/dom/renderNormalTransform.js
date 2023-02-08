const PREC = 8
const fine = require('affineplane')
const point3 = fine.point3
const vec3 = fine.vec3

module.exports = function (edge, attractor) {
  // renderNormalTransform(edge, attractor)
  //
  // Draw 3D edge so that it faces the attractor point.
  //
  // Parameters:
  //   edge
  //     an Edge
  //   attractor
  //     a point3, in the edge's basis. Attracts the edge face normal vector.
  //

  // Scale and rotation in a basis vector.
  const tr = edge.tran
  const a = tr.a
  const b = tr.b
  const m = Math.sqrt(a * a + b * b)

  // Vector from edge start to edge end
  const start = edge.startpoint
  const end = edge.endpoint

  const vab = point3.delta(start, end)
  const vac = point3.delta(start, attractor)

  // Construct rotation basis
  const vi = vec3.unit(vab)
  const vj = vec3.unit(vec3.cross(vab, vac))
  const vk = vec3.unit(vec3.cross(vi, vj))

  // Translation correction for edge width towards -vj
  const bw = edge.border.width / 2
  const x = tr.x - bw * vj.x
  const y = tr.y - bw * vj.y
  const z = -tr.z + bw * vj.z

  // Multiply our plane matrix with the rotation.
  //
  //   ┌            ┐┌                  ┐
  //   │ a -b  0  x ││ vi.x vj.x vk.x 0 │
  //   │ b  a  0  y ││ vi.y vj.y vk.y 0 │
  //   │ 0  0  m  z ││ vi.z vj.z vk.z 0 │
  //   │ 0  0  0  1 ││ 0    0    0    1 │
  //   └            ┘└                  ┘
  //

  // m12 = second column, third row
  const m00 = (a * vi.x - b * vi.y).toFixed(PREC)
  const m01 = (b * vi.x + a * vi.y).toFixed(PREC)
  const m02 = (-vi.z * m).toFixed(PREC)
  const m10 = (a * vj.x - b * vj.y).toFixed(PREC)
  const m11 = (b * vj.x + a * vj.y).toFixed(PREC)
  const m12 = (-vj.z * m).toFixed(PREC)
  const m20 = (a * vk.x - b * vk.y).toFixed(PREC)
  const m21 = (b * vk.x + a * vk.y).toFixed(PREC)
  const m22 = (-vk.z * m).toFixed(PREC)
  const m30 = x.toFixed(PREC)
  const m31 = y.toFixed(PREC)
  const m32 = z.toFixed(PREC)

  // matrix3d(a, b, 0, 0, -b, a, 0, 0, 0, 0, m, 0, x, y, z, 1)
  //
  //   ┌            ┐
  //   │ a -b  0  x │
  //   │ b  a  0  y │
  //   │ 0  0  m  z │
  //   │ 0  0  0  1 │
  //   └            ┘
  //
  edge.element.style.transform = 'matrix3d(' +
    m00 + ',' + m01 + ',' + m02 + ',0,' +
    m10 + ',' + m11 + ',' + m12 + ',0,' +
    m20 + ',' + m21 + ',' + m22 + ',0,' +
    m30 + ',' + m31 + ',' + m32 + ',1' +
  ')'
}
