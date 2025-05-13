# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-alpha.24] – 2025-01-17


## [2.0.0-alpha.23] – 2023-12-22


## [2.0.0-alpha.22] – 2023-12-14


## [2.0.0-alpha.21] – 2023-11-27


## [2.0.0-alpha.20] – 2023-10-16


## [2.0.0-alpha.19] – 2023-10-16


## [2.0.0-alpha.18] – 2023-10-16


## [2.0.0-alpha.17] – 2023-08-10


## [2.0.0-alpha.16] – 2023-07-05


## [2.0.0-alpha.15] – 2023-06-29


## [2.0.0-alpha.14] – 2023-06-28


## [2.0.0-alpha.13] – 2023-06-27


## [2.0.0-alpha.12] – 2023-06-21


## [2.0.0-alpha.11] – 2023-06-13


## [2.0.0-alpha.10] – 2023-06-07


## [2.0.0-alpha.9] – 2023-05-26


## [2.0.0-alpha.8] – 2023-05-05


## [2.0.0-alpha.7] – 2023-05-02


## [2.0.0-alpha.6] – 2023-04-27


## [2.0.0-alpha.5] – 2023-04-12


## [2.0.0-alpha.4] – 2023-02-10


## [2.0.0-alpha.3] – 2023-01-16


## [2.0.0-alpha.2] – 2022-12-05


## [2.0.0-alpha.1] – 2022-09-19


## [1.6.0] – 2020-10-30


## [1.5.2] – 2019-02-12


## [1.5.1] – 2018-11-01


## [1.5.0] – 2018-08-07


## [1.4.2] – 2018-08-06


## [1.4.1] – 2018-03-22


## [1.4.0] – 2018-03-22


## [1.3.0] – 2018-03-04


## [1.2.0] – 2018-02-25


## [1.1.1] – 2018-02-17


## [1.1.0] – 2018-02-14


## [1.0.2] – 2018-02-12


## [1.0.1] – 2018-02-10


## [1.0.0] – 2018-02-10

Rebranding. Package and library name changed from Taaspace to Tapspace.


## [0.5.0] – 2018-02-09 – Taaspace v5.0.0


## [0.4.1] – 2018-02-01 – Taaspace v4.0.1


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
