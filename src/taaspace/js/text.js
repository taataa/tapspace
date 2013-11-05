'use strict';

Taaspace.Text = (function () {
  //
  // Methods
  //   create(space, string, options)
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Text = function (space, string, options) {
    this.space = space;
    this.string = string;
    
    this.x = 0;
    this.y = 0;
    this.z = 0;
  };
  
  exports.create = function (space, string, options) {
      return new Text(space, string, options);
  };
  
  Text.prototype = Taaspace.Element.create();
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    // 
    // Element knows its position in space and uses viewports fromSpace
    // function to find out position on screen.
    
    var xy = fromSpace(this.x, this.y, this.z);
    
    var domElem = $(document.createElement('div'));
    domElem.html(this.string);
    domElem.css({
      position: 'absolute',
      left: xy.x + 'px',
      top: xy.y + 'px'
    });
    
    $(container).append(domElem);
    
    return domElem;
  };
  
  Text.prototype._domMove = function (domElem, fromSpace, options) {
    var xy = fromSpace(this.x, this.y, this.z);
    
    domElem.css({
      left: xy.x + 'px',
      top: xy.y + 'px'
    });
  };
  
  Text.prototype._domRemove = function (domElem, options) {
    // Parameter
    //   options
    //     ease?
    //     duration?
    //     delay?
  };
  
  Text.prototype._domListen = function (domElem, eventType, callback) {
    Hammer(domElem[0]).on(eventType, callback);
  };
  
  
  
  ///////////////
  return exports;
}());
