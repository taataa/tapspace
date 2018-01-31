
# taaspace.geom

A collection of geometric models.

## taaspace.geom.Grid

A `Grid` is a tool to round transformations to their closest alternatives allowed by the grid. In other words, you can snap items to discrete positions. In addition to xy-lattice, you can also snap scales and rotations.

**Usage:**

    > var grid = new taaspace.geom.Grid(mode)
    > var snappedTr = grid.snap(space.at(0,0), transform)

**Mode** is an object that defines the grid. Following properties are available:
- `xStep`: eye size to x direction.
- `xPhase`: grid's origin in x direction.
- `xRotation`: rotation of x direction (defaults to 0)
- `yStep`: eye size to y direction.
- `yPhase`: grid's origin in y direction.
- `yRotation`: rotation of y direction (defaults to PI/2)
- `scaleStep`: scale multiplier. E.g. value `2` allows scales of 2^i, like `0.5`, `1`, `2`, and `4`.
- `scalePhase`: addition to exponent. E.g. letting `scaleStep:2` and `scalePhase:0.5` allows scales of 2^(i+0.5), like `0.71`, `1.41`, and `2.83`.
- `rotateStep`: rotation step size in radians. E.g. value PI/2 allows rotations of 0, 90, 180, and 270 degrees.
- `rotatePhase`: addition to rotation. E.g. letting `rotateStep:Math.PI/2` and `rotatePhase:Math.PI/4` allows rotations of 45, 135, 225, and 315 degrees.

**Method** `#almostEqual(grid)` returns `true` if the given `Grid` is equal to `this`, allowing small errors from floating point arithmetics.

**Method** `#at(i, j)` returns `Vector` at (i, j) in grid's coordinates. E.g. let `xStep:2` and `yStep:2`, then `this.at(1, -1)` returns `Vector(2, -2)`. Also, `this.at(0, 0)` equals `this.getOrigin()`.

**Method** `#equal(grid)` returns `true` if values of the modes of the grids are strictly equal.

**Method** `#getHullOf(i, j)` returns `Path` representing the hull of (i, j):th eye of the grid.

**Method** `#getOrigin()` returns `Vector` at the grid origin, specified by `xStep`, `xPhase`, `yStep`, and `yPhase`.

**Method** `#snap(pivot, transform)` returns a snapped `Transform`. To describe, if the snapped `Transform` is then applied to the pivot, the result is a `Vector` that fulfils the restrictions of the mode. In other words, a plane defined by the transform is moved so, that the pivot on the plane hits the grid.

**Method** `#toArray` returns a serializable representation of the grid.

**Method** `#transform(tr)` returns a new transformed `Grid`. E.g. 2x scaling doubles the `xStep` and `yStep` eye sizes. This method enables us to represent a grid on different planes, paving a way for the plane invariant `IGrid`.

## taaspace.geom.IGrid

An `IGrid` is a plane-invariant grid that can be converted to plane-dependent `Grid` by calling `#to` method.

**Usage:**

    > var igrid = new taaspace.geom.IGrid(modeOrGrid, item)

**Method** `#almostEqual(igrid)` returns `true` if the given `IGrid` is equal to `this`, allowing small errors from floating point arithmetics.

**Method** `#at(i, j)` returns `IVector` at (i, j) in grid's coordinates. E.g. let `xStep:2` and `yStep:2`, then `this.at(1, -1)` returns `IVector` for `Vector(2, -2)`. Also, `this.at(0, 0)` equals `this.getOrigin()`.

**Method** `#equal(igrid)` returns `true` if values of the modes of the grids become strictly equal if transformed on the same plane.

**Method** `#getHullOf(i, j)` returns `IPath` representing the hull of (i, j):th eye of the grid.

**Method** `#getOrigin()` returns `IVector` at the grid origin, specified by `xStep`, `xPhase`, `yStep`, and `yPhase`.

**Method** `#snap(pivot, itransform)` returns a snapped `ITransform`. To describe, if the snapped `ITransform` is then applied to the given `IVector pivot`, the result is an `IVector` that fulfils the restrictions of the mode. In other words, a plane defined by `itransform` is moved so, that the pivot on the plane hits the grid.

**Method** `#to(item)` returns a `Grid` in the coordinate plane of the given item. The returned grid is globally equivalent to `this`.

**Method** `#toSpace()` returns a `Grid` in the coordinate plane of the root item.

**Method** `#transform(itr)` returns an `IGrid`, transformed by the given `ITransform itr`. E.g. 2x scaling doubles the `xStep` and `yStep` eye sizes.


## taaspace.geom.IScalar


## taaspace.geom.Path

A `Path` is an ordered sequence of `Vector`s. See `IPath` for plane-invariant alternative.

**Usage:**

    var Vec = taaspace.geom.Vector
    var p = new taaspace.geom.Path([
      new Vec(x0, y0),
      new Vec(x1, y1),
      ...
    ])

**Method** `#add(path)` returns a new `Path` that is the result of concatenating `this` with the given `path`.

**Method** `#almostEqual(path)` returns `true` if each `Vector` in `this` is almost equal to similarly positioned `Vector` in the given `path`, thus leaving a room for small floating point arithmetic errors.

**Method** `#atMid()` returns the mass centroid of the closed path as a `Vector` and `null` if the path is empty.

**Method** `#bottom()` returns the `Vector` with the largest `y` property. If multiple `Vector`s share the same `y`, the first is returned.

**Method** `#equal(path)` returns `true` if each `Vector` in `this` is equal to similarly positioned `Vector` in the given `path`.

**Method** `#first()` returns the first `Vector` of the path and `null` if empty.

**Method** `#get(i)` return the `i`:th `Vector` of the path and `undefined` if the index is out of range.

**Method** `#getBounds()` returns a bounding box as a `Path` in the hull order.

**Method** `#getHull()` returns the convex hull of `this` as a `Path`.

**Method** `#last()` returns the last `Vector` of the path and `null` if empty.

**Method** `#left()` returns the `Vector` with the smallest `x` property. If multiple `Vector`s share the same `x`, the first is returned.

**Method** `#right()` returns the `Vector` with the largest `x` property. If multiple `Vector`s share the same `x`, the first is returned.

**Method** `#toArray()` returns an array of `Vector`s.

**Method** `#top()` returns the `Vector` with the smallest `y` property. If multiple `Vector`s share the same `y`, the first is returned.

**Method** `#transform(tr)` returns a new `Path` where each `Vector` has been left-multiplied by the given `Transform`.

## taaspace.geom.IPath


## taaspace.geom.Rectangle

An object with width and height, and top-left corner always at (0, 0). The `Rectangle` does not have plane-invariant alternative because rotations would change the aspect ratio. If you need to represent a rectangle on multiple planes, use `IPath` instead.

**Usage:**

    var rect = new taaspace.geom.Rectangle(16, 9)

**Property** `w` gives the width.

**Property** `h` gives the height.

**Method** `#atMid()` returns `Vector` to the middle.

**Method** `#atMidN()` alias `#atMidTop`.

**Method** `#atMidW()` alias `#atMidLeft`.

**Method** `#atMidE()` alias `#atMidRight`.

**Method** `#atMidS()` alias `#atMidBottom`.

**Method** `#atNorm(x, y)` returns a `Vector` for coordinates `x` and `y` relative to width and height. For example, let `r = Rectangle(20, 10)`. Now `r.atNorm(1, 1)` returns `Vector(20, 10)` and `r.atNorm(0.75, 0.4)` returns `Vector(15, 4)`.

**Method** `#atNW()` alias `#atLeftTop`.

**Method** `#atNE()` alias `#atRightTop`.

**Method** `#atSW()` alias `#atLeftBottom`.

**Method** `#atSE()` alias `#atRightBottom`.

**Method** `#equal(rect)` returns `true` if widths and heights match.

**Method** `#getDiagonal()` returns a `Vector`. Alias to `#atRightBottom`.

**Method** `#scale(multiplier)` returns new `Rectangle` where the width and height are multiplied by `multiplier`.

**Method** `#toArray()` returns `[this.w, this.h]`.


## taaspace.geom.Transform

For API, see [nudged.Transform](https://github.com/axelpale/nudged#nudgedtransforms-r-tx-ty)

## taaspace.geom.ITransform

## taaspace.geom.Vector

A point in 2D space.

**Usage:**

    var vec = new taaspace.geom.Vector(2, 1)

**Property** `x` is a number

**Property** `y` is a number

**Alternative constructor** `Vector.createFromPolar(magnitude, direction)` takes the vector length and direction in radians and returns a `Vector`.

**Method** `#add(vec)` sums `this` to `vec` and returns a new `Vector`.

**Method** `#almostEqual(vec)` returns `true` if the vectors match. Leaves a room for small floating point arithmetic error.

**Method** `#changeBasis(vi, vj)` takes two `Vector`s `vi` and `vj` and returns a `Vector` represented in a coordinate system where `vi` and `vj` are the basis vectors. In other words, if `r = this.changeBasis(vi, vj)` then `this` is equal to `r.x` * `vi` + `r.y` * `vj`. Throws `Error` if given basis vectors are linearly dependent.

**Method** `#changeFromBasis(vi, vj)` is opposite of `#changeBasis` so that if `a = b.changeBasis(vi, vj)` then `b = a.changeFromBasis(vi, vj)`.

**Method** `#distance(vec)` returns Euclidean (L2) distance between `this` and `vec`.

**Method** `#equal(vec)` returns `true` if `x`s and `y`s are strictly equal.

**Method** `#getRotation()` returns radians from positive x-axis.

**Method** `#getMagnitude()` alias for `#norm`.

**Method** `#isIndependent(vec)` returns `true` if `this` and `vec` are linearly independent.

**Method** `#opposite()` returns a negation of `this`.

**Method** `#max(vec)` returns `Vector` where the largest `x` and `y` are picked from `this` and `vec`. For example, let `a = Vector(1, 0)` and `b = Vector(0, 1)` so `a.max(b)` equals `Vector(1, 1)`.

**Method** `#min(vec)` returns `Vector` where the smallest `x` and `y` are picked from `this` and `vec`. See `#max`.

**Method** `#multiply(scalar)` returns `Vector` where `x` and `y` are multiplied by `scalar`.

**Method** `#norm()` returns Euclidean (L2) norm of the vector.

**Method** `#offset(dx, dy)` returns `Vector` that is equal to `this.add(Vector(dx, dy))`.

**Method** `#polarOffset(radius, radians)` returns `Vector` that is equal to `this.add(Vector.createFromPolar(radius, radians))`.

**Method** `#rotate(radians)` returns `Vector` where `this` has been rotated about pivot (0, 0).

**Method** `#subtract(vec)` returns `Vector` that is equal to `this.add(vec.opposite())`.

**Method** `#toArray()` returns `[this.x, this.y]`.

**Method** `#transform(tr)` returns `Vector` where `this` has been multiplied from left by the given `Transform`.


## taaspace.geom.IVector
