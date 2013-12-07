  // Version
  Taaspace.version = '2.2.0';
  
  // Modules
  if(typeof module === 'object' && typeof module.exports === 'object') {
    // Common JS
    // http://wiki.commonjs.org/wiki/Modules/1.1
    module.exports = Taaspace;
  } else {
    // Browsers
    window.Taaspace = Taaspace;
  }
})(this);
