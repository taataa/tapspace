module.exports = function (id, content) {
  // @TreeLoader:addPlaceholder(id, content)
  //
  // Add a placeholder space. Placeholders do not trigger
  // recursive loading.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component
  //

  return this.addSpace(id, content, true)
}
