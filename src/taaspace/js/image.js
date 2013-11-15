Taaspace.Image = (function () {
  //
  // An image element.
  //
  // Priority
  //   medium
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Img = function (space, src, options) {
    this._space = space;
    this._src = src;
    
    this._w = 100;
    this._h = 100;
    
    if (typeof options === 'object') {
      if (options.hasOwnProperty('width')) {
        this._w = options.width;
      }
      
      if (options.hasOwnProperty('height')) {
        this._h = options.height;
      }
    }
  };
  
  exports.create = function (space, src, options) {
      return new Img(space, src, options);
  };
  
  Img.prototype = Taaspace.Element.create();
  
  
  
  // Pseudo-private mutators
  
  Img.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    
    var domElem = $(document.createElement('img'));
    domElem.attr('src', this._src);
    domElem.css({
      position: 'absolute',
      width: this._w + 'px',
      height: this._h + 'px'
    });
    
    $(container).append(domElem);
    
    // Init position
    this._domMove(domElem, fromSpace, options);
    
    return domElem;
  };
  
  
  
  ///////////////
  return exports;
}());
