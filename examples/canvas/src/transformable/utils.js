
(function closure() {
  var i = 100;

  exports.getIncrementalZIndex = function () {
    i += 1;
    return i;
  };
}());
