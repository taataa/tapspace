module.exports = function (id, content) {
  // @TreeLoader:placeholder(id, content)
  //
  // Open a placeholder space. Placeholders do not trigger
  // recursive loading.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component
  //

  return this.open(id, content, true)
}
