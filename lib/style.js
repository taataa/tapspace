// This script inserts a CSS stylesheet to document head.
// The stylesheet contains required classes to make Tapspace.js
// components work like they should.
//
// TODO Instead of inserting a new style-element to document head,
// consider using CSSStyleSheet object and document.adoptedStyleSheets
// to insert the styles. The feature has been baseline since 2023.
// See issue #184 for details.
//
// General architectural guidelines for Tapspace.js classes:
// - Avoid giving CSS classes for abstract component classes.
//   Why? This is to avoid deep, interlocking dependencies between classes
//   which can make changes fragile and debugging difficult.
//   Embrace modularity. This is against DRY but for a reason.
// - Document the reason of each CSS rule. It is critical to know
//   the full purpose of each rule to maintain cross-browser compatibility
//   and the delicate interplay of the rules upon
//   codebase refactoring and further development.
//

const style = document.createElement('style')
style.type = 'text/css'

style.innerHTML = [
  // Styles for Viewport
  '.affine-viewport {',
  // Space elements are absolutely positioned and therefore
  // the view must be either absolutely or relatively positioned.
  'position: relative;',
  // Viewport is a camera that looks to the space, thus crop.
  'overflow: hidden;',
  // Mobile browsers have touch actions that cancel our gestures.
  'touch-action: none;',
  // Camera distance from the image plane in viewport pixels.
  'perspective: none;',
  // Host app must give viewport height for it to be visible.
  // However, that requirement could be annoying to learn if
  // the viewport is not visible at all (default zero height).
  // Therefore set a minimum height to avoid the annoyance.
  'min-height: 200px;',
  // Ensure viewport contents do not take part to external 3D space.
  'transform-style: flat;',
  '}',

  // Styles for Hyperspace
  '.affine-hyperspace {',
  // The space contains the layers and is a child of viewport.
  // It must fill the viewport behind controls.
  'width: 100%;',
  'height: 100%;',
  // Ensure default transform origin.
  'transform-origin: 0 0;',
  // Fast flat by default.
  'transform-style: flat;',
  '}',

  // Styles for Space
  '.affine-layer, .affine-composite, .affine-space {',
  // Space elements are absolutely positioned.
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  // Spaces themselves have zero size to allow pointer events reach
  // elements below. To make elements on the space visible,
  // they must be visible over the space borders.
  'width: 0;',
  'height: 0;',
  'overflow: visible;',
  // Ensure default transform origin.
  // Spaces with custom anchor may overwrite the origin.
  'transform-origin: 0 0;',
  // Flat by default.
  'transform-style: flat;',
  '}',

  // Styles for FrameComponent
  '.affine-frame {',
  'display: block;',
  // Ensure zero margin for correct positioning.
  'margin: 0;',
  // Ensure that user-defined padding does not affect size.
  'box-sizing: border-box;',
  // Space elements are positioned by using transform matrices.
  // To make this work, the elements must be positioned absolutely
  // at the top-left corner of the parent.
  // Only absolutely positioned elements can be transformed.
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  'bottom: auto;',
  'right: auto;',
  // Ensure default transform origin.
  // Frames with custom anchor may overwrite the origin.
  'transform-origin: 0 0;',
  // Init transform. Maybe unnecessary.
  'transform: matrix(1, 0, 0, 1, 0, 0);',
  // Show only the front face. This helps Gecko-based browsers
  // to render 3D elements.
  'backface-visibility: hidden;',
  '}',

  // Styles for Item
  '.affine-item {',
  // Items are always flat.
  'transform-style: flat;',
  '}',

  // Styles for ViewportControls
  '.affine-controls {',
  // ViewportControls must be visible on top of layers but their
  // container must not have size so that the container area does
  // not steal input events from space.
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  'width: 0;',
  'height: 0;',
  'overflow: visible;',
  // Ensure default transform origin.
  'transform-origin: 0 0;',
  // Controls are 2D only.
  'transform-style: flat;',
  // Ensure orthogonal projection.
  'perspective: none;',
  '}',

  // Styles for ViewportControl
  '.affine-frame.affine-control {',
  // Controls are 2D only.
  'transform-style: flat;',
  '}',

  // Styles for Edge
  '.affine-edge {',
  // Include borders to the size.
  'box-sizing: border-box;',
  '}',

  // Styles for Arc
  '.affine-arc {',
  'overflow: hidden;',
  '}',

  // Styles for nested input proxy elements.
  '.affine-proxy-pointer {',
  // Contents of a proxy act as passive part of the proxy element.
  // The proxy itself acts as an interactive part of its ancestors.
  'touch-action: none;',
  'user-select: none;',
  '}',
  '.affine-proxy-wheel {',
  // Contents of a proxy act as passive part of the proxy element.
  // The proxy itself acts as an interactive part of its ancestors.
  // Possible rules in future: scroll-behavior, scrollbar-gutter.
  '}'
].join('\n')

// Insert to document.
document.head.appendChild(style)
