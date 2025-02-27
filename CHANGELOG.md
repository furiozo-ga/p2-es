# `p2-es` Changelog

## 1.1.6

### Patch Changes

-   copy by reference instead of reconstructing tuples in TupleDictionary (@issy123)

## 1.1.5

### Patch Changes

-   c2793e4: Fix undefined Broadphase class static variables
-   9e2221f: Change typing for static class variables to be consistent
-   5ae8abf: Fix incorrect shape type for Box shape

## 1.1.4

### Patch Changes

-   69ebd1e: Remove readonly jsdoc annotations, remove readonly from Shape id

## 1.1.3

### Patch Changes

-   cfa6eea: Remove readonly from Material and ContactMaterial ids

## 1.1.2

### Patch Changes

-   ae61ad3: Add missing contactEquation to impact event

## 1.1.1

### Patch Changes

-   b0c1dcb: Add default generic type to EventEmitter

## 1.1.0

### Minor Changes

-   9a6207c: Add hasActiveBodies to World

### Patch Changes

-   ed401dc: Remove version export

## 1.0.2

### Patch Changes

-   b013bdc: Small refactor of World constructor
-   507efad: Add missing explicit return types
-   ead1402: Fix undefined World sleep type statics
-   f5f257c: Export Vec2 type

## 1.0.1

-   Update version export

## 1.0.0

-   Use typescript, include generated type definitions (@isaac-mason)
-   Export as esm and cjs flatbundle (@isaac-mason)
-   Fix bug setting frictionIterations in GSSolver, and where bodies with constraint could be removed from world. (@JSideris) (https://github.com/schteppe/p2.js/pull/360)
-   Add `upperLimit` and `lowerLimit` to DistanceConstraint options (@DominicRoyStang) (https://github.com/schteppe/p2.js/pull/341)
-   Fix World.step reverting to fixed time step with `timeSinceLastCalled` equal to `0` (@Grimeh) (https://github.com/schteppe/p2.js/pull/337)
-   Fix EventEmitter bug causing listeners to receive incorrect events (@Fxlr8) (https://github.com/schteppe/p2.js/pull/336)
-   Fix typo in AABB docs (@yzpeninsula) (https://github.com/schteppe/p2.js/pull/331)
-   Fix incorrect fraction in `Line.raycast` (@palra) (https://github.com/schteppe/p2.js/pull/342)

## 0.7.3

-   Update type definitions (@joergjaeckel)
-   Add MaterialOptions type (@joergjaeckel)
