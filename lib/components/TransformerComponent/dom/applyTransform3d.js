const PREC = 8

module.exports = function (el, tr) {
  // Update transformation of an HTMLElement.
  // They are HTMLElements parented on view's container, not nodes on space.
  //

  // If toString were used scientific notation might reach CSS
  // which leads to problems with Safari and Opera.
  // Therefore we must prevent the notation here with toFixed.
  // Of course this will cause a small deviation in the presentation.
  // However, the deviation is only in the presentation (not in the model)
  // and thus not a problem.
  const a = tr.a.toFixed(PREC)
  const b = tr.b.toFixed(PREC)
  const ib = (-tr.b).toFixed(PREC)
  const x = tr.x.toFixed(PREC)
  const y = tr.y.toFixed(PREC)
  // Browsers have negated z axis.
  const iz = (-tr.z).toFixed(PREC)
  // Uniform scale also along z. Otherwise children appear at non-scaled depth.
  const m = Math.sqrt(tr.a * tr.a + tr.b * tr.b).toFixed(PREC)

  // matrix3d(a, b, 0, 0, -b, a, 0, 0, 0, 0, m, 0, x, y, z, 1)
  //
  //   ┌            ┐
  //   │ a -b  0  x │
  //   │ b  a  0  y │
  //   │ 0  0  m  z │
  //   │ 0  0  0  1 │
  //   └            ┘
  //
  el.style.transform = 'matrix3d(' +
    a + ',' + b + ',' + '0,0,' +
    ib + ',' + a + ',' + '0,0,' +
    '0,0,' + m + ',0,' +
    x + ',' + y + ',' + iz + ',1' +
  ')'
}
