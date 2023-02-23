# Tapspace Glossary

Here we list some common terminology used in Tapspace.js v2.x documentation and codebase.

## active transformation

An active geometric transformation changes the geometry but does not change its basis. For example, moving a box one meter left is an active transformation and viewing the box from other angle is a passive transformation.

## basis

A basis defines the coordinate space of coordinates. A known basis allows us to represent the geometry in other bases.

Alternative names: coordinate system, coordinate space, frame of reference, reference frame

## coordinate transition

The act of converting coordinates from a basis to another without losing information. In the simplest case, it can be thought as representing a point with respect to an alternative origin. Do not mix with CSS transitions.

A coordinate transition is a passive transformation.

## CSS transition

An animation property that can be applied to HTML elements via CSS rules.

## document

The HTML document, the web page as a whole.

## DOM

Document Object Model. A tree-like structure that exposes the HTML document for JavaScript.

## normalized coordinates

Geometric objects, that have a size, span a normalized coordinate space. The normalized coordinates are defined as ratios relative to the geometry size. For example, the point (100, 50) on a rectangle of the size (200, 100) can be represented by the normalized coordinates (0.5, 0.5).

Alternative names: ratio coordinates, unit coordinates, relative coordinates, norm coordinates

## passive transformation

A passive transformation is a transformation that does not change the geometry but instead changes its basis. In contrast, an active transformation changes the geometry but not the basis.
