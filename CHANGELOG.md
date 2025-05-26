# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-alpha.25] – 2025-05-26

### Added

- New `Component` method `hasChild` (see #178).
- Write `CHANGELOG.md` for the whole revision-controlled history of the project (#183).
- New test assertion `doesNotThrow` (#189).

### Changed

- Upgrade dev dependencies `puppeteer`, `webpack`, `webpack-cli`.
- Improve GitHub Actions runner title.


## [2.0.0-alpha.24] – 2025-01-17

### Added

- New `Basis` methods `equal`, `almostEqual`.
- New `Box` methods `equal`, `almostEqual`.
- New `Circle` methods `equal`, `almostEqual`.
- New `Direction` methods `equal`, `almostEqual`.
- New `Distance` methods `equal`, `almostEqual` (alias `isAlmostEqual`).
- New `Point` methods `equal`, `almostEqual`.
- New `Orientation` methods `equal`, `almostEqual`.
- New `Size` methods `equal`, `almostEqual`.
- New `Sphere` methods `equal`, `almostEqual`.
- New `Vector` method `equal`.
- New `Component` method `createDistance`.
- Install new dev dependencies `puppeteer`.
- Set up continuous integration with GitHub Actions.
- Build a `tape` based test framework `testlib` that replicates `tape` API and allows assertions to be defined in HTML pages while the actual assertions are counted server-side by `tape` along `puppeteer` code.
- Write a default stylesheet for headless tests `test/components/default.css`.
- New package script `test:headless`.

### Changed

- BREAKING Convert `tapspace.css` stylesheet to `style.js` script so that package can be installed without `style-loader` nor `webpack` (#184).
- Migrate `tape` test suites to be compatible with the headless `puppeteer`.
- Replace dev dependency `ip` with an independent code snippet.
- Upgrade dependencies `affineplane@2.20.0`, `nudged@2.1.1`.
- Upgrade dev dependencies `finalhandler`, `genversion`, `semver`, `serve-static`, `standard`, `tape`, `webpack`.
- Improve static example server code style and instructions.
- Rewrite unit testing docs at `docs/dev/index.md`.
- Replace Travis build status badge with GitHub Actions badge.
- Clean up package release by npm-ignoring `.github` and `.editorconfig`.
- Update copyright year.

### Fixed

- Repair key modifier handling of `contextmenu` event in `GestureCapturer/Sensor` (#185).

### Removed

- BREAKING Simplify parameters of `FrameComponent` methods `resizeTo`, `setSize` to only take in number of pixels instead of CSS strings. The string to px conversion offered by `to-px` library is too complex to handle at this point.
- Uninstall dependency `to-px`.
- Uninstall dev dependencies `async`, `css-loader`, `ejs-loader`, `ip`, `path-browserify`, `process`, `stream-browserify`, `style-loader`, `webpack-livereload-plugin`.
- Remove package scripts `test:browser`, `test:browser:open`, `test:browser:build`, `test:browser:watch` of the old test framework.
- Remove deprecated custom test assertions `almostEqual`, `almostEqualBasis`, `almostEqualBox`, `almostEqualDirection`, `almostEqualDistance`, `almostEqualOrientation`, `almostEqualPoint`, `almostEqualSphere`, `almostEqualVector`.
- Remove Travis CI integration and `travis.yml`.


## [2.0.0-alpha.23] – 2023-12-22

### Changed

- Improve argument validation of methods `rotateBy`, `scaleBy` in `Hyperspace`, `Box`, `Basis`, `Transformer`.
- Improve API docs of `Viewport:measureDilation`, `Orientation`.
- Improve technical overview in `README.md`.

### Fixed

- Repair orientation bug in `Node:getBoundingBox`.


## [2.0.0-alpha.22] – 2023-12-14

### Added

- New `Box` method `getInnerSquare`.
- New `BlockComponent` method `getInnerSquare`.
- New `TreeLoader` method `closeSpace`.

### Changed

- Improve `GestureCapture` to capture modifier keys.
- Improve example app `minimal`.
- Improve feature demo `viewport-controls`.
- Upgrade dependencies `affineplane@2.18.0`.
- Improve API docs of `TreeLoader`.


## [2.0.0-alpha.21] – 2023-11-27

### Changed

- Improve API docs of `Animatable`, `Component`, `Transformer`, `Viewport`.
- Improve feature demos `components-pixel`.
- Upgrade dev dependencies `async`, `tape`, `semver`, `webpack`.
- Rewrite example app `minimal`.

### Fixed

- Skip bubbling transition events that mess up animations (#172)
- Detect unexpected calls to `Viewport:renderTransform`.

### Removed

- Uninstall unused dev dependency `tap-spec`.


## [2.0.0-alpha.20] – 2023-10-16

### Added

- Allow `Box:getBoundingBox` to take in a `Basis` and `Component`.


## [2.0.0-alpha.19] – 2023-10-16

### Added

- Allow `Node:getBoundingBox` to take in a `Basis` and `Component`.

### Changed

- Improve orientation handling in `Viewport` methods `zoomToFill`, `zoomToFit`.


## [2.0.0-alpha.18] – 2023-10-16

### Added

- New component class `Composite` with:
  - replacement for `Group`.
  - many methods adopted from `Hyperspace`, `Space` (was `Plane`).
- New `Hyperspace` method `rotateBy`.
- Add interactivity to `Arc` and `Edge` by inheriting from `Item`.
- New `Component` methods `createBasis`, `createOrientation`.
- New `Node` method `getBoundingBox`.
- New `Circle` method `getCollisionArea`.
- New `Measurement` property to `areaVisible`.
- New test assertion `almostEqualBox`.
- Allow `Composite` method `getBoundingBox` to take in an `Orientation`.

### Changed

- BREAKING Rename `TransformerComponent` back to `Transformer`.
- BREAKING Rename `InteractiveComponent` to `Interactive`.
- BREAKING Rename `ControlComponent` to `ViewportControl`.
- BREAKING Rename `Plane` to `Space`.
- BREAKING Rename `Component` methods:
  - rename `getVector` to `createVector`.
  - rename `getPoint` to `createPoint`.
  - rename `getDirection` to `createDirection`.
- BREAKING Rename `tapspace.createCircle` to `tapspace.createNode`.
- Make `Hyperspace` transformation methods request `idle` event when called.
- Improve `Box.fromBoxes` to take in `Basis` as an alternative to `Component`.
- Move `getScale` method from `Transformer` to `Component`.
- Improve `Transformer`, `FrameComponent` API docs.
- Upgrade dependencies `affineplane@2.17.1`.
- Upgrade dev dependencies `yamdog@2.1.0`.
- Update class inheritance chart to `2.0.0-alpha.18`.

### Fixed

- Remove hardcoded background color from `ZoomControl`.
- Prevent flicker when reordering DOM elements via `bringAbove`, `bringToFront`, `sendBelow`, `sendToBack`.
- Handle zero-size targets in `Viewport` methods `limitTo`, `zoomToFill`, `zoomToFit`.
- Correct `KeyboardZoom` zoom direction.
- Correct `Viewport:setOrientation` rotation direction.

### Removed

- BREAKING Remove `tapspace.math` in order to tree-shake unused `affineplane` functions.
- BREAKING Remove `Group` component in favour of `Composite`.
- BREAKING Remove `affine-group` class name in favour of `affine-composite`.
- BREAKING Remove `Component` method `getRotation`.
- Remove duplicate `Space:addChild` (was `Plane:addChild`) in favour of inherited `Component:addChild`.
- Remove duplicate `Transformer:getDirection` in favour of inherited `Component:createDirection`.
- Remove temporary `BlockComponent:getBoundingBox` parameter `orientation`.


## [2.0.0-alpha.17] – 2023-08-10

### Added

- New `Component` method `getDirection`.
- New `Circle` method `atArc`.
- New `TreeLoader` methods `closeAll`, `getSpace`, `getSpaces`.

### Changed

- BREAKING Compute and render `Edge` as a rectangle with `background-color` instead of line with `border`.
- BREAKING Rename `TreeLoader` method `init` to `initSpace`.
- BREAKING Require `depth` parameter in `TreeLoader` method `initSpace`.
- Improve `Hyperspace`, `TreeLoader` API docs.
- Improve feature demos `loaders-async`, `loaders-backward`.

### Fixed

- Prevent `KeyboardPan`, `KeyboardZoom` if a modifier key is pressed.


## [2.0.0-alpha.16] – 2023-07-05

### Added

- New feature demo `viewport-limits`.

### Changed

- Rewrite `Viewport:limitTo` logic.
- Rewrite feature demo `loaders-fractal`.
- Improve API docs of `TreeLoader`.
- Improve list of associated people.
- Upgrade dev dependencies `css-loader`, `semver`, `standard@17`, `style-loader`, `tape`, `webpack`, `webpack-cli`.

### Fixed

- Repair root handling in `TreeLoader:closeNeighbors`.

### Removed

- Remove `FractalLoader` class in favour of `TreeLoader`.
- Remove deprecated `Viewport` methods `findMostDistant`, `findWithinDistance`.


## [2.0.0-alpha.15] – 2023-06-29

### Added

- New `KeyboardPan` option `wasd` and method `update`.

### Changed

- Improve `TreeLoader`.
- Make `Viewport:responsive` idempotent i.e. duplicate calls causes the effect only once.
- Improve docs intro.
- Simplify `Circle:detectCollision` to 2D.
- Improve API docs.
- Update the class inheritance chart to `2.0.0-alpha.15`.

### Fixed

- Repair Measurement circle boundary bug and related example apps.


## [2.0.0-alpha.14] – 2023-06-28

### Added

- New `Box` method `getBoundingCircle`.
- New `Circle` class function `fromPoints`.

### Changed

- Allow `TreeLoader` mappers to return `null`.
- Migrate example app `cielab` to `2.0.0-alpha.14` API.


## [2.0.0-alpha.13] – 2023-06-27

### Added

- New `Component` methods `bringAbove`, `bringToFront`, `sendBelow`, `sendToBack`, `sortByDepth`.
- New `Viewport` method `prependChild`.
- New `TreeLoader` methods `hasSpace`.
- New feature demos `loaders-nearest`, `loaders-nested`.

### Changed

- Improve `TreeLoader` recursion detection and DOM insertion order.
- Improve `Viewport` methods `measureNearest`.


## [2.0.0-alpha.12] – 2023-06-21

### Added

- New `FrameComponent` methods `transformToFill`, `transformToFit`.
- New `Viewport` methods `zoomToFill`, `zoomToFit`.
- New `TreeLoader` methods `getFrontier`, `remapParent`.
- New feature demos `loaders-async`, `loaders-backward`.

### Changed

- BREAKING Require `close` event to be handled in `TreeLoader`.
- BREAKING Track bases and loading inside `TreeLoader`.
- Improve `TreeLoader:addSpace` to update space if it already exists.
- Improve example apps `cielab`.

### Removed

- Remove `TreeLoader` utility functions `findBacktier`, `findFrontier`, `findTreeDistances`.


## [2.0.0-alpha.11] – 2023-06-13

### Added

- New `Node` methods `getBoundingCircle`.
- New `TreeLoader` methods `countSpaces`.

### Changed

- BREAKING Rename `TreeLoader` methods:
  - rename `open` to `addSpace`.
  - rename `placeholder` to `addPlaceholder`.
- BREAKING Custom event payload in `TreeLoader` events `open`, `close`, `closed`.
- Improve example app listing in `README.md` and `docs/index.md`.
- Update library logo banner image.


## [2.0.0-alpha.10] – 2023-06-07

### Added

- New `Basis` method `getMatchedOuter`.
- New `Circle` methods `atCenter`, `changeBasis`, `detectCollision`, `getArea`, `getBoundingBox`, `getDiameter`, `getRadius`, `getRaw`, `getSize`, `offset`, `scaleBy`, `transitRaw`, `translateBy`.
- New `Point` methods `translateBy`.
- New abstract component class `Animatable` with:
  - methods `animate`, `animateOnce`, `cancelAnimation`.
  - utility functions `applyTransition` with parameters `delay`, `duration`, `easing`.
- New `Component` method `requestIdle` and property `idleTimeout`.
- Add `silent` parameter in `Component:getTransitionFrom`.
- New `Viewport` methods `adapt`, `findSingular`, `getSpaces`, `limitTo`, `measureNearest`.
- New `Hyperspace` methods `animateOnce`, `commit`.
- New `Hyperspace` property `viewport`.
- Add `Measurement` properties `connected`, `circle`.
- New `TreeLoader` methods `open`, `remapChildren`, `removeSpace`.
- New `TreeLoader` utility functions `findTreeDistances`.
- New example app `cielab`.

### Changed

- BREAKING Rename `CircleItem` to `Node`.
- Improve `Viewport` methods `measureMany`.
- Improve `TransformerComponent` method `animateOnce` to end animation on cancel.
- Inherit `Animatable` in `Viewport`, `Hyperspace`, `Item` and remove their animation methods.
- Delay `idle` event until animation (if any) has ended.
- Simplify `Hyperspace` method `renderTransform` to use only 2D.
- BREAKING Rewrite `TreeLoader` to be event based. Emit `close`, `closed`, `opened`, `replaced`.
- Improve example app `treeloader` graphics, controls, and navigation logic.

### Removed

- BREAKING Remove custom data management features from `TreeLoader`.
- Uninstall dependency `throttle-debounce`.


## [2.0.0-alpha.9] – 2023-05-26

This release removes 3D features developed since 2.0.0-alpha.1. The removal is because of the ten-fold increase in complexity the 3D features have caused both in usability and development of the library. One of the main culprits is the navigation contradiction between zooming by scaling and zooming by moving along z-axis. Supporting both made navigation logic too complex and fragile.

### Added

- New `Basis` methods `getTransformTo`.
- New `Basis` class function `fromPoints`.
- New `Component` (was `BasisComponent`) methods `atAnchor`, `getBasisAt`, `hasClass`.
- Sketch `Component` methods `addLink`, `followLink`, `hasLink`, `removeLink`, `removeLinks`.
- New `TransformerComponent` methods `matchBasis`.
- New `BlockComponent` methods `getDiameter`.
- New `Hyperspace` methods `atAnchor`.
- New `Viewport` methods `measureMany`, `removeChild`.
- New `Tap` method `update`.
- New loader class `TreeLoader` with:
  - methods `closeChildren`, `closeNeighbors`, `closeParent`, `openChild`, `openChildren`, `openParent`, `openNeighbors`, `registerCallbacks`, `resolveCallbacks`.
  - utility functions `findBacktier`, `findFrontier`, `treeDistance`.
- New example app `fruitfractal`.
- New example app `treeloader`.

### Change

- Improve argument handling in `Basis` methods `rotateBy`, `rotateByDegrees`.
- BREAKING Rename `Box` method `getBoundingSphere` to `getBoundingCircle`.
- BREAKING Rename `BasisComponent` to `Component`.
- BREAKING Rename `Viewport` method `focusTo` to `zoomTo` and simplify for 2D.
- BREAKING Simplify `Viewport` methods `measureDilation`, `measureGroup`, `measureOne` to work only in 2D.
- Improve singular inversion detection in `Viewport:scaleBy`.
- BREAKING Rename `BlockComponent` method `getBoundingSphere` to `getBoundingCircle`.
- BREAKING Simplify `TransformerComponent` method `renderTransform` to render only in 2D.
- BREAKING Simplify `Edge:renderTransform` to render only 2D edges.
- BREAKING Rename `Plane` method `getBoundingSphere` to `getBoundingCircle`.
- BREAKING Use `Plane` instead of `Space` in `Hyperspace` methods `atNorm`, `getBoundingBox`, `getBoundingCircle`.
- BREAKING Simplify `ZoomControl` to work only in 2D.
- Discourage use of `color` parameter in `CircleItem`.
- BREAKING Simplify interactions `KeyboardZoom`, `Pinch`, `WheelZoom` to work only in 2D.
- BREAKING Simplify `Measurement` to work only in 2D and without `camera` argument.
- BREAKING Use CSS transform `matrix` instead of `matrix3d`.
- Flatten and rename feature demos:
  - flat `geometry-background`.
  - rename `geometry-3d-cards` to `geometry-cards`.
  - rename `viewport-navigation-3d` to `geometry-infinity`.
- Improve tutorial.

### Fixed

- Allow `WheelCapturer` to capture only when a viewport is present. This prevents race conditions when a captured element is remove from DOM.

### Removed

- BREAKING Remove component class `Space`.
- BREAKING Remove `Basis` methods `isPlanar`.
- BREAKING Remove `FrameComponent` methods `getMass`, `isSolid`, `setSolidity`, `setMass`.
- BREAKING Remove `Hyperspace` methods `getBoundingSphere`.
- BREAKING Remove `Viewport` properties `proj`, `cameraDistance`, `navigationBasis`.
- BREAKING Remove `Viewport` methods `approach`, `atCamera`, `balanceScale`, `findNearestProjected`, `findNearRay`, `fit`, `getCameraBasis`, `getCameraDistance`, `getFieldOfView`, `measureDepth`, `projection`, `setCameraDistance`, `setPerspective`, `setProjection`, `translateTowards`, `navigable`.
- Remove feature demos `viewport-perspective`.


## [2.0.0-alpha.8] – 2023-05-05

### Added

- New `Viewport` method `getNavigationBasis`.
- List organizations that have supported the development over the years.

### Changed

- Prefer `tapspace.js` over `tapspace` in documentation titles.
- Add a link to feature demos.
- Improve API docs intro.
- Update copyright year.


## [2.0.0-alpha.7] – 2023-05-02

### Added

- New geometry class `Circle` with:
  - properties `basis`, `circle`.
  - distiction to `CircleItem` component.
- New geometry class `Line` with:
  - properties `basis`, `line`.
- New geometry class `Ray`.
  - properties `basis`, `ray`.
  - class functions `create`.
  - methods `at`, `getDistanceToPoint`.
- New `Box` method `projectTo`.
- New `Size` method `normAt`.
- New `FrameComponent` property `mass` and methods `getMass`, `setMass`.
- New `Viewport` methods `findNearRay`, `findNearestProjected`, `getCameraBasis`, `getFieldOfView`, `measureDepth`, `measureDilation`, `normAt`, `setNavigationBasis`, `tappable`.
- New `Viewport:measureGroup` parameter `filter` to enable filtering measurement targets.
- New feature demo `viewport-navigation-scalefree`.

### Changed

- BREAKING Replace `FrameComponent` property `solid` with `mass`.
- BREAKING Replace a parameter in `Viewport:responsive` from `opts` object to `enable` flag.
- Make `Viewport` responsive by default.
- BREAKING Rename `Viewport` method `rescale` to `balanceScale`.
- BREAKING Rename `Viewport` method `reorient` to `balanceOrientation`.
- BREAKING Improve measurement properties:
  - rename `area` to `areaPx`.
  - split `depth` to `depthOnCamera` and `depthOnViewport`.
  - split `distance` to `distanceToCamera` and `distanceToViewport`.
  - add new property `dilation`.
- Improve `Pinch` and `WheelZoom` by applying `findNearRay` to find a target.
- Upgrade dependencies `affineplane@2.16.0`.

### Fixed

- Repair `Arc` navigation bug caused by nested elements.


## [2.0.0-alpha.6] – 2023-04-27

### Added

- New `Area` methods `projectTo`.
- New `Basis` methods `createDirection`, `createVector`, `rotateByDegrees`.
- New `Distance` methods `min`, `max`.
- New `FrameComponent` methods `isSolid`, `setSolidity`.
- New `Viewport` methods `getAspectRatio`, `measureGroup`.
- New `InteractiveComponent` methods `hasInteraction`.
- New class `Measurement`.
- New test assertion `almostEqualDirection`.

### Changed

- BREAKING Rename `tapspace.createCustomControl` to `tapspace.createControl`.
- Alias `Viewport` method `setPerspective` to `setCameraDistance`.
- Improve `Edge:trimPoints` with `trimStart`, `trimEnd` parameters.
- Improve `loaders-fractal` demo with `squareText`.
- Upgrade dependencies `affineplane@2.15.0`.
- Upgrade dev dependencies `semver`.
- Improve glossary.


## [2.0.0-alpha.5] – 2023-04-12

### Added

- Export `affineplane` library as `tapspace.math`.
- New geometry class `Area` with:
  - properties `basis`, `area`.
  - methods `getRaw`, `changeBasis`, `transitRaw`.
- New geometry class `Basis` (the component class was renamed to `BasisComponent`) with:
  - properties `basis`, `tran`.
  - methods `at`, `changeBasis`, `createDistance`, `getOrientation`, `getRaw`, `getScale`, `innerOffset`, `offset`, `outerOffset`, `polarOffset`, `rotateBy`, `scaleBy`, `transformBy`, `transitRaw`, `transitRawOuter`, `translateBy`.
- New geometry class `Volume` with:
  - properties `basis`, `volume`.
  - methods `getRaw`, `changeBasis`, `transitRaw`.
- New geometry class `Sphere` with:
  - properties `basis`, `sphere`.
  - class functions `fromPoints`.
  - methods `atCenter`, `changeBasis`, `detectCollision`, `getBoundingBox`, `getDiameter`, `getRadius`, `getRaw`, `getSize`, `getVolume`, `offset`, `scaleBy`, `transitRaw`, `translateBy`.
- New `Box` methods `detectCollision`, `getArea`, `getBoundingSphere`, `getDiagonal`, `getVolume`, `resizeTo`, `translateBy`.
- Alias `Box` method `at` with `getPoint`.
- New `Point` methods `homothety`, `transformBy`.
- New `Size` methods `getArea`.
- Add type flags to geometries `Area`, `Box`, `Direction`, `Distance`, `Orientation`, `Path`, `Point`, `Scale`, `Size`, `Sphere`, `Transform`, `Vector`, `Volume`.
- New `BasisComponent` (was `Basis`) methods `getBasis`, `getVector`, `replaceChild`, `replaceParent`.
- Alias `BasisComponent` method `at` with `getPoint`.
- New `TransformerComponent` (was `Transformer`) methods `setBasis`.
- New `Plane` methods `getBoundingSphere`.
- New `Space` methods `atNorm`, `getBoundingSphere`, `getSize`.
- Alias `FrameComponent` (was `Frame`) method `atNorm` with `getNormalizedPoint`.
- New `BlockComponent` (was `Block`) methods `getArea`, `getBoundingSphere`.
- Alias `BlockComponent` method `atNorm` with `getNormalizedPoint`.
- New `CircleItem` (was `Circle`) method `getDiameter`.
- New `Viewport` methods `measureOne`, `reorient`, `rescale`, `setOrientation`, `setPerspective`, `zoomToFill`, `zoomToFit`.
- Add measurement properties `depthPx`, `areaPx`, `areaRatio`, `dilation`, `distanceToViewportPlanePx`, `distanceToViewportCenterPx`, `target`, `visible` into `Viewport` measurements.
- New `Hyperspace` methods `atNorm`, `getBoundingBox`, `getBoundingSphere`, `renderTransform`, `scaleBy`.
- Make `CameraCapturer` emit `camerain` and `cameraout` events.
- New loader class `FractalLoader` with:
  - methods `cardinality`, `closeNode`, `getChildren`, `getSpace`, `getSiblings`, `growAndPrune`, `isNodeAlive`, `isNodeOpen`, `openChildren`, `openParent`, `openSiblings`, `removeNode`, `retireNode`, `reuniteNode`.
  - events `initiated`.
- Add "Glossary" section in v2 docs.
- New features demos `geometry-measuring`.
- New test assertions `almostEqualBasis`, `almostEqualSphere`.
- Sketch example apps `logo`, `tutorial`.
- Sketch new component class `Fractal`.

### Changed

- BREAKING Rename `tapspace.createCustomControl` to `tapspace.createControl`.
- BREAKING Rename `Controls` to `ViewportControls`.
- BREAKING Rename `Control` to `ControlComponent`.
- BREAKING Make `Viewport` perspective by default with distance of `300px`.
- BREAKING Init `Viewport` anchor at the viewport middle.
- BREAKING Rename `Viewport` method `measurePlanes` to `measureAll`.
- BREAKING Rename `Block` to `BlockComponent`.
- BREAKING Rename `Frame` to `FrameComponent`.
- BREAKING Rename `FrameComponent` method `resize` to `resizeTo`.
- BREAKING Rename `Circle` to `CircleItem`.
- BREAKING Rename `Basis` to `BasisComponent`.
- Improve `BasisComponent:setParent` with additional `position` parameter.
- BREAKING Rename `Block` to `BlockComponent`.
- BREAKING Rename method `atToNorm` to `normAt` in `BlockComponent`, `FrameComponent`, `Box`.
- BREAKING Rename `Interactive` to `InteractiveComponent`.
- BREAKING Event `contextmenu` cancels all gestures.
- Migrate tutorial to `tapspace@2.0.0-alpha.4` API.
- Upgrade dependencies `affineplane@2.13.0`.
- Improve feature demos `loaders-fractal`, `components-pixel`, `interaction-approach`, `viewport-zoomable`.
- Improve API docs.
- Improve design docs.
- Update class hierarchy chart.

### Fixed

- Repair `Basis:setParent` behavior when the parent is `Viewport`.
- Repair `Basis:getParent` behavior when there is no parent.
- Improve Firefox-compatibility with style rule `.affine-frame { ... backface-visibility: hidden; }`.

### Removed

- BREAKING Remove confusing `Plane` methods `createPlane` in favour of `addChild`.
- BREAKING Remove confusing `Space` methods `createPlane`, `createSpace` in favour of `addChild`.
- BREAKING Remove confusing `Viewport` methods `addPlane`, `addSpace`, `createPlane`, `createSpace` in favour of `addChild`.
- BREAKING Remove orthogonal mode from `Viewport` and remove methods `isPerspective`, `orthogonal`, `perspective`.
- BREAKING Remove `Viewport` measurement properties `distance`, `vector`.
- Remove sketchy `BasisComponent` (was `Basis`) method `replaceBy`.


## [2.0.0-alpha.4] – 2023-02-10

### Added

- New component class `Hyperspace` that will stand between the viewport and spaces/planes.
- New component class `Transformer` that adopts most methods from `Plane`.
- New component class `CustomControl` with:
  - inherited properties and methods from `Control`.
  - method `html`.
  - creation function `tapspace.createCustomControl`.
- New `Basis` method `at`. Replaces `Transformer:at` (was `Plane:at`).
- New `Basis` methods `getOrientation`, `isPlanar`, `remove`, `removeChild`.
- New `Plane` creation methods `Plane.create`, `Plane:createPlane` and `tapspace.createPlane`.
- New `Plane` methods `addChild`, `createPlane` for child plane creation.
- New `Plane` methods `getBoundingBox`.
- New `Space` methods `createPlane`, `createSpace` alias `createSubspace`, `getBoundingBox`.
- New `Viewport` creation method `createViewport` alias `createView`.
- New `Viewport` methods `addChild`, `addPlane`, `addSpace`, `createPlane`, `createSpace`, `fit`, `removeControl`.
- Component type flag for each component for fast and easy check. For example `Item:isItem`.
- Add depth property `Frame:size.d`. By default d=0.
- New `Block` method `getBoundingBox`, `scaleToWidth`, `scaleToHeight`, `scaleToFill`, `scaleToFit`.
- New `Frame` methods `setHeight`, `setWidth`.
- New `Transformer` methods `setOrientation`, `setScale`.
- New `Circle` methods `getRadius`.
- New `Arc` methods `getLength`, `getRadius`.
- New `Edge` methods `getBoundingBox`, `trimPoints`.
- New geometry class `Box` with:
  - constructor parameters `basis`, `box`.
  - properties `basis`, `box`.
  - class functions `fromBoxes`, `fromPoints`.
  - methods `at`, `atCenter`, `atNorm`, `atToNorm`, `getBox`, `getBoundingBox`, `getRaw`, `getSize`, `getWidth`, `getHeight`, `getDepth`, `rotateBy`, `scaleBy`, `transitRaw`.
- New geometry class `Orientation` with:
  - class functions `fromVectorBasis`.
  - methods `changeBasis`, `getRaw`, `getUnitX`, `getUnitY`, `getUnitZ`, `transitRaw`, `transitRawOuter`.
- New `Point` methods `transitRawOuter`.
- New `Scale` methods `transitRawOuter`.
- Add depth property `Size:size.d`.
- Add a note to the tutorial about the tapspace version that was used for the tutorial.
- New feature examples `geometry-background`, `geometry-uniform-scaling`, `viewport-controls`.
- New test assertions `almostEqual`, `almostEqualOrientation`.
- Document "Orthogonal Language Design".

### Changed

- Repurpose `Space` to be 3D variant of `Plane`.
- Make `Space` inherit from `Transformer` instead of `Basis`.
- Make `Block` inherit from `Transformer` instead of `Plane`.
- Refactor `Viewport`, `WheelZoom` to use `Hyperspace` instead of a `Space`.
- Make CSS class `affine-plane` flat by `transform-style: flat`.
- Move most `Plane` methods to `Transformer` and make `Plane` inherit `Transformer`.
- Update feature demos `components-basis`, `component-arc`, `components-edge-3d`, `components-edge`, `components-element`, `components-network-3d`, `components-pixel`, `effects-press`, `geometry-3d`, `geometry-animate`, `geometry-matching`, `interaction-approach`, `interaction-content`, `interaction-drag`, `interaction-hold`, `interaction-rotate`, `interaction-slide`, `interaction-tap`, `loaders-fractal`, `viewport-controls`, `viewport-focus`, `viewport-pannable`, `viewport-perspective`, `viewport-responsive`, `viewport-rotatable`, `viewport-zoomable`.
- Merge feature demos `components-arc`, `components-edge` and rename to `components-edges`.
- Rename feature demo `geometry-3d` to `geometry-3d-cards`.
- Rename feature demo `viewport-controls` to `viewport-navigation-3d`.
- BREAKING Rename `resize` event payload property `prevSize` to `previousSize`.
- BREAKING Replace `Frame:resize` parameter `options` with a `pivot` point.
- BREAKING Replace `Transformer` method `matchScale` with `setScale`.
- BREAKING Rename `Transformer` method `matchPoints` with `matchPoint`.
- Rename `Transformer` helper function `applyTransform` to `applyTransform2d`.
- Improve `Transformer:match` to allow 3D translation.
- Rename `Edge` method `renderTrackingTransform` to `renderNormalTransform` and use attractor point instead of a view.
- Update the tutorial to `2.0.0-alpha.3`.
- Update the class chart to `2.0.0-alpha.4`.
- Upgrade dependencies `affineplane@2.10.0`.
- Upgrade dev dependencies `yamdog@2.0.0`, `tape`.
- Improve package script `audit` to omit dev dependencies.

### Fixed

- Prevent accidental `npm publish` without an alpha tag.
- Detect nullish point argument in `Transformer:translateTo`.

### Removed

- Remove duplicate `Space` method `getViewport` and its aliases `getView`, `viewport`.
- Remove `Basis:getSpace` as unnecessary.
- Remove `Basis:appendTo` as dangerously similar to `appendChild`.
- BREAKING Remove `Basis` methods `copy`, `clone` as being too high level to be useful.
- BREAKING Remove `Transformer` method `matchPosition` in favour of `matchPoint` and `match`.
- Remove temporary method `Viewport:setRollingBackground`.
- Uninstall dependency `monotone-convex-hull-2d`.
- Remove sketchy `Point` method `connect`.
- Remove sketchy `Frame` method `getHull`.
- BREAKING Remove `Size` methods `at`, `atNorm`, `atToNorm`. Use `Box` methods instead.
- Remove feature demo `components-edge-3d` in favour of `components-edges`.


## [2.0.0-alpha.3] – 2023-01-16

### Added

- New `Distance` methods `isAlmostEqual`, `isGreaterThan`, `isLessThan`, `projectTo`.
- Alias `createGroup` for `tapspace.createBasis`.
- Alias `appendChild` for `Basis:addChild`.
- New `Basis` methods `getSpace`, `getViewport`, `prependChild`, `setId`.
- New `Plane` methods `animateOnce`.
- New `Viewport` methods `animate`, `animateOnce`, `findWithinDistance`, `focus`, `focusTo`, `getCameraDistance`, `measurePlanes`, `setMeasureMode`.
- New component `Arc` for curved edges.
- New `Interactive` methods `focusable`, `getCapturer`, `hasCapturer`, `removeAllInteractions`, `requestIdle`, `setContentInput`, `startCapturer`, `stopCapturer`, `updateCapturer`.
- New `Item` methods `approachable`, `disable`, `focus`.
- Ability to chain `Item` methods `draggable`, `holdable`, `rotatable`, `scalable`, `slidable`, `tappable`.
- New capturer class `CameraCapturer` for semantic zooming. Emits `cameraenter`, `cameraleave`.
- New capturer class `Capturer` for common capturer logic.
- New capturer class `KeyboardCapturer` for keyboard navigation.
- New `WheelCapturer` helper function `isEventAffine`.
- New interaction class `Approach` for semantic zooming.
- New interaction classes `KeyboardPan`, `KeyboardZoom`.
- New CSS class names `affine-proxy-pointer`, `affine-proxy-wheel` to control input delegation.
- New options parameter `preventDefault` in `Item:tappable` and `Tap` constructor.
- Toggle CSS class `active-tap` during tap gesture.
- New feature example apps `interaction-approach`, `interaction-content`, `components-arc`, `viewport-focus`.
- New informative chart for interaction logic.

### Changed

- Improve `Basis:addClass` to take three optional class names.
- Improve `Circle` to inherit `Item`.
- Make `Circle` constructor parameter `color` optional.
- Change `Viewport:atCamera` to return viewport middle instead of anchor in orthogonal mode.
- Improve `GestureCapturer` to find viewport automatically.
- Change `CameraCapturer`, `GestureCapturer`, `ResizeCapturer`, `WheelCapturer` to inherit from `Capturer`.
- Prevent double `bind` in capturers.
- Upgrade dev dependencies `css-loader`.

### Fixed

- Detect undefined class name arguments in `Basis:addClass`.

### Removed

- Remove alias `add` of `Basis:addChild`.
- Uninstall dev dependency `jquery`.
- Remove deprecated `GestureCapturer` helper class `CompatibilitySensor`.


## [2.0.0-alpha.2] – 2022-12-05

### Added

- New components `Block` and `Frame` from `AbstractFrame`.
- Document the documentation style guide at `docs/dev/docstyle.md`.
- Draw class inheritance chart.
- New `tapspace` functions `createCircle`, `createEdge`.
- New dependency `throttle-debounce@5`.
- New interaction event `idle` emitting from captured planes.

### Changed

- BREAKING Rename `AbstractNode` to `Basis`.
- BREAKING Combine and rename `AbstractPlane` to `Plane`.
- BREAKING Divide `AbstractFrame` to `Block` and `Frame`.
- Move methods `add`, `addChild` from `Plane` to `Basis`.
- Prevent calls to `AbstractView` methods `add`, `addChild`.
- BREAKING Emit interaction events from `source` instead of `target`.
- Change `AbstractView` to inherit from `Block` instead of `Plane`.
- BREAKING Rename `AbstractActive` to `Interactive`.
- BREAKING Rename `AbstractControl` to `Control`.
- BREAKING Rename `AbstractItem` to `Item`.
- BREAKING Merge `Element` into `Item`.
- BREAKING Merge `AbstractView` into `Viewport`.
- BREAKING Change `Item:html` behavior to replace the content instead of appending.
- BREAKING Rename `Viewport` method `getElementAt` to `getItemAt`.
- Lift `capturers` outside `Interactive`.
- Rename capturer freedom parameter `freedom.center` to `freedom.pivot`.
- Refactor `GestureCapturer` event handlers.
- BREAKING Rename CSS class name `affine-element` to `affine-frame`.
- Change `tapspace.createBasis` to create a `Group` instead of a `Plane`.
- Upgrade dependencies `affineplane@2.9.0`.
- Upgrade dev dependencies `css-loader`, `semver`, `tape`, `webpack`, `yamdog`.
- Simplify API documentation markup.
- Improve API docs in various places.
- Update tutorial.
- Update license year.

### Fixed

- Correct CSS class ordering in component class names and in the stylesheet.

### Removed

- Remove `options` from `Item:create` method parameters.
- BREAKING Remove `tapspace.circle` in favour of `tapspace.createCircle`.
- BREAKING Remove `tapspace.edge` in favour of `tapspace.createEdge`.
- BREAKING Remove `tapspace.space` in favour of `tapspace.createSpace`.
- BREAKING Remove `tapspace.element` in favour of `tapspace.createItem`.
- BREAKING Remove `Pixel` component.


## [2.0.0-alpha.2a] – 2022-11-24

Including commits up to 6253dcb2b064492464b482ec2b728de72fb7b31a.

### Added

- New feature examples `components-basis`, `components-edge-3d`, `components-element`, `components-network-3d`, `interaction-hold`, `interaction-rotate`, `interaction-slide`, `loaders-fractal`.
- Alias `tapspace.element` function with `createElement`.
- Alias `tapspace.create` function with `createSpace`.
- Alias `tapspace.circle` function with `createCircle`.
- New namespace `tapspace.utils` with function `isAffine`.
- New `AbstractNode` methods `addClass`, `getDescendants`, `getLeaves`, `isLeaf`, `removeClass`, `setParent`.
- New `AbstractPlane` methods `getDirection`, `getDistanceTo`, `getVectorTo`, `matchOrientation`, `matchPoints`, `matchPosition`, `matchScale`, `rotateByDegrees`, `setScale`.
- New parameter `center` in `AbstractPlane:transformBy`.
- New `AbstractFrame` methods `matchSize`, `matchPixelSize`, `resize`.
- Alias `AbstractFrame` method `atMid` with `atMiddle`.
- New `AbstractView` methods `findMostDistant`, `moveCenterTo`.
- New overriding `AbstractView` methods `atBottomLeft`, `atBottomMid`, `atBottomRight`, `atMidLeft`, `atMidMid`, `atMidRight`, `atTopLeft`, `atTopMid`, `atTopRight`, `getHeight`, `getWidth`.
- New parameter `center`in `AbstractView:transformBy`.
- New `AbstractActive` methods `addInteraction`, `getInteraction`, `removeInteraction`.
- New `AbstractItem` methods `holdable`, `rotatable`, `scalable`, `translatable`.
- New `Space` methods `add`, `addBasis`, `addPlane`, `transformBy`, `translateBy`.
- Render `Edge` components in 3D with the aid of `renderTrackingTransform`, `renderOrthogonalTransform`.
- Alias `Viewport` method `scalable` with `scaleable`.
- New `Plane` class function `create`.
- New `GestureCapturer` methods `convertToActive`, `getCenter`, `getFreedom`.
- New interaction classes `Hold`, `Pinch`, `Slide`.
- New `Direction` methods `getRaw`, `getVector`, `toVector`, `transit`, `transitRaw`.
- New `Direction` class function `fromSpherical`.
- New `Distance` methods `getNumber`, `getRaw`, `getVector`, `transit`, `transitRaw`.
- New `Distance` class function `fromVector`.
- New `Path` methods `changeBasis`, `getRaw`, `transit`, `transitRaw`.
- New `Point` methods `addVector`, `getDirectionTo`, `transit`, `transitRaw`.
- New `Scale` methods `getRaw`, `scaleBy`, `transit`, `transitRaw`.
- New `Size` methods `getRaw`, `scaleBy`, `transit`, `transitRaw`.
- New `Transform` methods `getRaw`, `getRotation`, `getVector`, `transit`, `transitRaw`.
- New `Vector` methods `getRaw`, `transit`, `transitRaw`.
- New `Vector` class function `fromAverage`, `fromPolar`, `fromSpherical`.
- Write guidelines for coding style.
- New package build scripts `test:browser`, `test:browser:open`, `test:browser:build`.
- New test assertions `almostEqualPoint`, `almostEqualVector`.

### Changed

- Improve tutorial.
- Improve developer docs.
- Move v2 API docs to `/docs/api/v2`.
- Improve API docs of various classes.
- Upgrade dependencies `affineplane@2.7.0`.
- Upgrade dev dependencies `yamdog@1.5.0`.
- Use most distant item as default target in `Pinch`, `WheelZoom`.
- Rename `ResizeAlign` interaction to `RealignView`.
- BREAKING Replace `Direction` constructor parameter `angle` with `vec`.
- Upgrade `Distance` internals to use 3D distance.
- Upgrade `Point` internals to use 3D points.
- BREAKING Rename `Point` methods:
  - Rename `distanceTo` to `getDistanceTo`.
  - Rename `plain` to `getRaw`.
  - Rename `vectorTo` to `getVectorTo`.
- BREAKING Rename `Scale` property `s` to `m`.
- Upgrade `Transform` internals to use 3D transforms.
- Upgrade `Vector` internals to use 3D vectors.
- Change `Vector:dot` to return a `Distance`.
- Move `AbstractPlane` property `tran` to `AbstractNode`.
- Move `AbstractPlane` transition methods to `AbstractNode`: `getTransitionFrom`, `getTransitionTo`, `getTransitionToParent`, `getTransitionToParentOf`.
- Upgrade `AbstractPlane` internals to use 3D planes.
- BREAKING Reduce `AbstractPlane` method `moveTo` to be alias of `translateTo`.
- BREAKING Replace `AbstractPlane` method `snapPixels` parameter `options` with `anchor`.
- Improve `AbstractPlane:setAnchor` method: allow numeric coordinate arguments.
- BREAKING Replace `AbstractPlane` method `renderTransform` parameter `opts.projection` with `alt`.
- BREAKING Rename `AbstractFrame` methods:
  - Rename `centerTo` to `moveCenterTo`.
  - Rename `fitScale` to `fitShape`.
- Improve `AbstractFrame:setSize` method: allow numeric width and height arguments.
- BREAKING Rename `AbstractView` methods:
  - Rename `transformPlanesBy` to `transformSpaceBy`.
- BREAKING Prevent `AbstractView`, `Space`, `Viewport` resizing via tapspace API.
- BREAKING Rename `Space` method `createPlane` to `addBasis` with alias `addPlane`.
- BREAKING Convert `Space` to inherit from `AbstractNode` instead of `AbstractPlane`. Selectively reuse methods from `AbstractPlane`.
- Set minimum `Viewport` height to `min-height: 200px`.
- Include `tapspace.css` stylesheet in the prebuilt bundle.
- Render CSS transforms only with `applyTransform3d`.
- Revive and improve test suite.
- Separate test suites of `version`, `geometry`, and `components` to dedicated subdirectories.

### Fixed

- Use `toFixed` in `Edge:renderTransform` to prevent scientific notation messing up the CSS transform.
- Use `persective` style rule value `none` instead of `unset` when using `orthogonal projection`.

### Removed

- BREAKING Remove `AbstractPlane` method `getDirection`.
- BREAKING Remove `Viewport` method `pinchable`.
- BREAKING Remove `options` parameter from constructors of `AbstractControl`, `AbstractFrame`, `AbstractItem`, `AbstractPlane`, `AbstractView`.
- BREAKING Remove `options` parameter from constructors of `Circle`, `Edge`, `Element`, `Pixel`.
- BREAKING Remove interaction classes `Drag`, `Rigid`, `Rotate`, `Scale` in favour of `Pinch`.
- BREAKING Remove interaction class `PinchView` in favour of `Pinch` with a viewport applicator.
- Remove component sketches `Image`, `Line`, `Text`.
- Remove package scripts `test:headless`, `test:headless:watch`.


## [2.0.0-alpha.1] – 2022-09-19

This release introduces the first 3D rendering and 3D navigation features.

### Added

- Alias `space` for `viewport`.
- New `Element` method `html`.
- New `AbstractNode` method `copy` and its alias `clone`.
- New `AbstractNode` methods `findAffineAncestor`, `getElement`.
- New `AbstractPlane` methods `getTransitionFrom`, `translateTo`.
- New `AbstractPlane` utility function `counterTransformOrigin`.
- Implement `Space` component class with:
  - constructor parameters `element`, `options`, `options.size`.
  - property `view`.
  - method `createPlane` alias `plane` alias `group`.
  - method `getView` alias `viewport` alias `getViewport`.
- Implement `Plane` component class with:
  - properties and methods from `AffineElement`.
  - methods `add`.
- Implement `AbstractControl` component class with:
  - inherited properties and methods from `AbstractFrame`.
- Implement `ZoomControl` component class with:
  - inherited properties and methods from `AbstractControl`.
  - constructor parameters `options`, `options.scaleStep`.
  - methods `bind`, `unbind`.
- New `AbstractView` property `cameraDistance`.
- New `AbstractView` methods `approach`, `atCamera`, `getElementAt`, `getSpace`, `orthogonal`, `perspective`, `isPerspective`.
- New `AbstractFrame` methods `getHeight`, `getWidth`.
- Sketch `AbstractPlane` method `snapGrid`.
- Sketch `AbstractFrame` methods `fitScale`, `fitSize`, `getHull`.
- Sketch new component `Line`.
- Add new property `target` in `wheel` event payload.
- New `Point` methods:
  - New alias `fromMean` for `fromAverage`.
  - New method `projectTo(basis, camera)`.
  - Sketch `connect`.
- New `Vector` methods `add`, `almostEqual`, `copy`, `cross`, `difference`, `dot`, `getDirection`, `getDistance`, `multiply`, `negate`, `norm`, `normalize`, `rotateBy`, `scaleBy`, `subtract`, `transformBy`.
- Sketch new geometries `Grid`, `Polygon`.
- Write down design principles in the architecture documentation at `docs/api2.md`.
- New feature demo `geometry-3d.html`.
- Add link to `v1.x` branch in `README.md`.
- Write tutorial for `v2`.
- Introduce `loaders` and sketch `loadImages` and `Fractal`.

### Changed

- Upgrade dependency `affineplane` to v2.5.1.
- Upgrade dev dependency `yamdog` to v1.4.0.
- Changes to geometry classes:
  - Upgrade `Point` geometry to 3D with new `z` parameter and property.
  - Upgrade `Vector` geometry to 3D with new `z` parameter and property.
  - Rename `Direction` method `projectTo` to `changeBasis`.
  - Rename `Distance` method `projectTo` to `changeBasis`.
  - Rename `Point` method `projectTo` to `changeBasis`.
  - Rename `Scale` method `projectTo` to `changeBasis`.
  - Rename `Size` method `projectTo` to `changeBasis`.
  - Rename `Transform` method `projectTo` to `changeBasis`.
  - Rename `Transform` class function `createFromParams` to `fromFeatures`.
  - Rename `Vector` method `projectTo` to `changeBasis`.
- Changes to component classes:
  - Rename `Component` class to `Element`.
  - Rename `component` creation method to `element`.
  - Upgrade `AbstractPlane` property `proj` to have `z` property.
  - Rename `AbstractPlane` methods:
    - `add` to `addChild`.
    - `getProjectionTo` to `getTransitionTo`.
  - Rename `AbstractPlane` property `proj` or `plane` to `tran`.
  - Upgrade `AbstractFrame:atNorm` method to 3D with `rz` parameter.
  - Upgrade `AbstractView:atNorm` method to 3D with `rz` parameter.
  - Replace parameter `opts` with `center` in `AbstractPlane` and `AbstractView` transform methods `rotateBy`, `scaleBy`, `transformBy`, `translateBy`.
- Changes to interaction classes:
  - Rename `PinchLayers` to `PinchView`.
  - Rename `Drag`, `PinchView` property `initialPlane` to `initialTran`.
  - Update `WheelZoom` and `PinchView` to use intelligent perspective transform.
  - Update `GestureCapturer` to find affine target and provide event payload with the property `target`.
  - Cancel gestures on `contextmenu` event.
- Changes to style rules:
  - set `perspective: 300px` for `affine-viewport`.
  - set `transform-style: preserve-3d` for `affine-layer` and `affine-controls`.
- Update API docs of many geometry and component classes.
- Replace documentation banner image.
- Convert API docs root to select version and provide API docs for both v1.6.0 and v2.0.0-alpha.1.

### Fixed

- Add missing installation docs about `tapspace.css`.
- Set pointer capture on original target in `GestureCapturer`.

### Removed

- Remove `Layer` component
- Remove `AbstractView` methods `addLayer`, `findLayer`, `getLayers`.
- Remove creation method `layer`.
- Remove component sketch `Tunnel`.
- Discard reference files set aside from `v1.6.0`.
- Remove old package script `replaceliburl`.


## [2.0.0-alpha.1a] – 2022-07-26 – Before 3D

### Added

- Sketchy v2 API documentation.
- Add "Contribute" section to `README`.
- Add package scripts `lint:lib`, `audit`.
- Set up `.editorconfig`.
- Install new depencencies:
  - `affineplane` for affine geometry
  - `to-px` for CSS unit conversion.
- Install dep dependencies:
  - `path-browserify`, `process`, `stream-browserify`, `ejs-loader` to enable in-browser tape tests.
  - `yamdog` for API docs generation.
- Create `features` directory for sketchy code used to sketch v2 API and to conduct readability and other tests. The directory was temporarily named `scaffold`.
- New example app `visjs` to exhibit Vis.js integration.
- Implement `AbstractNode` component class with:
  - inherit properties and methods from `Emitter`.
  - constructor parameters `element`.
  - properties `element`.
  - methods `getAncestors`, `getChildren`, `getParent`, `getRoot`, `findCommonAncestor`, `isRoot`, `isLeaf`.
- Implement `AbstractPlane` component class with:
  - inherited properties and methods from `AbstractNode`.
  - constructor parameters `element`, `opts`, `opts.anchor`.
  - properties `el`, `anchor`, `proj`.
  - content methods `add(component, placement)`, `replaceBy`.
  - geometry methods `at`, `atAnchor`, `getDirection`, `getPosition`, `getProjectionTo`, `getProjectionToParent`, `getProjectionToParentOf`, `getRotation`, `getScale`.
  - manipulation methods `match`, `moveTo`, `rotateBy`, `setAnchor`, `scaleBy`, `snapPixels`, `transformBy`, `translateBy`.
  - animation methods `animate`.
  - rendering method `renderTransform` that calls one of the CSS transform utility methods:
    - `applyTransform` for 2D CSS transforms (is a refurbished and renamed version of `setElementTransform`).
    - `applyTransition` for animated CSS transforms.
    - `applyTransform3d` for 3D transforms.
    - `applyTransformOrigin` for origin change.
  - event `transformed`.
- Implement `AbstractFrame` component class with:
  - inherited properties and methods from `AbstractPlane`.
  - constructor options `size`.
  - two-directional references via `rectangle.el.affine`.
  - coordinate methods `atNorm`, `atToNorm`, `atTopLeft`, `atTopMid`, `atTopRight`, `atMidLeft`, `atCenter`, `atMidMid`, `atMid`, `atMidRight`, `atBottomLeft`, `atBottomMid`, `atBottomRight`.
  - transformation methods `centerTo`.
  - dimension methods `getSize`.
- Implement `AbstractActive` component class with:
  - properties `capturers`, `converters`.
  - methods `capturer`.
- Implement `AbstractItem` component class with:
  - constructor parameters `element`, `opts`.
  - `draggable`, `pannable`, `resizable`, `slidable`, `slideable`, `tappable`.
- Implement component `AffineLayer` with
  - inherited properties and methods from `AbstractPlane`.
- Implement `AbstractView` component class with:
  - inherited properties and methods from `AbstractFrame`.
  - geometry methods `atPage`, `atPageFn`, `toPage`.
  - transforming methods `rotateBy`, `scaleBy`, `transformBy`, `translateBy`, `transformLayersBy`.
  - content methods `addControl`, `addLayer`, `findLayer`, `getControls`, `getLayers`.
  - override methods `atNorm`, `getSize`, `renderTransform`, `setSize`.
  - sketched methods `layer`.
- Implement `Viewport` component class with:
  - inherited properties and methods from `AbstractView`, `AbstractActive`.
  - class function `create`.
  - constructor parameters `element`, `options`, `options.size`, `options.interaction`, `options.projection`.
  - methods `navigable`, `pannable`, `responsive`, `rotatable`, `rotateable`, `scalable`, `zoomable`.
  - override method `renderCss`.
  - sketch methods `pinchable`.
- Implement `Component` component class with:
  - inherited properties and methods from `AbstractFrame`, `AbstractItem`.
  - class function `create`.
  - constructor parameters `content`, `opts`, `opts.id`, `opts.className`, `opts.anchor`, `opts.size`.
- Implement `Group` component class with:
  - inherited properties and methods from `AbstractPlane`.
- Implement `Layer` component class with:
  - inherited properties and methods from `AbstractPlane`.
  - property `z` for depth.
- Implement `Space` component class with:
  - inherited properties and methods from `AbstractPlane`.
- Implement `Controls` component class with:
  - inherited properties and methods from `AbstractPlane`.
- Implement `Pixel` component class with:
  - inherited properties and methods from `AbstractFrame`.
- Implement `Circle` component class with:
  - inherited properties and methods from `AbstractFrame`.
- Implement `Edge` component class with:
  - inherited properties and methods from `AbstractFrame`.
  - helper function `cssBorder`, `completeBorderOptions`.
  - methods `atEnd`, `atStart`, `getLength`, `setPoints`.
- Sketch component classes `AbstractControl`, `TextBlock`, `Image`, `ZoomControl`.
- Implement an input capturer class `GestureCapturer` with:
  - constructor parameters `component`, `options`, `options.freedom`, `options.preventDefault`.
  - events `gesturestart`, `gesturemove`, `gesturecancel`, `gestureend` with payload `{ travel, duration, component, transform, delta }`.
  - helper functions `projectPointers`.
  - methods `unbind`.
  - subclass `Sensor` that records `pointer` events.
- Implement an input capturer class `WheelCapturer` with:
  - methods `update`, `unbind`.
  - event `wheel` with payload `{ center, component, deltaX, deltaY }`.
- Implement `ResizeCapturer` input capturer class with:
  - methods `update`, `unbind`.
  - event `resize`.
- Sketch input capturer classes `KeyboardCapturer`.
- Implement interaction class `Drag` with:
  - methods `bind`, `setSource`, `setTarget`, `unbind`.
  - events `dragstart`, `dragmove`, `dragend`, `dragcancel`, `drag`.
- Implement interaction class `Tap` with:
  - methods `bind`, `setSource`, `setTarget`, `unbind`.
  - events `tapstart`, `tapcancel`, `tapend`.
- Implement interaction class `PanLayers` with:
  - methods `bind`, `unbind`.
  - events `panstart`, `panmove`, `pancancel`, `panend`, `pan`.
- Implement interaction class `PinchLayers` with:
  - constructor parameters `viewport`, `options`, `options.freedom`, `options.center`, `options.angle`.
  - methods `bind`, `getOptions`, `unbind`.
  - style class `active-pinch`.
- Implement interaction class `WheelZoom` with:
  - methods `bind`, `unbind`.
- Implement interaction class `WheelRotate` with:
  - methods `bind`, `unbind`.
- Implement `ResizeAlign` interaction class with:
  - methods `bind`, `unbind`.
  - automatic midpoint re-aligning upon resize.
  - event `resize`.
- Sketch interaction classes `Hold`, `Pinch`, `Resize`, `Rigid`, `Rotate`, `Scale`, `Slide`, `WheelPan`.
- Implement `Direction` geometry class with:
  - constructor parameters `basis`, `angle`.
  - properties `basis`, `r`.
- Implement `Distance` geometry class with:
  - constructor parameters `basis`, `d`.
  - properties `basis`, `d`
  - methods `projectTo`, `scaleBy`.
- Implement `Point` geometry class with:
  - constructor parameters `basis`, `x`, `y`.
  - properties `basis`, `x`, `y`.
  - class functions `average`.
  - method `distanceTo`, `offset`, `plain`, `polarOffset`, `projectTo`, `round`, `vectorTo`.
- Implement `Scale` geometry class with:
  - constructor parameters `basis`, `multiplier`.
  - properties `basis`, `s`.
- Implement `Size` geometry class with:
  - constructor parameters `basis`, `width`, `height`.
  - methods `at`, `atNorm`, `atToNorm`, `projectTo`.
- Implement `Transform` geometry class with:
  - constructor parameters `basis`, `a`, `b`, `x`, `y`.
  - properties `basis`, `a`, `b`, `x`, `y`.
  - class functions `createFromParams`, `estimate`.
  - methods `getTranslation`, `transformBy`, `projectTo`, `inverse`.
- Implement `Vector` geometry class with:
  - constructor parameters `basis`, `x`, `y`.
  - properties `basis`, `x`, `y`.
  - methods `projectTo`.
- Sketch geometry classes `Path`, `Tunnel`.
- Implement directory `effects` and `press` effect.
- Implement main component creation functions `circle`, `component`, `edge`, `layer`, `pixel`, `viewport`.
- Implement the main stylesheet `tapspace.css` with:
  - classes `affine-element`, `affine-layer`, `affine-group`, `affine-plane`, `affine-viewport`, `affine-controls`.
  - rules `display:block; box-sizing: border-box; position: absolute`.
  - rules for viewport `position: relative; overflow: hidden; touch-action: none;`.

### Changed

- Upgrade dependencies `component-emitter@1.3`, `nudged@2`.
- Upgrade to `webpack@5`.
- Upgrade dev dependencies `async`, `css-loader`, `genversion`, `finalhandler`, `jquery`, `semver`, `serve-static`, `standard@16`, `style-loader`, `tape`.
- Improve `minimal` example sketch.
- Convert package index to a callable function that creates `SpaceElement` from `HTMLElement`.
- BREAKING Rename `SpaceElement:delta` method to `projectionTo`.
- BREAKING Rename `SpaceElement` to `Element`.
- Read `Element` width and height from HTML dataset.
- BREAKING Use geometry structures and modules `point2`, `vector2`, `tran2`, `proj2` from `affineplane`.
- Prefer `https` prefixed URLs in documentation links.
- Improve introduction at the documentation page `docs/index.md`.
- Improve introduction at `README.md`.
- Group all geometry classes under `lib/geometry/`.
- Group all component classes under `lib/components/`.
- Group all interaction classes under `lib/interaction/`.

### Fixed

- Override possible `el` styles `bottom`, `right`.

### Removed

- Discard v1 tutorial.
- Uninstall dependencies `extend`, `seqid`.
- Uninstall dev dependencies `file-loader`, `npm-watch`, `url-loader`, `watch`, `webpack-livereload-plugin`, `webpack-tape-run`.
- Remove package script `watch` and its configuration.
- Discard example apps `hammerjs`, `multiview`.
- Discard v1 test suite.
- Sketch but discard a component `Fractal` with methods `create`, `movable`, `touchable`, `addTemplate`, `init`, `removeTemplate`.
- Remove geometry classes `dtran`, `delta2`, `delta4`, `ptran`, `pointtran4`, `tran4`, `point4`, `vector4`.
- Temporarily use library name `affinedom` but reverted back to `tapspace`.
- Temporarily use in-repo module `gendocs` to generate API documentation from source code comments but remove it later for `yamdog`.


## [2.0.0-alpha.0] – 2022-05-17

### Added

- Sketch v2 geometry modules `delta2`, `delta4`, `dtran`, `point2`, `point4`, `ptran`.
- Sketch v2 component `SpaceElement` that can be initilized with `HTMLElement` or `querySelector` string.
- Sketch `minimal` example for v2 API.

### Changed

- Update Travis badge.
- Improve Travis config.
- Bring developer docs up-to-date.
- Upgrade dependency `nudged` to v1.5.0.
- Upgrade dev dependencies `npm-watch`.
- Update license year.

### Removed

- Uninstall dev dependency `tape-run`.
- BREAKING Discard v1 component classes `AbstractNode`, `AbstractPlane`, `AbstractRectangle`, `Space`, `SpaceGroup`, `SpaceHTML`, `SpaceImage`, `SpacePixel`, `SpaceView`, `Touchable`, `Wheelable`.
- BREAKING Discard v1 geometry classes `Grid`, `IGrid`, `Path`, `IPath`, `IScalar`, `ISize`, `Transform`, `ITransform`, `Vector`, `IVector`, `Vector3`, `Size`, `ISize`, `epsilon`.
- Discard v1 API docs.


## [1.6.0] – 2020-10-30

### Added

- New example app `password` about zoomable fractal password with depth-limited recursion.
- Import a food and drink related OpenMoji emoji palette to `/docs/examples/assets/`.
- New `Size` methods `min`, `max`.
- New `AbstractPlane` method `setLocal3d`.
- New example app `tunnel` about a 3D-ish tunnel of foods.
- Ability to `Vector:rotate` about a `pivot` point.
- New `Vector` method `scale`.
- New geometry class `Vector3` with methods `add`, `subtract`, `toVector`.
- Sketch new class `Fractal`.
- New example app `semanticzoom` to exhibit distance-triggered behavior.

### Changed

- Improve tile graphics in `tiles` example.
- Use `Object.prototype.hasOwnProperty` or its `hasProp` shorthand instead of `obj.hasOwnProperty`.
- Upgrade TravisCI config.
- Stabilize dev dependency `standard` version.

### Fixed

- Correct line width in the `book` example.
- Correctly handle `SpaceView` constructed with an invalid `Space`.

### Removed

- Remove `package-lock.json` test.
- Remove `npm` api key from `.travis.yml` config.


## [1.5.2] – 2019-02-12

### Added

- New example app `book`.

### Changed

- Upgrade dev dependencies `css-loader`, `file-loader`, `genversion`, `npm-watch`, `style-loader`, `tape`, `tape-run`, `webpack`, `webpack-cli`, `webpack-livereload-plugin`.

### Removed

- Remove `package-lock.json` from version control.


## [1.5.1] – 2018-11-01

### Changed

- Improve `setSize` API docs.
- Improve `IGrid` API docs.
- Upgrade dependency `extend`.
- Upgrade dev dependencies.


## [1.5.0] – 2018-08-07

### Added

- Provide space coordinates in the `tap` event (#1).
- Implement `IVector` class function `mean`.
- Implement `Vector` class function `mean`.

### Changed

- Improve tap navigation in `infinity` example.


## [1.4.2] – 2018-08-06

### Changed

- Upgrade dev dependencies `css-loader`, `file-loader`, `semver`, `style-loader`, `tap-spec`, `tape-run`.
- Upgrade `webpack` to v4 and migrate build config.

### Removed

- Uninstall dev dependency `npm`.


## [1.4.1] – 2018-03-22

### Changed

- Move example app files under `/docs`.
- Npmignore `/docs` directory.
- Improve "Architecture" docs with links to Jazz, Scene2D and DOM (#120).


## [1.4.0] – 2018-03-22

### Added

- Support for data URLs in `SpaceImage` (#112).
- Add `ghoulog` to `canvas` example.
- Add preview images for example apps (#115).
- Sketch `videograph` example and move it to a separate branch (#113).
- Implement `IScalar` methods `multiply`, `subtract`.
- Allow `IVector:polarOffset` to take `IScalar` (#116).
- Emit `gesture*` events from `Wheelable` in addition to `wheel` event (#118).
- Implement `Size` method `toArray` (#122).

### Changed

- Update links to examples to point to `master` instead of `development` branch (#114).
- Move features and examples from `README` to `docs/index.md` (#115).
- Convert the license badge to a "License" section at the end of `README`.
- Improve `IVector:distance` docs.
- Upgrade `infinity` example to tapspace v1.4.0.

### Fixed

- Detect attempt to transform root node (#104).
- Repair `hammerjs` example (#52).


## [1.3.0] – 2018-03-04

### Added

- New example `infinity` to explore what is needed to overcome floating point limitations (#105).
- Allow parameter `targetItem` in `Touchable` to be a function (#101).
- Emit `wheel` event from a `Wheelable` item (#106).
- Set up TravisCI integration for headless testing (#67).
- New development dependency `npm` to allow Travis publish to npm repository after successful build.

### Changed

- Rename parameter `item` to `sourceItem` in `Touchable` (#101).
- Improve mobile support in `minimal` example.
- Improve example app link readability and styling in `README.md`.

### Fixed

- Correct API docs of `bringToFront` and `sendToBack` (#103).
- Define `touchstart` and `touchmove` event listeners as `passive` (#80).
- Correct code inspection version in "Thanks to" section.

### Removed

- Undocument private properties in `Touchable` (#102).


## [1.2.0] – 2018-02-25

### Added

- New section in `README` titled "Features".
- Implement method `copy` for `SpaceGroup`, `SpaceHTML`, `SpaceImage`, `SpacePixel`.
- Implement `SpaceView` methods `refreshSize`, `setSize`, `setISize` (#55).
- Add info text to examples `grid`, `pixels`, `tiles`.
- Define "Hull order" in API docs (#45).
- Link to `tapspace` at `yarn`.
- Implement new interaction class `Scrollable` (#89) and later rename it `Wheelable`.
- New mode property `preventDefault` in `Touchable`.

### Changed

- Improve "Architecture" docs in `docs/dev/index.md`.
- Improve badges in `README`.
- Refactor interaction classes `Manager` into classes `Recognizer` and `Sensor` (#97).
- Improve `tiles` example to exhibit `Wheelable`.
- Improve handling of input event propagation and default action prevention (#98).
- Improve touch event handling by filtering the pointers (#87).
- Upgrade example apps `canvas`, `gears`, `go`, `grid`, `modes`, `multiview` to v1.2.0.

### Fixed

- Write missing `SpaceGroup` API docs for `atMid`, `getHull`.

### Removed

- Remove unnecessary example app `view`.


## [0.5.0] – 2018-02-18 – Taaspace v5.0.0

### Changed

- Deprecate old `taaspace` package.
- Make `taaspace` package v5 to follow `tapspace`

### Removed

- Remove all source code, docs, and examples that were in `taaspace@5.0.0-rc`.
- Replace all dependencies in favour of single `tapspace` dependency.


## [1.1.1] – 2018-02-17

### Changed

- Improve docs and test `Touchable` parameter validation.
- Simplify `transformed` event handling. Use `setLocalTransform` all over `AbstractPlane` and `Touchable`.
- Improve `ghoulog` panel position and show line numbers.
- Improve `gears` example. Add handles.
- Upgrade `canvas` example to v1.1.0.
- Improve `go` example.
- Improve package tags.
- Make `multiview` example interactive. Demonstrate scene tree event system. (#83)
- Improve `html` example navigation (#84).
- Improve `modes` example app.
- Use `setElementTransform` instead of `_transformElementOf`.
- Test that `package-lock.json` version matches version property.

### Fixed

- Add a missing link from `README` to `gears` example.
- Support iframe handling in iOS Safari (#84).

### Removed

- Uninstall unused dependency `move-js`.


## [1.1.0] – 2018-02-14

### Added

- Emit `transformed` with payload `{ source, newTransform, oldTransform }` (#74).
- Emit `childAdded`  from `AbstractNode` when a descendant is added (#75).
- Emit `childRemoved` from `AbstractNode` when a descendant is removed (#75).
- Document the `AbstractNode` event API (#75).
- Emit `resized` from `AbstractRectangle` with payload `{ source, newSize, oldSize }` (#76).
- Optional parameter `targetItem` to `Touchable` constructor. Enables gesture effect redirection. (#72)
- New example app "Gears" to demonstrate `targetItem` parameter (#72).

### Changed

- Feature documentation separated from Tutorial. New file `docs/features/index.md`.
- Improve Features docs.
- Improve `Size` docs and type checking (#76).
- Improve package tags.

### Removed

- BREAKING Remove events `contentAdded`, `contentRemoved` in `AbstractNode` and `SpaceView` (#75).


## [1.0.2] – 2018-02-12

### Added

- New example app "Play Go!" at `/examples/go`. Exhibits a game board with grid snapping and direct manipulation of stone pieces.
- Test to ensure package.json version tag and version property value match (#66).

### Changed

- Improve mouse support with `MouseConverter` and synthetic `rat*` events (#70).

### Fixed

- Use correct build script in `release` script.
- Use correct property `item` in `Touchable/Manager` (#65).
- Correct class name in documentation of `Touchable/Manager`.
- Document that `Touchable` requires a mounted view.


## [1.0.1] – 2018-02-10

### Added

- Links from README to all main example apps.
- Link from docs to Tapspace GitHub.

### Fixed

- Correct version property.
- Use unpkg CDN bundle URL in the example apps to enable public usage.
- Note that tutorial may be out of date.


## [1.0.0] – 2018-02-10

Rebranding. Package and library name changed from Taaspace to Tapspace.

### Added

- Use unpkg to distribute built bundles.
- Add `package-lock.json`.
- New package scripts `release`, `test`.
- Write docs for release process at `/docs/dev/index.md`.

### Changed

- BREAKING Rename package, library, and repository from `taaspace` to `tapspace` for more descriptive name.
- BREAKING Rename pointer interaction events like `transformstart` to `gesturestart` (#50).
- Simplify the canvas example. Thanks to [minimalisti](https://github.com/minimalisti) (#57).
- Rename the package script `lintfix` to `lint:fix`.
- Improve docs for building example apps.
- Move docs in wiki to `/docs/dev/index.md`.

### Removed

- Remove package scripts `build:min`, `lintfix`.


## [0.5.0-rc] – 2018-02-09 – Taaspace v5.0.0-rc

### Added

- New element ordering methods for `AbstractNode`: `getFirstChild`, `getLastChild`, `getPreviousSibling`, `getNextSibling`, `bringAbove`, `bringToFront`, `sendBelow`, `sendToBack`.
- Additional property `i` in `AbstractNode` methods `addChild`, `setParent`.
- Write API docs for `Touchable`.
- Write brief docs for project architecture.
- Write a tutorial `/docs/tutorial/index.md`.
- Help mobile debugging with `ghoulog.js`.
- Help mobile debugging with a static file server at `examples/server.js`.
- New example app `tiles` that uses stone tile images.
- New example app `view` for minimal viewport setup.
- New package tags.

### Changed

- Move some example assets to be shared among example apps.
- Improve the grid example.
- Divide `Touchable` into submodules `index`, `Manager`, `Recognizer`, `utils` instead of external dependency `taach` (#47).
- BREAKING Event payloads of `added`, `contentAdded`, `removed`, `contentRemoved` events are objects instead of argument lists.

### Fixed

- Repair headless test with `style-loader`.
- Gitignore source maps under `/dist`.

### Removed

- Remove old examples `play`, `simple`.


## [0.5.0-alpha.3] – 2018-02-07 – Taaspace v5.0.0-alpha.3

### Added

- New property `taaspace.geom.EPSILON`.
- New geometry class `ISize` with methods `almostEqual`, `equal`, `getHeight`, `getWidth`, `to`, `toSpace`.
- New geometry class `Size` with methods `almostEqual`, `equal`, `getHeight`, `getWidth`, `transform`.
- Write API docs for `Size` and `ISize`.

### Changed

- Use `Size` instead of `Vector` where a size is needed.
- Use `setSize` instead of `setLocalSize`.

### Removed

- BREAKING Remove geometry class `Rectangle`.


## [0.5.0-alpha.1] – 2018-02-03 – Taaspace v5.0.0-alpha.1

### Added

- New package tags.
- New banner logo image with hands and colorful squares.
- New `AbstractPlane` methods `getGlobalITransform`, `getLocalITransform`, `setGlobalITransform`, `setLocalITransform` (#42).

### Changed

- BREAKING Make parent item optional in constructors and flip the parameter order in `SpaceHTML`, `SpaceImage`, `SpacePixel`.
- BREAKING Rename `AbstractPlane:getGlobalLocalTransform` to `getGlobalITransform`.
- BREAKING Return `Transform` instead of `ITransform` in `AbstractPlane:getLocalTransform` and `AbstractPlane:getGlobalTransform`.
- Merge `/docs/api/geom.md` to `/docs/api/index.md`.
- Improve documentation style at `/docs/index.md`.
- Improve introduction at `README.md`.

### Removed

- Remove `/docs/api/geom.md`.


## [0.4.1] – 2018-02-01 – Taaspace v4.0.1

### Added

- New `SpaceImage` method `getImage`.
- New `SpacePixel` method `getColor`.
- New `IVector` method alias `equal`.
- New `IPath` methods `first`, `get`, `last`.
- Write API docs for items and space items.
- Write API docs for `Grid`, `IGrid`.
- Write API docs for `Path`, `IPath`.
- Write API docs for `Rectangle`.
- Write API docs for `Vector`.
- Write API docs for `IScalar`.
- Write API docs for `ITransform`.

### Changed

- Improve documentation structure.
- Move maintainer docs to `/docs/dev/index.md`.
- Reorder methods alphabetically.
- Deprecate `IPath` methods `bottom`, `getBounds`, `left`, `right`, `top`.


## [0.4.0] – 2018-01-28 – Taaspace v4.0.0

### Added

- Install new dependency `taach`.
- New interaction class `Touchable` to proxy `taach`.
- Version controlled bundle for example apps: `/dist/taaspace.min.js`.
- Link from README to the example of multiple views.

### Changed

- BREAKING Rename `SpaceNode` to `AbstractNode`.
- BREAKING Rename `SpacePlane` to `AbstractPlane`.
- BREAKING Rename `SpaceRectangle` to `AbstractRectangle`.
- BREAKING Rename `SpaceViewHTML` to `SpaceView`.
- BREAKING Move all geometry classes to `/lib/geom` directory and `taaspace.geom` namespace: `Grid`, `IGrid`, `Path`, `IPath`, `IScalar`, `Transform`, `ITransform`, `Vector`, `IVector`, `Rectangle`, `IRectangle`.
- BREAKING Rename `SpaceView` methods:
  - `getElementBySpaceNode` to `getElementBySpaceItem`.
  - `getHtmlContainer` to `getContainer`.
  - `getSpaceNodeByElementId` to `getSpaceItemByElementId`.
- Move all component classes to `/lib/item` directory: `AbstractNode`, `AbstractPlane`, `AbstractRectangle`, `Group`
- Improve package description.
- Restructure tests.
- Divide API docs at `/docs/api.md`: `/docs/api/index.md`, `/docs/api/geom.md`.
- Convert `/docs/thanks.md` to `/docs/index.md`.

### Removed

- Remove old documentation `/docs/api.md`, `/docs/ideas.md`, `/docs/thanks.md`.


## [0.4.0-alpha.20] – 2018-01-16 – Taaspace v4.0.0-alpha.20

### Added

- New example `multiview` to exhibit multiple views for the same space.
- Implement `SpaceNode.addChild`.

### Changed

- Override `fitScale` for `SpaceViewHTML`.
- BREAKING Rename `InvariantScalar` to `IScalar`.
- BREAKING Rename `InvariantVector` to `IVector`.
- BREAKING Rename `InvariantPath` to `IPath`.
- BREAKING Rename `InvariantTransform` to `ITransform`.
- BREAKING Rename `InvariantGrid` to `IGrid`.


## [0.4.0-alpha.19] – 2018-01-22 – Taaspace v4.0.0-alpha.19

### Added

- New `InvariantPath` methods `atMid`, `almostEqual`, `equal`.
- Viewport representations for `Viewport` itself and `SpaceGroup`.
- New method `SpaceViewHTML:isMounted`.
- New `Space` method `atMid`.
- New `SpaceGroup` method `atMid`.
- Test for `getHull`.
- New class `SpacePlane` that replaces `SpaceTransformer` and `SpaceTransform`.

### Changed

- BREAKING Emit `contentAdded` and `contentRemoved` only from immediate parent SpaceNode.
- Use DOM hierarchy instead of internal node lists in `SpaceViewHTML`.
- Improve `SpaceNode`, `SpaceViewHTML` source code structure.
- Improve the minimal example.
- Improve the `SpaceHTML` example.
- Calling `SpaceRectangle:atNorm(x, y)` without `y` throws an error.

### Removed

- BREAKING Remove classes `SpaceTransform`, `SpaceTransformer`, `SpacePoint`.


## [0.4.0-alpha.18] – 2018-01-16 – Taaspace v4.0.0-alpha.18

### Added

- Implement `InvariantTransform` methods `almostEqual`, `almostEquals`, `equal`.
- Implement `Vector` methods `changeBasis`, `equal`, `translate`, `createFromPolar`, `almostEqual`, `changeFromBasis`, `getRotation`, `getMagnitude`, `isIndependent`.
- New `Grid` parameters `xRotation`, `yRotation`.
- New `Grid` methods `almostEqual`, `getHullOf`, `at`.
- New `Path` methods `almostEqual`, `equal`, `atMid`.
- New `InvariantGrid` methods `almostEqual`, `equal`, `getHullOf`, `getOrigin`, `at`.
- New `InvariantVector` method `almostEqual`.

### Changed

- Upgrade to `nudged` 1.4.0.
- BREAKING The method `InvariantGrid:snap` requires `pivot`.
- BREAKING The method `SpaceTransformer:snap` requires `pivot`.

### Fixed

- Fix scale bug in `Grid`.


## [0.4.0-alpha.11] – 2018-01-11 – Taaspace v4.0.0-alpha.11

### Added

- New geometry class `Rectangle` with methods `equals`, `scale`, `getDiagonal`, `toArray`, `atMid`, `atNorm`, `atMidTop`, `atMidLeft`, `atMidRight`, `atMidBottom`, `atLeftTop`, `atRightTop`, `atLeftBottom`, `atRightBottom`.
- Check that parent parameter is given in `SpaceNode:setParent`.
- New geometry class `Grid` with methods `snap`, `equals`, `toArray`, `transform`.
- New geometry class `InvariantGrid` with methods `snap`, `equals`, `to`, `toSpace`, `transform`.
- New `SpaceTransformer` method `snap`.

### Changed

- Improved `.npmignore`.
- Simplify the `simple` example.

### Fixed

- Correct API docs of `InvariantPath:toSpace`, `SpaceTransformer:transformBy`.


## [0.4.0-alpha.9] – 2018-01-10 – Taaspace v4.0.0-alpha.9

### Added

- New `SpaceRectangle` methods `fitScale`, `fitSize`.
- New property `Path:length`.
- New `Space` method `getHull`.

### Changed

- Upgrade to latest `nudged`.
- BREAKING Change point order in `Path:getBounds`.

### Removed

- BREAKING Remove method `SpaceRectangle:fit`.
- BREAKING Remove `SpaceGroup` methods `atMid`, `fit`. Use hull methods instead.


## [0.4.0-alpha.7] – 2018-01-07 – Taaspace v4.0.0-alpha.7

### Added

- New geometry classes `Path`, `InvariantPath` with methods including `add`, `bottom`, `get`, `getBounds`, `equals`, `getHull`, `last`, `left`, `right`, `toArray`, `top`, `transform`.
- Chainable transform methods for `SpaceTransformer`.
- New `SpaceGroup` methods `fit`, `getHull`.
- New `SpaceRectangle` methods `fit`, `getHull`.
- Install dependency `monotone-convex-hull-2d`.
- Allow `InvariantTransform:estimate` to take `InvariantPath` for the domain and range.


## [0.4.0-alpha.5] – 2018-01-05 – Taaspace v4.0.0-alpha.5

### Added

- New `Vector` methods `opposite`, `max`, `min`, `subtract`.
- Unit test suite for `Vector`.
- New `SpaceGroup` method `atMid`.

### Changed

- Improve README introduction.
- Improve `pixels` example.
- Update `SpaceViewHTML:getElementBySpaceNode` to return the container element when called with the view itself.

### Fixed

- Repair `InvariantTransform:inverse`.

### Removed

- Remove `taaspace.css` and use scripted styles instead.


## [0.4.0-alpha.2] – 2017-12-30 – Taaspace v4.0.0-alpha.2

### Added

- Add `.npmignore` file.
- Install dependency `extend`.
- Install development dependencies `standard`, `tape`, `tape-run`, `tap-spec`, `webpack`, `webpack-tape-run`, `genversion`, `async`, `css-loader`, `file-loader`, `style-loader`, `url-loader`, `webpack-livereload-plugin`, `npm-watch`.
- Set up webpack configs for package build and test suite build.
- Set up headless test suite and a runner.
- Use live reload in in-browser tests.
- Test window resize behavior.
- New test script `test:watch`.
- New build scripts `build:watch`, `watch`, `gv`.
- New lint script `lintfix`.
- New parameter in `SpacePixel` constructor: `color`.
- New methods `SpaceViewHTML:mount`, `SpacePoint:toPointOn`.
- New `SpaceNode` methods `isRoot`, `getAncestors`.
- New `SpacePlane` method `getGlobalLocalTransform`.
- New `SpaceRectangle` methods `setSize`, `setLocalSize`.
- New geometry classes `InvariantTransform`, `InvariantVector`, `Vector`, `InvariantScalar`.
- New class `SpaceGroup`.
- Tests for `SpaceHTML`, `SpaceViewHTML`.
- New example apps `minimal`, `pixels`.

### Changed

- Change repository title heading from `tapspace.js` to `tapspace`.
- Move developer notes to Wiki (#32).
- Improve introduction chapter.
- Improve logo image resolution.
- Build to `/dist` directory which is gitignored.
- Rename `/tests` to `/test`.
- Rename `/src` to `/lib`.
- Migrate code style from `jshint` to `standard`.
- Migrate from `python` to `python3` to run the local static example server.
- Migrate test suites from `mocha` to `tape`.
- Migrate builds from `browserify` to `webpack`.
- Write test suites for `HTMLSpaceView`, `Space`, `SpaceHTML`, `SpaceNode`, `SpacePlane`, `SpacePoint`, `SpaceRectangle`, `SpaceTransform`, `SpaceTransformer`.
- Rename `HTMLSpaceView` to `SpaceViewHTML`.
- Move package main script from `src/index.js` to `index.js`.
- Configure `genversion` to handle and update the module version property.
- Improve use of prototypal inheritance.
- Split `SpaceViewHTML` to submodules.
- Rename `SpaceRectangle:resize` to `setLocalSize`.

### Removed

- Remove unnecessary directories from release packages by npmignoring `/doc`, `/examples`, `/tests`, and development-related config files.
- Remove built bundles from version control.
- Remove TravisCI integration.
- Remove unused dev dependencies `browserify`, `chai`, `chai-jquery`, `chai-shallow-deep-almost-equal`, `jshint`, `minifyify`, `mocha`, `mocha-phantomjs-core`, `phantomjs-prebuilt`.
- Remove package scripts `build:dev`, `build:debug`, `build:test-deps`, `build:semver`, `build:examples-play`, `build:examples-canvas`, `test:examples-canvas`, `test:examples-play`.
- Remove deprecated classes `SpaceTransform`, `SpacePoint`, `Taa`, `SpaceTaa`.


## [0.3.2] – 2016-04-26 – Taaspace v3.0.2

### Changed

- Switch from `mocha-phantomjs` to `mocha-phantomjs-core`.


## [0.3.1] – 2016-04-26 – Taaspace v3.0.1

### Added

- Install instructions to `README.md`.

### Changed

- Improve package description.

### Fixed

- Correct package main script (#31).


## [0.3.0] – 2016-04-26 – Taaspace v3.0.0

### Added

- Dedicated module for the version tag at `src/version.js`.
- Temporarily install dependency `kld-affine`,
- Install dependencies `seqid`, `move-js`, `nudged`, `loadimages`, `component-emitter` (#30).
- New `SpacePoint` methods `projectTo`, `normalize`, `normalizeXY`.
- New class `Taaspace.Taa` with method `remove`.
- New class `SpaceTaa`.
- New class `SpaceTransformer` with methods `transformTo`, `transformBy`, `getSpacePoint`, `translate`, `translateTo`, `rotate`, `translateScaleRotate`, `setLocalTransform`, `setGlobalTransform`, `getLocalTransform`, `getGlobalTransform`.
- New class `SpacePlane` with method `at`.
- New methods `Space:has`.
- New class `SpacePixel`.
- New class `SpaceRectangle`.
- New class `SpaceTransform` with methods `scale`, `rotate`, `translateScale`, `translateRotate`, `scaleRotate`, `translateScaleRotate`, `estimate`, `switchTo` (#13, #19, #21, #22, #24).
- New class `SpaceNode` with methods `getChildren`, `hasDescendants`, `getParent`, `getRootParent`, `hasChild`, `hasDescendant`, `remove`, `setParent` (#7, #23).
- Temporary proxy classes from `kld-affine`: `Taaspace.Vector2D`, `Taaspace.Matrix2D`.
- Install dev dependencies `jshint`, `mocha`, `browserify`, `mocha-phantomjs`, `phantomjs`, `chai`, `chai-jquery`, `jquery`, `minifyify`, `semver`.
- New build script `build:dev`.
- Set up a phantom.js test suite.
- Test for `Matrix2D` transformations.
- Tests for `SpaceTaa`, `Taa`, `SpacePlane`, `SpaceTransformer`, `SpaceTransform`, `SpaceNode`.
- Show IP address while serving examples locally.
- New example app "Play" (#24).
- Set up TravisCI continuous integration tool and add a build status badge.
- Test that package version tag is correct semantic version.
- New example app for Hammer.js integration.
- New example app for Canvas.

### Changed

- Automatically update the version tag in README.
- Improve structure in `.gitignore`.
- BREAKING Rename `Point` to `SpacePoint`.
- BREAKING Rename `Viewport` to `HTMLSpaceView`.
- Rename `test` dir to `tests`.
- Simplify the basic example app.
- Change `SpacePoint:offset` to take separate `dx` and `dy` instead of a vector.
- BREAKING Rename `SpacePoint:projectTo` to `SpacePoint:transformBy`.
- Make reference plane the first parameter (#17).
- Ensure that `Space` is the root (#18).
- BREAKING Make view transformable instead of space.

### Fixed

- Logo image URL.
- MIT license to match SPDX style.

### Removed

- BREAKING Remove third-party dependencies from version control.
- Remove large image assets.
- BREAKING Remove classes `Box`, `Custom`, `Graph`, `Grid`, `Group`, `Image`, `KeyboardManager`, `Network`, `Text`.
- BREAKING Remove namespace `util`.
- Remove examples `chain.html`, `changeContent.html`, `grid.html`, `jquery.html`, `movable.html`, `network.html`, `scale.html`.
- Remove test apps `taaspace.box.html`, `taaspace.graph.html`, `taaspace.point.html`, `taaspace.util.html`.


## [0.2.10.1] – 2014-02-25 – Taaspace v2.10.1

### Added

- New class `Taaspace.Point` with methods `offset`, `copy`, `equals`, `moveTo`, `moveBy`.
- Default grunt task `availabletasks` that lists available tasks.
- Install dev dependency `grunt-available-tasks`.

### Fixed

- Grunt version replace task to support multi-digit version parts.


## [0.2.10.0] – 2014-02-24 – Taaspace v2.10.0

### Added

- Link to `Grid` example app.
- Set up `QUnit` test suite.
- New class `Taaspace.Box` with methods `center`, `northWest`, `northEast`, `southWest`, `southEast`, `width`, `height`, `area`, `moveTo`, `moveBy`.
- New methods `Image:sourceImage` and `Text:text`.
- New example app to exhibit `Box`.
- New example app to exhibit dynamic `Text` content.
- Logo image in docs.

### Changed

- Improve docs for `Grid`.
- Improve synopsis and todos in `README.md`.
- Make `height` parameter optional in `SpaceElement:size`.

### Fixed

- Ignore `.DS_Store` files.


## [0.2.9] – 2014-01-13 – Taaspace v2.9.0

### Added

- New component `Taaspace.Grid` with the methods `center`, `northWest`, `northEast`, `southWest`, `southEast`, `box`, `size`, `width`, `height`, `moveTo`, `moveBy`.
- New example app to exhibit `Grid`.

### Changed

- Improve argument validation in `Network`.
- Clean up code in `Network`.

### Fixed

- Repair parameter handling in `SpaceElement:size`.


## [0.2.8] – 2013-12-21 – Taaspace v2.8.0

### Added

- New example to exhibit SpaceElement movability.
- Implement `SpaceElement:movable`.

### Changed

- Deprecate `SpaceElement:draggable`.


## [0.2.7] – 2013-12-21 – Taaspace v2.7.0

### Added

- New geometry methods `util.boxArea`, `util.intersectionArea`.
- Implement `Viewport:visibilityRatioOf`.
- Implement `SpaceElement:emit`.

### Changed

- Improve image sizing and styling in the network example app.


## [0.2.6.4] – 2013-12-21 – Taaspace v2.6.4

### Added

- Check double removal attempt in `SpaceElement`.

### Fixed

- Bugs in the network example app.


## [0.2.6.3] – 2013-12-18 – Taaspace v2.6.3

### Added

- Square images to be used in example apps.
- A `callback` parameter to `Network:spreadFrom`.

### Changed

- Improve `Network` example.


## [0.2.6.2] – 2013-12-18 – Taaspace v2.6.2

### Fixed

- Another depth limit bug in `Network`.


## [0.2.6.1] – 2013-12-18 – Taaspace v2.6.1

### Changed

- Improve error handling in `graph` and `Network`.

### Fixed

- Depth limit handling in `Network`.


## [0.2.6.0] – 2013-12-18 – Taaspace v2.6.0

### Added

- New example to exhibit `Network`.
- New methods of `Network`: `createNetwork`, `spreadFrom`, `remove`, `_each`, `_asyncEach`.

### Changed

- Combine `Taaspace.Network` constructor parameters `root` and `options` to `kwargs`.

### Fixed

- Repair the example app for `mapReduce`.


## [0.2.5] – 2013-12-17 – Taaspace v2.5.0

### Added

- Implement async helper function `Taaspace.util.mapReduce`.
- Implement async graph traversal function `Taaspace.graph.bfs`.
- New example to test and exhibit `Taaspace.graph.bfs` and `Taaspace.util.mapReduce`.


## [0.2.4] – 2013-12-17 – Taaspace v2.4.0

### Added

- Implement `SpaceElement` positioning methods `northwest`, `northeast`, `southwest`, `southeast`.
- Implement `Space` positioning methods `width`, `height`, `center`, `northwest`, `northeast`, `southwest`, `southeast`.
- Implement `Viewport` positioning methods `northwest`, `northeast`, `southwest`, `southeast`.
- New example to exhibit positioning methods.


## [0.2.3] – 2013-12-08 – Taaspace v2.3.0

### Added

- Implement `SpaceElement:moveTo`.


## [0.2.2] – 2013-12-07 – Taaspace v2.2.0

### Added

- Link the new examples in `README.md`.
- Support for animation properties in `SpaceElement:scale`, `Viewport:scalable`.


## [0.2.1] – 2013-12-05 – Taaspace v2.1.0

### Added

- New Grunt task `build-basic` to build a bundle without third-party dependencies.
- New methods that proxy some jQuery methods: `data`, `removeData`, `attr`, `css`, `prop`, `removeAttr`, `removeProp`, `addClass`, `hasClass`, `removeClass`, `hide`, `show`, `toggle`, `fadeIn`, `fadeOut`, `fadeTo`, `fadeToggle`, `finish`, `queue`, `stop`.
- New example to display some jQuery methods like `css`, `data`, `show`: `jquery.html`.
- New example to exhibit scaling: `scale.html`.

### Changed

- Grunt `build` task builds the standalone bundle.
- Bind Hammer gestures to `Text` at construction.


## [0.2.0] – 2013-12-01 – Taaspace v2.0.0

### Added

- Implement `SpaceElement:pivot`, `SpaceElement:scale`.
- Implement `Space:getViewport`.
- Implement `View:select`, `View:deselect`.

### Changed

- Bring example apps up to date.
- Rename `Space:boundingBox` to `box`.

### Removed

- BREAKING Remove `Space:select`, `Space:deselect`.


## [0.1.0] – 2013-12-01 – Taaspace v1.0.0

### Added

- Implement `View:box`, `View:area`, `View:translatePointToSpace`, `View:translatePointFromSpace`.

### Changed

- Rename `Taaspace.Element` to `SpaceElement`.
- Rename `Space:box` to `boundingBox`.
- Rename `Space:pivot` to `origo`.
- Rename `View:toSpaceDistance` to `translateDistanceToSpace`.
- Rename `View:fromSpaceDistance` to `translateDistanceFromSpace`.
- Bind `Hammer` gestures to `Image` upon append.
- Instead of `Viewport`, construct `Space` with a `HTMLElement`.

### Removed

- BREAKING Removed support for multiple viewports.


## [0.0.5] – 2013-11-30 – Taaspace v0.0.5

### Added

- example app "Animation Chain" to exhibit animation `end` callback.
- link from README to contributor examples repository.
- link from README to the Animation Chain app.
- element class names `taaspace-element`, `taaspace-text`, `taaspace-image`.

### Changed

- improve feature docs.


## [0.0.4] – 2013-11-28 – Taaspace v0.0.4

### Added

- a version property `Taaspace.version`.
- a grunt-replace task to set version in the source code.
- optional property `end` to bind a callback function to animation end event.


## [0.0.3] – 2013-11-28 – Taaspace v0.0.3

### Added

- Link to the basic example app.
- New methods `Space:box` and `Viewport:focusTo`.
- Scaling of text via dynamic font size.
- explicit exceptions from unimplemented functions.
- "Thanks to" section in README.
- placeholders for methods `visibilityRatio`, `distanceRatio`, `focusRatio`.
- support for animation in `moveBy` and `Viewport:movable`.
- new method `movable`. Replaces `draggable`.
- ability to patch Taaspace API.
- `id` to Viewport and `_identify` method.
- a standalone build bundle.

### Changed

- allow HTML in `Text` component.
- display the use of `focusTo` in the basic example app.
- use `p` instead of `div` in `Text` component to follow the HTML standard.
- use `pivot` instead of `origo`
- simplify source file structure.
- rename `index.js` to `space.js` for consistent class-based naming.
- use `px` units instead of `em` to solve compatibility issues.
- simplify the basic example app.

### Fixed

- arrow key navigation to respect scale level.


## [0.0.2] – 2013-11-15 – Taaspace v0.0.2

### Added

- Support for multiple viewports.
- An example app for multiple viewports.
- `options` parameter to `Space:createViewport`.

### Changed

- Rename the panning example as `basic`.

### Removed

- Unnecessary style rules from the panning example.


## [0.0.1] – 2013-11-15 – Taaspace v0.0.1

### Added

- Example app about viewport and element panning.
- New class `Taaspace` and method `create`.
- New class `Taaspace.Element` and methods `moveBy`, `size`.
- New class `Taaspace.Group`.
- New class `Taaspace.Image`.
- New class `Taaspace.Viewport` and methods `fromSpace`, `origo`, `moveBy`, `on`, `off`, `scalable`, `draggable`, `toSpaceDistance`.
- New class `Space` and methods `createViewport`, `select`.
- New class `Taaspace.Network`.
- New class `Taaspace.Text` and methods `_domAppend`, `_domMove`.
- New class `Taaspace.KeyboardManager` and methods `select`, `isSelected`, `deselect`, `on`, `off`, `clean`.
- Initial documentation `README.md` with sections `Features`, `TODO`, `Dependencies`, `License`.
- Third-party libraries `hammer`, `jquery`, `move-js`, `underscore`, `modernizr`, `jquery.mousewheel.js`, `jwerty`.
- Initial `.gitignore` and `LICENSE`.
- Initial `package.json`.
- Initial `Gruntfile.js`.
- New development dependencies `grunt`, `grunt-contrib-concat`, `grunt-contrib-uglify`, `grunt-contrib-jshint`.
