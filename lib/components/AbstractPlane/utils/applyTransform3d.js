const PREC = 8

module.exports = function (el, tr) {
  // Update transformation of a HTMLElement.
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
  const mb = (-tr.b).toFixed(PREC)
  const x = tr.x.toFixed(PREC)
  const y = tr.y.toFixed(PREC)
  const z = tr.z.toFixed(PREC)

  // matrix3d(a, b, 0, 0, -b, a, 0, 0, 0, 0, 0, 0, x, y, z, 1)
  el.style.transform = 'matrix(' +
    a + ',' + b + ',' + '0,0,' +
    mb + ',' + a + ',' + '0,0,0,0,0,0,' +
    x + ',' + y + ',' + z + ',1' +
  ')'
}
