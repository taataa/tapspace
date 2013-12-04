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
    
    this._w = null; // Set at the latest when appending HTML
    this._h = null;
    
    if (typeof options === 'object') {
      if (options.hasOwnProperty('width')) {
        this._w = options.width;
      }
      
      if (options.hasOwnProperty('height')) {
        this._h = options.height;
      }
    }
  };
  
  // Inherit from SpaceElement
  Img.prototype = Taaspace.SpaceElement.create();
  
  // Extend Taaspace
  Taaspace.extension.createImage = function (src, options) {
    var image = new Img(this, src, options);
    return this.importSpaceElement(image);
  };
  
  
  
  
  
  // Pseudo-private mutators
  
  Img.prototype._appendHtmlElement = function (options) {
    // Called by viewports.
    // Appends HTMLElement into DOM.
    
    var el = jQuery(document.createElement('img'));
    this._htmlElement = el;
    
    // Mouse and touch gestures
    this._hammertime = Hammer(this._htmlElement[0]);
    
    // Required styles and attributes.
    el.attr({
      'src': this._src,
      'class': Taaspace.SPACE_ELEMENT_CLASS + ' taaspace-image'
    });
    el.css({
      position: 'absolute',
      width: this._w + 'px',
      height: this._h + 'px'
    });
    this._space._container.append(el);
    
    
    // Init position
    this._moveHtmlElement(options);
    
    return el;
  };
  
  
  
  ///////////////
  return exports;
}());
