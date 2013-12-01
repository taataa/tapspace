Taaspace.KeyboardManager = (function () {
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Manager = function (container) {
    // Parameter
    //   container (optional, default is document)
    //     Container HTMLElement where to listen the keyboard events.
    
    if (typeof container === 'undefined') {
      container = document;
    }
    
    // HTMLElement
    this._c = container;
    
    // Jwerty Codes mapped to sets of object-handler pairs.
    // 
    // Invariant
    //   The value for key in _pairs is always an array.
    // 
    // An array can have multiple instances of same pair. We could restrict
    // that but on the other hand same key combinations have many forms.
    // For example the down arrow key has both "down" and "arrow-down".
    this._pairs = {};
    
    // A set of selected objects. Only handlers of selected objects are
    // fired under the key command.
    this._selected = [];
  };
  
  exports.create = function () {
    return new Manager();
  };
  
  
  
  // Public
  
  Manager.prototype.select = function (obj) {
    // Add the object to the set of selected objects.
    // 
    // Return
    //   true
    //     if objects was not already selected
    //   false
    //     otherwise
    if (_.contains(this._selected, obj)) {
      return false;
    } // else
    this._selected.push(obj);
  };
  
  Manager.prototype.isSelected = function (obj) {
    // Return
    //   true
    //     If object is selected.
    //   false
    //     otherwise
    return _.contains(this._selected, obj);
  };
  
  Manager.prototype.deselect = function (obj) {
    // Remove the object from the set of selected objects.
    // 
    // Return
    //   true
    //     if object was removed
    //   false
    //     if object was not selected in the first place
    var oldset = this._selected;
    var newset = _.without(oldset, obj);
    this._selected = newset;
    return (oldset.length > newset.length);
  };
  
  Manager.prototype.on = function (jwertyCode, obj, handler) {
    // Attach event handler to this object. The handler will be fired
    // if the keys are pressed and the object is being selected.
    // 
    // Return
    //   this
    //     for chaining
    
    var pairSetAdded = addPair(this._pairs, jwertyCode, obj, handler);
    
    // Add only one instance of listeners per jwertyCode.
    // The handler for the listener has nothing to do with the obj
    // and handler parameters.
    if (pairSetAdded) {
    
      // Attach key listener
      // https://github.com/keithamus/jwerty/blob/master/
      // README-DETAILED.md#jwertykey
      jwerty.key(jwertyCode, function () {
        var pairset = this._pairs[jwertyCode];
        
        // Leave only pairs with the object being selected.
        var execset = _.filter(pairset, function (p) {
          return this.isSelected(p.object);
        }, this);
        
        // Call each handler in these set of selected objects,
        // the object as a context.
        _.each(execset, function (pair) {
          pair.handler.call(pair.object);
        });
      }, this, this._c);
      
    }
    
    return this;
  };
  
  Manager.prototype.off = function (jwertyCode, obj, handler) {
    // Remove event handler for this key combination.
    // Do the actual event unbinding with clean().
    removePair(this._pairs, jwertyCode, obj, handler);
    return this;
  };
  
  Manager.prototype.clean = function () {
    // Remove the jwerty handlers which do not have any pairs attached.
    // This might be necessary if the app uses large number of ons and offs
    // continuously though that situation might be very rare.
    // 
    // Priority
    //   low
    throw 'not yet implemented';
  };
  
  
  
  // Private
  
  var addPair = function (pairs, jwertyCode, obj, handler) {
    // Add a pair to the pairs even if one does exist.
    // 
    // Return
    //   True
    //     if pair array was added i.e. pairs has new key
    //   False
    //     otherwise
    
    var p = {
      object: obj,
      handler: handler
    };
    
    if (pairs.hasOwnProperty(jwertyCode)) {
      pairs[jwertyCode].push(p);
      return false;
    } // else
    
    pairs[jwertyCode] = [p];
    return true;
  };
  
  var getPair = function (pairs, jwertyCode, obj, handler) {
    // Check if obj-handler pair exists under jwertyCode
    // 
    // Return
    //   pair
    //     If a matching pair found
    //   null
    //     If no pair found
    if (pairs.hasOwnProperty(jwertyCode)) {
      var pairmatch = _.find(pairs[jwertyCode], function (p) {
        if (p.object === obj && p.handler === handler) {
          return true;
        }
      });
      
      // If not found, pairmatch is undefined
      if (pairmatch) {
        return pairmatch;
      } else {
        return null;
      }
    } else {
      // No even jwertyCode yet.
      return null;
    }
  };
  
  var removePair = function (pairs, jwertyCode, obj, handler) {
    // Remove the specified object-handler pair from the pairs.
    // 
    // Return
    //   true
    //     if pair removed
    //   false
    //     if no pair removed
    if (pairs.hasOwnProperty(jwertyCode)) {
      
      var oldset = pairs[jwertyCode];
      var newset = _.reject(oldset, function (p) {
        if (p.object === obj && p.handler === handler) {
          return true;
        }
      });
      
      // Replace
      pairs[jwertyCode] = newset;
      
      return (oldset.length > newset.length);
    } // else
    
    return false;
  };
  
  
  //////////////
  return exports;
}());
