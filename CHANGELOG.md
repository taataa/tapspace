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


## [0.3.2] – 2016-04-26 – Taaspace v3.0.2


## [0.3.1] – 2016-04-26 – Taaspace v3.0.1


## [0.3.0] – 2016-04-26 – Taaspace v3.0.0


## [0.2.10.1] – 2014-02-25 – Taaspace v2.10.1


## [0.2.10.0] – 2014-02-24 – Taaspace v2.10.0


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
