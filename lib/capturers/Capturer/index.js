const emitter = require('component-emitter')

const Capturer = function () {
  // @Capturer
  //
  // A base class for capturers. Every capturer must implement this interface.
  // Capturers may have extra methods on top of these.
  //

  // Inherit
  emitter(this)
}

module.exports = Capturer

const proto = Capturer.prototype

proto.bind = function () {
  throw new Error('Subclass must override this method.')
}

proto.update = function () {
  throw new Error('Subclass must override this method.')
}

proto.unbind = function () {
  throw new Error('Subclass must override this method.')
}
