// Position transformation
//

exports.copy = (tr) => {
  return {
    a: tr.a,
    b: tr.b,
    x: tr.x,
    y: tr.y
  }
}

exports.create = (a, b, x, y) => {
  return {
    a: a,
    b: b,
    x: x,
    y: y
  }
}
