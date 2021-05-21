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
  const s = tr.s.toFixed(PREC)
  const r = tr.r.toFixed(PREC)
  const mr = (-tr.r).toFixed(PREC)
  const tx = tr.tx.toFixed(PREC)
  const ty = tr.ty.toFixed(PREC)

  // matrix(s, r, -r, s, tx, ty)
  el.style.transform = 'matrix(' +
    s + ',' + r + ',' + mr + ',' + s + ',' + tx + ',' + ty +
  ')'
}
