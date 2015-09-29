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
};

module.exports = SpaceTaa;
