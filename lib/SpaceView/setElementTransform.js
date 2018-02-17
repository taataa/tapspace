var PREC = 8

module.exports = function (el, tr) {
  // Update transformation of a HTMLElement.
  // They are HTMLElements parented on view's container, not nodes on space.
  //
  var s, r, mr, tx, ty

  // Current move.js does not prevent scientific notation reaching CSS
  // which leads to problems with Safari and Opera. Therefore we must
  // prevent the notation here.
  // Of course this will cause a small deviation in the presentation.
  // However the deviation is only in the presentation and thus not a problem.
  s = tr.s.toFixed(PREC)
  r = tr.r.toFixed(PREC)
  mr = (-tr.r).toFixed(PREC)
  tx = tr.tx.toFixed(PREC)
  ty = tr.ty.toFixed(PREC)

  // matrix(s, r, -r, s, tx, ty)
  el.style.transform = 'matrix(' +
    s + ',' + r + ',' + mr + ',' + s + ',' + tx + ',' + ty +
  ')'
}
