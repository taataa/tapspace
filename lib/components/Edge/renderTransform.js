const PREC = 8
const math = require('affineplane')

module.exports = function (opts) {

  const tr = this.tran
  const el = this.element

  const a = tr.a.toFixed(PREC)
  const b = tr.b.toFixed(PREC)
  // const mb = (-tr.b).toFixed(PREC)
  // const x = tr.x.toFixed(PREC)
  // const y = tr.y.toFixed(PREC)
  // const z = -tr.z.toFixed(PREC)

  // HACK
  const view = this.getRoot()
  const camera = view.atCamera().changeBasis(this)

  // Vector from edge start to edge end
  const start = this.startpoint
  const end = this.endpoint

  const vab = math.point3.delta(start, end)
  const vac = math.point3.delta(start, camera)

  // Construct rotation basis
  const vi = math.vec3.unit(vab)
  const vj = math.vec3.unit(math.vec3.cross(vab, vac))
  const vk = math.vec3.unit(math.vec3.cross(vi, vj))

  // Translation correction for edge width towards -vj
  const bw = this.border.width / 2
  const x = (tr.x - bw * vj.x).toFixed(PREC)
  const y = (tr.y - bw * vj.y).toFixed(PREC)
  const z = (-tr.z + bw * vj.z).toFixed(PREC)

  // Multiply our plane matrix with the rotation.
  //
  //   ┌            ┐┌                  ┐
  //   │ a -b  0  x ││ vi.x vj.x vk.x 0 │
  //   │ b  a  0  y ││ vi.y vj.y vk.y 0 │
  //   │ 0  0  1  z ││ vi.z vj.z vk.z 0 │
  //   │ 0  0  0  1 ││ 0    0    0    1 │
  //   └            ┘└                  ┘
  //

  // m12 = second column, third row
  const m00 = (a * vi.x - b * vi.y).toFixed(PREC)
  const m01 = (b * vi.x + a * vi.y).toFixed(PREC)
  const m02 = (-vi.z).toFixed(PREC)
  const m10 = (a * vj.x - b * vj.y).toFixed(PREC)
  const m11 = (b * vj.x + a * vj.y).toFixed(PREC)
  const m12 = (-vj.z).toFixed(PREC)
  const m20 = (a * vk.x - b * vk.y).toFixed(PREC)
  const m21 = (b * vk.x + a * vk.y).toFixed(PREC)
  const m22 = (-vk.z).toFixed(PREC)

  // matrix3d(a, b, 0, 0, -b, a, 0, 0, 0, 0, 1, 0, x, y, z, 1)
  //
  //   ┌            ┐
  //   │ a -b  0  x │
  //   │ b  a  0  y │
  //   │ 0  0  1  z │
  //   │ 0  0  0  1 │
  //   └            ┘
  //
  el.style.transform = 'matrix3d(' +
    m00 + ',' + m01 + ',' + m02 + ',0,' +
    m10 + ',' + m11 + ',' + m12 + ',0,' +
    m20 + ',' + m21 + ',' + m22 + ',0,' +
    x + ',' + y + ',' + z + ',1' +
  ')'
}
