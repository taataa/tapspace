
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

**Method** `#almostEqual(grid)` returns `true` if the given grid is equal to `this`, allowing small errors from floating point arithmetics.

**Method** `#at(i, j)` returns `Vector` at (i, j) in grid's coordinates. E.g. let `xStep:2` and `yStep:2`, then `this.at(1, -1)` returns `Vector(2, -2)`. Also, `this.at(0, 0)` equals `this.getOrigin()`.

**Method** `#equal(grid)` returns `true` if values of the modes of the grids are strictly equal.

**Method** `#getHullOf(i, j)` returns `Path` representing the hull of (i, j):th eye of the grid.

**Method** `#getOrigin()` returns `Vector` at origin, specified by `xStep`, `xPhase`, `yStep`, and `yPhase`.

**Method** `#snap(pivot, transform)` returns a snapped `Transform`. To describe, if the snapped `Transform` is then applied to the pivot, the result is a `Vector` that fulfils the restrictions of the mode.

**Method** `#toArray` returns a serializable representation of the grid.

**Method** `#transform(tr)` returns a new transformed `Grid`. E.g. 2x scaling doubles the `xStep` and `yStep` eye sizes. This method enables us to represent a grid on different planes, paving a way for the plane invariant `IGrid`.

## taaspace.geom.IGrid

## taaspace.geom.IPath

## taaspace.geom.IScalar

## taaspace.geom.ITransform

## taaspace.geom.IVector

#### #equals(point)

#### #offset(dx, dy)

#### #polarOffset(distance, radians)

#### #to(targetPlane)

Return a new SpacePoint on the coordinate system of `targetPlane`.

#### #toSpace()

Return a new SpacePoint on the space coordinate system.

#### #transform(tr)

Return a new SpacePoint by transforming this by the given Transform.

## taaspace.geom.Path

## taaspace.geom.Rectangle

## taaspace.geom.Transform

For API, see [nudged.Transform](https://github.com/axelpale/nudged#nudgedtransforms-r-tx-ty)

## taaspace.geom.Vector
