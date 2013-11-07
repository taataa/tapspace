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
    this._space = space;
    this._string = string;
  };
  
  exports.create = function (space, string, options) {
      return new Text(space, string, options);
  };
  
  Text.prototype = Taaspace.Element.create();
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    
    var domElem = $(document.createElement('div'));
    domElem.html(this._string);
    domElem.css({
      position: 'absolute'
    });
    
    $(container).append(domElem);
    
    // Init position
    this._domMove(domElem, fromSpace, options);
    
    return domElem;
  };
  
  
  
  ///////////////
  return exports;
}());
