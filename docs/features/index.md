
# Features

## Scene graph

## Multiple views

## Direct manipulation

The `tapspace.Touchable` enables [direct manipulation](https://www.nngroup.com/articles/direct-manipulation/) in Tapspace apps. It recognizes mouse and touch gestures on Tapspace elements and makes the elements react in a natural, paper-like way.

Touchable's simplistic interaction design is based on usability research and ensures good design principles:
- **No double tap** or triple+ tap gestures. They are hard for users to discover. Instead, updated the interface after each single tap in a way that tells user that another tap is needed.
- **No hold.** It is hard for users to discover. Use single tap or multiple subsequent single taps with progressive visual feedback instead. [1]
- **No info about number of fingers.** Fingers easily touch the screen by accident and cause unexpected behavior if UI behavior depends on number of fingers. [1]
- **Respect each finger equally.** If only two fingers are respected in transformations such as scaling then movement of additional fingers do not affect at all which is not the way how objects behave in the physical world familiar to users. [2]

Additional design decisions:
- **No hover** even for mouse. We treat mouse as a single finger. Simpler for developers, less bugs for users to discover.

[1] [Microsoft touch design guidelines](https://msdn.microsoft.com/en-us/windows/uwp/input-and-devices/guidelines-for-user-interaction)<br />
[2] Palen, 2016, [Advanced algorithms for manipulating 2D objects on touch screens](http://dspace.cc.tut.fi/dpub/handle/123456789/24173).

## Multi-user touch interface

# Advanced features

## Synchronous recursion detection

See issue [#74](https://github.com/taataa/tapspace/issues/74)
