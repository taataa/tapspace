var Emitter = require('component-emitter');
var nudged = require('nudged');

var Model = function () {
  Emitter(this);

  // For ongoing transformation, remember where the pointers started from
  // and keep track where they are now. We store this information to
  // the pointers variable. It has a property for each current pointer.
  //
  // Example:
  // {
  //   'pointerid': {dx: <domainx>, dy: <domainy>, rx: <rangex>, ry}
  // }
  var pointers = {};
  var numPointers = 0;

  // Cumulated transformation. Like a history.
  var committedTransform = nudged.Transform.IDENTITY;
  // When the history is combined with the ongoing transformation,
  // the result is total transformation.
  var totalTransform = nudged.Transform.IDENTITY;

  // Limit the frequency of fired events
  // TODO should be done outside of the Model.
  var previousMoveDateNow = Date.now();

  var commit = function () {
    // Move ongoint transformation to the committed transformation so that
    // the total transformation stays the same.

    // Commit ongoingTransformation. As a result
    // the domain and range of all pointers become equal.
    var id, p, domain, range, t;
    domain = [];
    range = [];
    for (id in pointers) {
      if (pointers.hasOwnProperty(id)) {
        p = pointers[id];
        domain.push([p.dx, p.dy]);
        range.push([p.rx, p.ry]); // copies
        // Move transformation from current pointers;
        // Turn ongoingTransformation to identity.
        p.dx = p.rx;
        p.dy = p.ry;
      }
    }
    // Calculate the transformation to commit and commit it by
    // combining it with the previous transformations. Total transform
    // then becomes identical with the commited ones.
    t = nudged.estimateTSR(domain, range);
    committedTransform = t.multiplyBy(committedTransform);
    totalTransform = committedTransform;
  };

  var updateTransform = function () {
    // Calculate the total transformation from the committed transformation
    // and the points of the ongoing transformation.

    var id, p, domain, range, t;
    domain = [];
    range = [];
    for (id in pointers) {
      if (pointers.hasOwnProperty(id)) {
        p = pointers[id];
        domain.push([p.dx, p.dy]);
        range.push([p.rx, p.ry]);
      }
    }
    // Calculate ongoing transform and combine it with the committed.
    t = nudged.estimateTSR(domain, range);
    totalTransform = t.multiplyBy(committedTransform);
  };

  this.startTouchPoint = function (id, x, y) {
    // Debug
    if (pointers.hasOwnProperty(id)) {
      console.error('Pointer ' + id + ' already exists.');
    }

    // For each new touch.
    commit();
    pointers[id] = { dx: x, dy: y, rx: x, ry: y };
    numPointers += 1;
    updateTransform();
    if (numPointers === 1) {
      // So numPointers was zero.
      // So main gesture starts.
      this.emit('start');
    }
  };

  this.moveTouchPoint = function (id, x, y) {
    // Debug
    if (!pointers.hasOwnProperty(id)) {
      console.error('Pointer ' + id + ' does not exist.');
    }

    // For each moved touch.
    pointers[id].rx = x;
    pointers[id].ry = y;
    updateTransform();
    var now = Date.now();
    if (now - previousMoveDateNow > 33) {
      this.emit('move', totalTransform);
      previousMoveDateNow = now;
    }
  };

  this.endTouchPoint = function (id) {
    // Debug
    if (!pointers.hasOwnProperty(id)) {
      console.error('Pointer ' + id + ' does not exist.');
    }

    // For each removed touch.
    commit();
    delete pointers[id];
    numPointers -= 1;
    if (numPointers === 0) {
      // So numPointers was one.
      // So high-level gesture ends.
      this.emit('end', totalTransform);
      // Return transforms to identity.
      committedTransform = nudged.Transform.IDENTITY;
      totalTransform = nudged.Transform.IDENTITY;
    }
  };
};


module.exports = Model;
