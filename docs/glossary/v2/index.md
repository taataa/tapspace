# Tapspace Glossary

Here we list some common terminology used in Tapspace.js v2.x documentation and codebase.

## active transformation

An active geometric transformation changes the geometry but does not change its basis. For example, moving a box one meter left is an active transformation and viewing the box from other angle is a passive transformation.

## affine element

An enhanced HTML element in space, a Tapspace.js component.

## basis

A basis defines the coordinate space of coordinates. A known basis allows us to represent the geometry in other bases. Each affine element provides a basis.

Alternative names: coordinate system, coordinate space, frame of reference, reference frame

## coordinate transition

The act of converting coordinates from a basis to another without losing information. In the simplest case, it can be thought as representing a point with respect to an alternative origin. Do not mix with CSS transitions.

A coordinate transition is a passive transformation.

Alternative names: basis transition, change of basis, passive transformation

## CSS transition

An animation property that can be applied to HTML elements via CSS rules.
Do not confuse with basis transitions.

## dilation

A transformation that changes the scale of an object.

## document

The HTML document, the web page as a whole.

## DOM

Document Object Model. A tree-like structure that exposes the HTML document for JavaScript.

## element basis

The basis i.e. the coordinate system spanned by a HTMLElement.

See also: basis

Alternative names: reference element

## normalized coordinates

Geometric objects, that have a size, span a normalized coordinate space. The normalized coordinates are defined as ratios relative to the geometry size. For example, the point (100, 50) on a rectangle of the size (200, 100) can be represented by the normalized coordinates (0.5, 0.5).

Alternative names: ratio coordinates, unit coordinates, relative coordinates, norm coordinates

## orientation

When an object is rotated, its orientation changes.
While orientation is a state of an object, rotation is the act of changing that state.

## passive transformation

A passive transformation is a transformation that does not change the geometry but instead changes its basis. In contrast, an active transformation changes the geometry but not the basis.

## right hand rule

A rule that is used to determine rotation directions and order and positive direction of the three axis.
For example, if you have an axis vector, imagine grabbing the vector with your right hand thumb up so that the thumb and the vector point to the same direction. The direction your other fingers curl around the vector reveal the positive rotation direction.

## transformation

An operation that moves object in space. For example dilation or rotation.

See also: dilation, translation, active transformation, passive transformation

## translation

A transformation that moves an object without altering its scale or orientation.

Alternative names: pan
