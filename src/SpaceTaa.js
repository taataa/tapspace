var Emitter = require('component-emitter');
var Transformer = require('./Transformer');

// Unique ID generator.
// Usage: seqid.next()
// Return: int
var seqid = require('seqid')(0);

var SpaceTaa = function (space, taa) {
  Emitter(this);
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
  } // else in null space already
};

module.exports = SpaceTaa;
