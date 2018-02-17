module.exports = function (el, tr) {
  // Update transformation of a HTMLElement.
  // They are HTMLElements parented on view's container, not nodes on space.
  //
  var prec, s, r, tx, ty

  // Current move.js does not prevent scientific notation reaching CSS
  // which leads to problems with Safari and Opera. Therefore we must
  // prevent the notation here.
  // Of course this will cause a small deviation in the presentation.
  // However the deviation is only in the presentation and thus not a problem.
  prec = 8
  s = tr.s.toFixed(prec)
  r = tr.r.toFixed(prec)
  tx = tr.tx.toFixed(prec)
  ty = tr.ty.toFixed(prec)
  //move(el).matrix(s, r, -r, s, tx, ty).end()

  // matrix(s, r, -r, s, tx, ty)
  el.style.transform = 'matrix(' +
    s + ', ' + r + ', -' + r + ', ' + s + ', ' + tx + ', ' + ty +
  ')'
}
