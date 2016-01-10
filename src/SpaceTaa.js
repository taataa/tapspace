// v0.3.0

var Emitter = require('component-emitter');
var SpacePlane = require('./SpacePlane');
var Transformer = require('./Transformer');

// Unique ID generator. Unique over session.
// Usage: seqid.next()
// Return: int
var seqid = require('seqid')(0);

var SpaceTaa = function (space, taa) {
  Emitter(this);
  SpacePlane(this);
  Transformer(this);

  this.id = seqid.next().toString();
  this.space = space;
  this.taa = taa;

  space._add(this);
};

var proto = SpaceTaa.prototype;

proto.remove = function () {
  if (this.space) {
    var s = this.space;
    this.space = null;
    s._remove(this);
    this.emit('removed', this, s);
  } // else in null space already
};

proto.mid = function () {
  // Middle point
  return this.at([0.5, 0.5]);
};

module.exports = SpaceTaa;
