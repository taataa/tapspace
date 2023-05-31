module.exports = function (id, content) {
  // @TreeLoader:placeholder(id, content)
  //
  // Open a placeholder space.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component
  //   isPlaceholder
  //     optional boolean, default false. Set true to prevent
  //     .. loading propagation to neighbors.
  //

  return this.open(id, content, true)
}
