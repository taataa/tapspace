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
  
  // Inherit from SpaceElement
  Text.prototype = Taaspace.SpaceElement.create();
  
  // Extend Taaspace
  Taaspace.extension.createText = function (string, options) {
    var txt = new Text(this, string, options);
    return this.importSpaceElement(txt);
  };
  
  
  
  // Mutators
  
  Text.prototype.text = function (newText, options) {
    // Parameter
    //   newText (optional)
    //     String. If omitted, returns the original text.
    //   options (optional)
    //     Object
    // 
    // Options
    //   disableHtml
    //     Handle string as plain text. See jQuery .text() and .html()


    // Normalize params

    if (typeof newText === 'string') {
      if (typeof options !== 'object') {
        options = {};
      }

      this._string = newText;

      // The content. Plain text or HTML.
      var method = 'html';
      if (options.hasOwnProperty('disableHTML')) {
        if (options.disableHTML === true) {
          method = 'text';
        }
      }
      this._htmlElement[method](this._string);
      return this; // chain 
    }
    return this._string;
  };

  Text.prototype.fontSize = function (newSize, options) {
    // Parameter
    //   options
    // 
    // Options
    //   Animation NOT IMPLEMENTED YET
    //   disableHtmlUpdate NOT IMPLEMENTED YET
    // 
    // Return
    //   this
    //     for chaining
    this._fontSize = newSize;
    this._scaleHtmlElement(options);
    return this;
  };
  
  Text.prototype.fontScale = function (multiplier, options) {
    // Scale font size by multiplier. Do not affect to element width.
    // 
    // Parameter
    //   options
    // 
    // Options
    //   Animation NOT IMPLEMENTED YET
    //   disableHtmlUpdate NOT IMPLEMENTED YET
    throw 'Not implemented';
  };
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._appendHtmlElement = function (options) {
    // Called by space.
    // Appends HTMLElement into DOM.
    // 
    // Parameter
    //   options (optional)
    // 
    // Option
    //   disableHTML
    //     See .text()
    
    // Normalize params
    if (typeof options !== 'object') {
      options = {};
    }
    
    var p = $(document.createElement('p'));
    this._htmlElement = p;
    
    // Mouse and touch gestures
    this._hammertime = Hammer(this._htmlElement[0]);
    
    // The content. Plain text or HTML.
    var method = 'html';
    if (options.hasOwnProperty('disableHTML')) {
      if (options.disableHTML === true) {
        method = 'text';
      }
    }
    p[method](this._string);
    
    // Important attributes and styles.
    p.attr({
      'class': Taaspace.SPACE_ELEMENT_CLASS + ' taaspace-text'
    });
    p.css({
      position: 'absolute'
    });
    
    this._space._container.append(p);
    
    // Init position
    this._moveHtmlElement(options);
    
    return p;
  };
  
  Text.prototype._scaleHtmlElement = function (options) {
    // Parameter
    //   options
    // 
    // Option
    //   Animation options
    
    /*var vp = this._space.getViewport();
    var nw = vp.translatePointFromSpace(this._x, this._y);
    var se = vp.translatePointFromSpace(this._x + this._w, this._y + this._h);
    var size = vp.translateDistanceFromSpace(this._fontSize);
    
    this._htmlElement.css({
      'font-size': size + 'px',
      left: nw.x + 'px',
      top: nw.y + 'px',
      width: (se.x - nw.x) + 'px',
      height: (se.y - nw.y) + 'px'
    });*/
    
    // Normalize
    if (typeof options !== 'object') {
      options = {};
    }
    
    // Place in new viewport
    var vp = this._space.getViewport();
    var nw = vp.translatePointFromSpace(this._x, this._y);
    var se = vp.translatePointFromSpace(this._x + this._w, this._y + this._h);
    var size = vp.translateDistanceFromSpace(this._fontSize);
    var x = nw.x;
    var y = nw.y;
    var w = (se.x - nw.x);
    var h = (se.y - nw.y);
    
    // If ease is not a valid easing function name, do not animate.
    var animate = options.hasOwnProperty('ease') &&
                  options.ease !== 'none' &&
                  typeof options.ease === 'string';
    
    if (animate) {
      // Animate
      // with Move.js
      
      this._animation = move(this._htmlElement.get(0))
        .set('left', x)
        .set('top', y)
        .set('width', w)
        .set('height', h)
        .set('font-size', size);
      this._animationEnder(options);
      
    } else {
      // Do not animate
      
      if (this._animation !== null) {
      
        // Cancel ongoing animation
        move(this._htmlElement.get(0))
          .set('left', x)
          .set('top', y)
          .set('width', w)
          .set('height', h)
          .set('font-size', size)
          .duration('0s')
          .end();
        this._animation = null;
        
      } else {
      
        // Raw step.
        this._htmlElement.css({
          'font-size': size + 'px',
          left: x + 'px',
          top: y + 'px',
          width: w + 'px',
          height: h + 'px'
        });
      }
    }
  };
  
  
  
  ///////////////
  return exports;
}());
