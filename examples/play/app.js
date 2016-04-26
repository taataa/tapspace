(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"component-emitter":5,"nudged":6}],2:[function(require,module,exports){
var Emitter = require('component-emitter');
var Model = require('./Model');

var TouchHandler = function (element) {
  Emitter(this);
  var this2 = this;

  var model = new Model();

  // Touch support

  var onTouchStart = function (ev) {
    var cts, i;
    cts = ev.changedTouches;
    for (i = 0; i < cts.length; i += 1) {
      model.startTouchPoint(cts[i].identifier, cts[i].pageX, cts[i].pageY);
    }
    ev.preventDefault();
    ev.stopPropagation();
  };
  var onTouchMove = function (ev) {
    var cts, i;
    cts = ev.changedTouches;
    for (i = 0; i < cts.length; i += 1) {
      model.moveTouchPoint(cts[i].identifier, cts[i].pageX, cts[i].pageY);
    }
    ev.preventDefault();
    ev.stopPropagation();
  };
  var onTouchEndTouchCancel = function (ev) {
    var cts, i;
    cts = ev.changedTouches;
    for (i = 0; i < cts.length; i += 1) {
      model.endTouchPoint(cts[i].identifier);
    }
    ev.preventDefault();
    ev.stopPropagation();
  };

  element.addEventListener('touchstart', onTouchStart);
  element.addEventListener('touchmove', onTouchMove);
  element.addEventListener('touchend', onTouchEndTouchCancel);
  element.addEventListener('touchcancel', onTouchEndTouchCancel);

  // Mouse support

  var mouseDown = false;

  var onMouseDown = function (ev) {
    if (!mouseDown) {
      mouseDown = true;
      model.startTouchPoint('mouse', ev.pageX, ev.pageY);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  var onMouseMove = function (ev) {
    if (mouseDown) {
      model.moveTouchPoint('mouse', ev.pageX, ev.pageY);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  var onMouseUp = function (ev) {
    if (mouseDown) {
      mouseDown = false;
      model.endTouchPoint('mouse');
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseup', onMouseUp);
  element.addEventListener('mouseout', onMouseUp);

  // We forward the events from the model

  model.on('start', function () {
    this2.emit('start');
  });

  model.on('move', function (totalTransformation) {
    this2.emit('move', totalTransformation);
  });

  model.on('end', function () {
    this2.emit('end');
  });

};


module.exports = TouchHandler;

},{"./Model":1,"component-emitter":5}],3:[function(require,module,exports){
/*

Design note:
  It felt wrong to compute the transformation with each pointer move
  by having the previous, only slightly different set of pointers as domain.
  These microtransformations might cause inaccurate transformations.
  However, I did not try them.

Algorithm:
  Gesture is divided to subgestures. Arriving or leaving pointer ends
  a subgesture and starts another one.
  Element has a set of touches, so each interactive element has own
  gesture handler.
  The touches move.
  For each move, we estimate transformation for the pointers from
  the beginning of the subgesture.
  Subgesture train builds a total transformation.
  We store the initial transformation of the interactive object and
  multiply the gesture's current total transformation with it.
  As the gesture ends, we commit the total transformation to the object,
  forget the initial transformation and  we permanently transform the object.

Future notes:
  How to allow a coder to program how input changes the space?
  Taa is under manipulation: that could be an explicit state.

  MDN:
  Touch.target points to the element where the touch point started from.

*/

var TouchHandler = require('./TouchHandler');
var utils = require('./utils');

var container = document.getElementById('space');
var space = new taaspace.Space();
var view = new taaspace.HTMLSpaceView(space, container);

(function makeViewTransformable() {
  var hand = new TouchHandler(container);
  var tr = null;
  hand.on('start', function () {
    // Store the initial transformation from view to space.
    tr = view.getLocalTransform();
  });
  hand.on('move', function (transformOnView) {
    // A safety feature to protect from invalid TouchAPI implementations.
    if (tr === null) { return; }
    // Turn to SpaceTransform on original view.
    var t = new taaspace.SpaceTransform(tr, transformOnView);
    var ft = tr.transformBy(t.inverse());
    // Apply
    view.setLocalTransform(ft);
  });
  hand.on('end', function () {
    // We do not need the initial transformation anymore.
    tr = null;
  });
}());

var makeSpaceTaaTransformable = function (spacetaa) {
  var el = view.getElementBySpaceNode(spacetaa);
  var hand = new TouchHandler(el);
  var originalParent = null;
  var originalLocal = null;
  hand.on('start', function () {
    // Store original parent so we can return spacetaa onto it after gesture.
    originalParent = spacetaa.getParent();
    // Change parent to view => not dependent on how view is transformed.
    // Keep location the same.
    var t = spacetaa.getGlobalTransform();
    spacetaa.setParent(view);
    spacetaa.setGlobalTransform(t);
    // Store new local transformation. Gesture modifies it instead
    // of global transform so therefore view location does not affect.
    originalLocal = spacetaa.getLocalTransform();
    // Render in touch order
    el.style.zIndex = utils.getIncrementalZIndex();
  });
  hand.on('move', function (transfOnView) {
    // A safety feature to protect from invalid TouchAPI implementations.
    if (originalLocal === null) { return; }
    // Turn to SpaceTransform
    var spaceGesture = new taaspace.SpaceTransform(view, transfOnView);
    // View might be transformed, therefore we graft a new
    // local transformation. We transform the result.
    var t = originalLocal.switchTo(view).transformBy(spaceGesture);
    // Apply to spacetaa
    spacetaa.setLocalTransform(t);
  });
  hand.on('end', function () {
    // Drop back to original parent.
    var t = spacetaa.getGlobalTransform();
    spacetaa.setParent(originalParent);
    spacetaa.setGlobalTransform(t);
    // We do not need the initial transformation and parent anymore.
    originalLocal = null;
    originalParent = null;
  });
};


var imgs = [
  'img/chellah_star.jpg',
  'img/marrakech_knot.jpg',
  'img/marrakech_sun.jpg',
  'img/marrakech_mosaic.jpg',
  'img/rabat_sand.jpg',
  'img/oudaya_door.jpg',
  'img/chellah_nw.jpg'
];

var c = space.at([0,0]);
var n = imgs.length;
var putOnCircle = function (spacetaa, i) {
  var rads = i * 2 * Math.PI / n - (Math.PI / n);
  var midn = spacetaa.atMidN();
  var mids = spacetaa.atMidS();
  var offn = c.polarOffset(1.382, rads);
  var offs = c.polarOffset(0.382, rads);
  spacetaa.translateScaleRotate([midn, mids], [offn, offs]);
};

imgs.forEach(function (src, i) {
  taa = new taaspace.Taa(src);
  staa = new taaspace.SpaceTaa(space, taa);
  putOnCircle(staa, i);
  makeSpaceTaaTransformable(staa);
});

view.translateScale(
  [view.atNW(), view.atSE()],
  [space.at([-3,-3]), space.at([3,3])]
);

},{"./TouchHandler":2,"./utils":4}],4:[function(require,module,exports){

(function closure() {
  var i = 100;

  exports.getIncrementalZIndex = function () {
    i += 1;
    return i;
  };
}());

},{}],5:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],6:[function(require,module,exports){
/*

*/
exports.Transform = require('./lib/Transform');
exports.estimateT = require('./lib/estimateT');
exports.estimateS = require('./lib/estimateS');
exports.estimateR = require('./lib/estimateR');
exports.estimateTS = require('./lib/estimateTS');
exports.estimateTR = require('./lib/estimateTR');
exports.estimateSR = require('./lib/estimateSR');
exports.estimateTSR = require('./lib/estimateTSR');
exports.version = require('./lib/version');

exports.estimate = function (type, domain, range, pivot) {
  // Parameter
  //   type
  //     string. One of the following: 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  //   domain
  //     array of 2d arrays
  //   range
  //     array of 2d arrays
  //   pivot
  //     optional 2d array, does nothing for translation estimators
  var name = 'estimate' + type.toUpperCase();
  if (exports.hasOwnProperty(name)) {
    return exports[name](domain, range, pivot);
  } // else
  throw new Error('Unknown estimator type: ' + type);
};

},{"./lib/Transform":7,"./lib/estimateR":8,"./lib/estimateS":9,"./lib/estimateSR":10,"./lib/estimateT":11,"./lib/estimateTR":12,"./lib/estimateTS":13,"./lib/estimateTSR":14,"./lib/version":15}],7:[function(require,module,exports){

var Transform = function (s, r, tx, ty) {

  // Public, to allow user access
  this.s = s;
  this.r = r;
  this.tx = tx;
  this.ty = ty;

  this.equals = function (t) {
    return (s === t.s && r === t.r && tx === t.tx && ty === t.ty);
  };

  this.transform = function (p) {
    // p
    //   point [x, y] or array of points [[x1,y1], [x2, y2], ...]

    if (typeof p[0] === 'number') {
      // Single point
      return [s * p[0] - r * p[1] + tx, r * p[0] + s * p[1] + ty];
    } // else

    var i, c = [];
    for (i = 0; i < p.length; i += 1) {
      c.push([s * p[i][0] - r * p[i][1] + tx, r * p[i][0] + s * p[i][1] + ty]);
    }
    return c;
  };

  this.getMatrix = function () {
    // Get the transformation matrix in the format common to
    // many APIs, including:
    // - kld-affine
    //
    // Return
    //   object o, having properties a, b, c, d, e, f:
    //   [ s  -r  tx ]   [ o.a  o.c  o.e ]
    //   [ r   s  ty ] = [ o.b  o.d  o.f ]
    //   [ 0   0   1 ]   [  -    -    -  ]
    return { a: s, b: r, c: -r, d: s, e: tx, f: ty };
  };

  this.getRotation = function () {
    // in rads
    return Math.atan2(r, s);
  };

  this.getScale = function () {
    // scale multiplier
    return Math.sqrt(r * r + s * s);
  };

  this.getTranslation = function () {
    return [tx, ty];
  };

  this.inverse = function () {
    // Return inversed transform instance
    // See note 2015-10-26-16-30
    var det = s * s + r * r;
    // Test if singular transformation. These might occur when all the range
    // points are the same, forcing the scale to drop to zero.
    var eps = 0.00000001;
    if (Math.abs(det) < eps) {
      throw new Error('Singular transformations cannot be inversed.');
    }
    var shat = s / det;
    var rhat = -r / det;
    var txhat = (-s * tx - r * ty) / det;
    var tyhat = ( r * tx - s * ty) / det;
    return new Transform(shat, rhat, txhat, tyhat);
  };

  this.translateBy = function (dx, dy) {
    return new Transform(s, r, tx + dx, ty + dy);
  };

  this.scaleBy = function (multiplier, pivot) {
    // Parameter
    //   multiplier
    //   pivot
    //     optional, a [x, y] point
    var m, x, y;
    m = multiplier; // alias
    if (typeof pivot === 'undefined') {
      x = y = 0;
    } else {
      x = pivot[0];
      y = pivot[1];
    }
    return new Transform(m * s, m * r, m * tx + (1-m) * x, m * ty + (1-m) * y);
  };

  this.rotateBy = function (radians, pivot) {
    // Parameter
    //   radians
    //     from positive x to positive y axis
    //   pivot
    //     optional, a [x, y] point
    var co, si, x, y, shat, rhat, txhat, tyhat;
    co = Math.cos(radians);
    si = Math.sin(radians);
    if (typeof pivot === 'undefined') {
      x = y = 0;
    } else {
      x = pivot[0];
      y = pivot[1];
    }
    shat = s * co - r * si;
    rhat = s * si + r * co;
    txhat = (tx - x) * co - (ty - y) * si + x;
    tyhat = (tx - x) * si + (ty - y) * co + y;
    return new Transform(shat, rhat, txhat, tyhat);
  };


  this.multiplyBy = function (transform) {
    // Multiply this transformation matrix A
    // from the right with the given transformation matrix B
    // and return the result AB

    // For reading aid:
    // s -r tx  t.s -r tx
    // r  s ty *  r  s ty
    // 0  0  1    0  0  1
    var t = transform; // alias
    var shat = s * t.s - r * t.r;
    var rhat = s * t.r + r * t.s;
    var txhat = s * t.tx - r * t.ty + tx;
    var tyhat = r * t.tx + s * t.ty + ty;
    return new Transform(shat, rhat, txhat, tyhat);
  };
};

Transform.IDENTITY = new Transform(1, 0, 0, 0);

module.exports = Transform;

},{}],8:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range, pivot) {
  var i, N, D, a0, b0, a, b, c, d, ac, ad, bc, bd, shat, rhat, tx, ty;

  N = Math.min(domain.length, range.length);
  ac = ad = bc = bd = 0;

  if (typeof pivot === 'undefined') {
    a0 = b0 = 0;
  } else {
    a0 = pivot[0];
    b0 = pivot[1];
  }

  for (i = 0; i < N; i += 1) {
    a = domain[i][0] - a0;
    b = domain[i][1] - b0;
    c = range[i][0] - a0;
    d = range[i][1] - b0;
    ac += a * c;
    ad += a * d;
    bc += b * c;
    bd += b * d;
  }

  p = ac + bd;
  q = ad - bc;

  D = Math.sqrt(p * p + q * q);

  if (D === 0) {
    // D === 0
    // <=> q === 0 and p === 0.
    // <=> ad === bc and ac === -bd
    // <=> domain in pivot OR range in pivot OR yet unknown cases
    //     where the angle cannot be determined.
    // D === 0 also if N === 0.
    // Assume identity transform to be the best guess
    return Transform.IDENTITY;
  }

  shat = p / D;
  rhat = q / D;
  tx = a0 - a0 * shat + b0 * rhat;
  ty = b0 - a0 * rhat - b0 * shat;

  return new Transform(shat, rhat, tx, ty);
};

},{"./Transform":7}],9:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range, pivot) {
  var i, N, D, a0, b0, a, b, c, d, ac, bd, aa, bb, shat, tx, ty;

  N = Math.min(domain.length, range.length);
  ac = bd = aa = bb = 0;

  if (typeof pivot === 'undefined') {
    a0 = b0 = 0;
  } else {
    a0 = pivot[0];
    b0 = pivot[1];
  }

  for (i = 0; i < N; i += 1) {
    a = domain[i][0] - a0;
    b = domain[i][1] - b0;
    c = range[i][0] - a0;
    d = range[i][1] - b0;
    ac += a * c;
    bd += b * d;
    aa += a * a;
    bb += b * b;
  }

  D = aa + bb;

  if (D === 0) {
    // All domain points equal the pivot.
    // Identity transform is then only solution.
    // D === 0 also if N === 0.
    // Assume identity transform to be the best guess
    return Transform.IDENTITY;
  }

  // Prevent negative scaling because it would be same as positive scaling
  // and rotation => limit to zero
  shat = Math.max(0, (ac + bd) / D);
  tx = (1 - shat) * a0;
  ty = (1 - shat) * b0;

  return new Transform(shat, 0, tx, ty);
};

},{"./Transform":7}],10:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range, pivot) {
  // Estimate optimal transformation given the domain and the range
  // so that the pivot point remains the same.
  //
  // Use cases
  //   - transform an image that has one corner fixed with a pin.
  //   - allow only scale and rotation by fixing the middle of the object
  //     to transform.
  //
  // Parameters
  //   domain, an array of [x, y] points
  //   range, an array of [x, y] points
  //   pivot, optional
  //     the point [x, y] that must remain constant in the tranformation.
  //     Defaults to origo [0, 0]
  //
  //
  var X, Y, N, s, r, tx, ty;

  // Optional pivot
  if (typeof pivot === 'undefined') {
    pivot = [0, 0];
  }

  // Alias
  X = domain;
  Y = range;

  // Allow arrays of different length but
  // ignore the extra points.
  N = Math.min(X.length, Y.length);

  var v = pivot[0];
  var w = pivot[1];

  var i, a, b, c, d;
  var a2, b2;
  a2 = b2 = 0;
  var ac, bd, bc, ad;
  ac = bd = bc = ad = 0;

  for (i = 0; i < N; i += 1) {
    a = X[i][0] - v;
    b = X[i][1] - w;
    c = Y[i][0] - v;
    d = Y[i][1] - w;
    a2 += a * a;
    b2 += b * b;
    ac += a * c;
    bd += b * d;
    bc += b * c;
    ad += a * d;
  }

  // Denominator = determinant.
  // It becomes zero iff N = 0 or X[i] = [v, w] for every i in [0, n).
  // In other words, iff all the domain points are under the fixed point or
  // there is no domain points.
  var den = a2 + b2;

  var eps = 0.00000001;
  if (Math.abs(den) < eps) {
    // The domain points are under the pivot or there is no domain points.
    // We assume identity transform be the simplest guess. It keeps
    // the domain points under the pivot if there is some.
    return new Transform(1, 0, 0, 0);
  }

  // Estimators
  s = (ac + bd) / den;
  r = (-bc + ad) / den;
  tx =  w * r - v * s + v;
  ty = -v * r - w * s + w;

  return new Transform(s, r, tx, ty);
};

},{"./Transform":7}],11:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range) {
  var i, N, a1, b1, c1, d1, txhat, tyhat;

  N = Math.min(domain.length, range.length);
  a1 = b1 = c1 = d1 = 0;

  if (N < 1) {
    // Assume identity transform be the best guess
    return Transform.IDENTITY;
  }

  for (i = 0; i < N; i += 1) {
    a1 += domain[i][0];
    b1 += domain[i][1];
    c1 += range[i][0];
    d1 += range[i][1];
  }

  txhat = (c1 - a1) / N;
  tyhat = (d1 - b1) / N;

  return new Transform(1, 0, txhat, tyhat);
};

},{"./Transform":7}],12:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range) {
  // Parameters
  //   domain
  //     array of [x, y] 2D arrays
  //   range
  //     array of [x, y] 2D arrays

  // Alias
  var X = domain;
  var Y = range;

  // Allow arrays of different length but
  // ignore the extra points.
  var N = Math.min(X.length, Y.length);

  var i, a, b, c, d, a1, b1, c1, d1, ac, ad, bc, bd;
  a1 = b1 = c1 = d1 = ac = ad = bc = bd = 0;
  for (i = 0; i < N; i += 1) {
    a = X[i][0];
    b = X[i][1];
    c = Y[i][0];
    d = Y[i][1];
    a1 += a;
    b1 += b;
    c1 += c;
    d1 += d;
    ac += a * c;
    ad += a * d;
    bc += b * c;
    bd += b * d;
  }

  // Denominator.
  var v = N * (ad - bc) - a1 * d1 + b1 * c1;
  var w = N * (ac + bd) - a1 * c1 - b1 * d1;
  var D = Math.sqrt(v * v + w * w);

  if (D === 0) {
    // N === 0 => D === 0
    if (N === 0) {
      return new Transform(1, 0, 0, 0);
    } // else
    // D === 0 <=> undecidable
    // We guess the translation to the mean of the range to be the best guess.
    // Here a, b represents the mean of domain points.
    return new Transform(1, 0, (c1 - a1) / N, (d1 - b1) / N);
  }

  // Estimators
  var shat = w / D;
  var rhat = v / D;
  var txhat = (-a1 * shat + b1 * rhat + c1) / N;
  var tyhat = (-a1 * rhat - b1 * shat + d1) / N;

  return new Transform(shat, rhat, txhat, tyhat);
};

},{"./Transform":7}],13:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range) {
  // Parameters
  //   domain
  //     array of [x, y] 2D arrays
  //   range
  //     array of [x, y] 2D arrays

  // Alias
  var X = domain;
  var Y = range;

  // Allow arrays of different length but
  // ignore the extra points.
  var N = Math.min(X.length, Y.length);

  var i, a, b, c, d, a1, b1, c1, d1, a2, b2, ac, bd;
  a1 = b1 = c1 = d1 = a2 = b2 = ac = bd = 0;
  for (i = 0; i < N; i += 1) {
    a = X[i][0];
    b = X[i][1];
    c = Y[i][0];
    d = Y[i][1];
    a1 += a;
    b1 += b;
    c1 += c;
    d1 += d;
    a2 += a * a;
    b2 += b * b;
    ac += a * c;
    bd += b * d;
  }

  // Denominator.
  var N2 = N * N;
  var a12 = a1 * a1;
  var b12 = b1 * b1;
  var p = a2 + b2;
  var q = ac + bd;
  var D = N2 * p - N * (a12 + b12);

  if (D === 0) {
    // N === 0 => D === 0
    if (N === 0) {
      return new Transform(1, 0, 0, 0);
    } // else
    // D === 0 <=> all the domain points are the same
    // We guess the translation to the mean of the range to be the best guess.
    // Here a, b represents the mean of domain points.
    return new Transform(1, 0, (c1 / N) - a, (d1 / N) - b);
  }

  // Estimators
  var shat = (N2 * q - N * (a1 * c1 + b1 * d1)) / D;
  var txhat = (-N * a1 * q + N * c1 * p - b12 * c1 + a1 * b1 * d1) / D;
  var tyhat = (-N * b1 * q + N * d1 * p - a12 * d1 + a1 * b1 * c1) / D;

  return new Transform(shat, 0, txhat, tyhat);
};

},{"./Transform":7}],14:[function(require,module,exports){
var Transform = require('./Transform');

module.exports = function (domain, range) {
  // Parameters
  //   domain
  //     array of [x, y] 2D arrays
  //   range
  //     array of [x, y] 2D arrays
  var X, Y, N, s, r, tx, ty;

  // Alias
  X = domain;
  Y = range;

  // Allow arrays of different length but
  // ignore the extra points.
  N = Math.min(X.length, Y.length);

  // If length is zero, no estimation can be done. We choose the indentity
  // transformation be the best quess.
  if (N === 0) {
    return new Transform(1, 0, 0, 0);
  } // else

  var i, a, b, c, d;
  var a1 = 0;
  var b1 = 0;
  var c1 = 0;
  var d1 = 0;
  var a2 = 0;
  var b2 = 0;
  var ad = 0;
  var bc = 0;
  var ac = 0;
  var bd = 0;
  for (i = 0; i < N; i += 1) {
    a = X[i][0];
    b = X[i][1];
    c = Y[i][0];
    d = Y[i][1];
    a1 += a;
    b1 += b;
    c1 += c;
    d1 += d;
    a2 += a * a;
    b2 += b * b;
    ad += a * d;
    bc += b * c;
    ac += a * c;
    bd += b * d;
  }

  // Denominator.
  // It is zero iff X[i] = X[j] for every i and j in [0, n).
  // In other words, iff all the domain points are the same or there is only one domain point.
  var den = N * a2 + N * b2 - a1 * a1 - b1 * b1;

  var eps = 0.00000001;
  if (-eps < den && den < eps) {
    // The domain points are the same.
    // We guess the translation to the mean of the range to be the best guess.
    // Here a, b represents the mean of domain points.
    return new Transform(1, 0, (c1 / N) - a, (d1 / N) - b);
  }

  // Estimators
  s = (N * (ac + bd) - a1 * c1 - b1 * d1) / den;
  r = (N * (ad - bc) + b1 * c1 - a1 * d1) / den;
  tx = (-a1 * (ac + bd) + b1 * (ad - bc) + a2 * c1 + b2 * c1) / den;
  ty = (-b1 * (ac + bd) - a1 * (ad - bc) + a2 * d1 + b2 * d1) / den;

  return new Transform(s, r, tx, ty);
};

},{"./Transform":7}],15:[function(require,module,exports){
module.exports = '1.0.1';

},{}]},{},[3]);
