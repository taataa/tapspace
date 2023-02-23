# Tapspace Glossary

Here we list some common terminology used in Tapspace.js v2.x documentation and codebase.

## basis

A basis defines the coordinate space of coordinates. A known basis allows us to represent the geometry in other bases.

## coordinate transition

The act of converting coordinates from a basis to another without losing information. In the simplest case, it can be thought as representing a point with respect to an alternative origin. Do not mix with CSS transitions.

## CSS transition

An animation property that can be applied to HTML elements via CSS rules.

## normalized coordinates

Geometric objects, that have a size, span a normalized coordinate space. The normalized coordinates are defined as ratios relative to the geometry size. For example, the point (100, 50) on a rectangle of the size (200, 100) can be represented by the normalized coordinates (0.5, 0.5).

Alternative names: ratio coordinates, unit coordinates, relative coordinates, norm coordinates
