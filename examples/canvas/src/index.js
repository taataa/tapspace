var transformable = require('./transformable')
var animate = require('./animate')

var space = new taaspace.Space()
var viewElement = document.getElementById('space')
var view = new taaspace.HTMLSpaceView(space, viewElement)

var a = new taaspace.SpaceHTML(space, '<canvas width="300" height="300">Solar system</canvas>')
a.resize([300, 300])
a.translate(a.atMid(), view.atMid())
animate.animateCanvas(view.getElementBySpaceNode(a).firstChild)

transformable.makeViewTransformable(view)
