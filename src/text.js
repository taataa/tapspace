Taaspace.Text = (function () {
  //
  // Methods
  //   create(space, string, options)
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Text = function (space, string, options) {
    
    // Normalize parameters
    if (typeof options === 'undefined') {
      options = {};
    }
    
    this._space = space;
    this._string = string;
    
    // Font size
    if (options.hasOwnProperty('fontSize')) {
        this._fontSize = options.fontSize;
    } else {
        this._fontSize = 1;
    }
    
  };
  
  exports.create = function (space, string, options) {
      return new Text(space, string, options);
  };
  
  Text.prototype = Taaspace.Element.create();
  
  
  
  // Mutators
  
  Text.prototype.fontSize = function (newSize, options) {
    // Parameter
    //   Options
    //     Animation
    // 
    // Return
    //   this
    //     for chaining
    this._fontSize = newSize;
    this._space._scaleDomElement(this, options);
    return this;
  };
  
  Text.prototype.fontScale = function (multiplier, options) {
    // Scale font size by multiplier. Do not affect to element width.
    // 
    // Parameter
    //   Options
    //     Animation
    throw 'Not implemented';
  };
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    // 
    // Parameter
    //   container
    //     DOMElement to append to
    //   fromSpace
    //     A function to convert space coordinates to screen coordinates.
    //   options (optional)
    // 
    // Option
    //   disableHTML
    
    // Normalize params
    if (typeof options !== 'object') {
      options = {};
    }
    
    var p = $(document.createElement('p'));
    var span = $(document.createElement('span'));
    p.append(span);
    
    var method = 'html';
    if (options.hasOwnProperty('disableHTML')) {
      if (options.disableHTML === true) {
        method = 'text';
      }
    }
    span[method](this._string);
    
    p.css({
      position: 'absolute',
    });
    
    $(container).append(p);
    
    // Init position
    this._domMove(p, fromSpace, options);
    
    return p;
  };
  
  Text.prototype._domScale = function (domElem, fromSpace, scale, options) {
    
    var nw = fromSpace(this._x, this._y);
    var se = fromSpace(this._x + this._w, this._y + this._h);
    
    // :/ We should have direct reference to the child element to
    // make things fast
    
    domElem.children().css('font-size', (this._fontSize * scale) + 'em');
    domElem.css({
      left: nw.x + 'em',
      top: nw.y + 'em',
      width: (se.x - nw.x) + 'em',
      height: (se.y - nw.y) + 'em'
    });
  };
  
  
  
  ///////////////
  return exports;
}());
