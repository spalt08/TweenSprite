# TweenSprite 
Simple sprite animation plugin for TweenMax.js

[Demo here](http://dev.codephobos.com/tweensprite/example/)

More info at http://greensock.com/docs/#/HTML5/GSAP/TweenMax/
## Sequences
Basic sequence
```js
// perform the sequence list
var sequenceList = ["./path/sequence1.png", "./path/sequence2.png", "./path/sequence3.png"];
var domElement = document.getElementById("img_id");
var sequenceTime = 1.5;

// perform the animation
TweenMax.sequence( domElement, sequenceList, sequenceTime, {delay: 1.0} );
// the last one is a Tweenmax parameters for the animation
// example: { delay: 1.0, repeat: -1, onStart: function, etc.. }
```

With TimelineMax
```js
// make a timeline
var tl = new TimelineMax();
tl.to(domElement, 1.0, { left: "-=100px" }); // some timeline stuff
tl.add( TweenMax.sequence( domElement, sequenceList, sequenceTime) ); // adding sequence
```

## Sprite Sheets
First, you need to set the sprite sheet as a background of html element
```html
<div style="width: 210px; height: 160px; background-image: url(./images/drummer.png);"></div>
```
There is two ways to use atlases. First one is array with sprites positions and sizes
```js
TweenMax.spriteSheet( domElement, { original: ["85px", "119px"], data: [
	/* x, y, width, height */
	["0px", "0px", "85px", "119px"]
	/* etc. */
]}, sequenceTime, { delay: 0.1, repeat: -1 });
```
**Original** is optional parameter. Width of the first sprite or element. Used to center all sprites.

You can also configure you animation using following parameters
```js
TweenMax.spriteSheet( domElement, { 
	width: 818, 
	offsetX: 0,
	offsetY: 2,
	stepX: 201, 
	stepY: 154, 
	count: 12
}, sequenceTime, { delay: 0.1, repeat: -1 });
```
Parameter | Decsription
--------- | -----------
**width** | Width of the original sprite sheet image (not needed if step units is percents)
**offsetX** | Offset of each step from the left (pixels or percents)
**offsetY** | Offset of each step from the top (pixels or percents)
**stepX** | Width of each sprite in the sprite sheet (pixels or percents)
**stepY** | Height of each sprite in the sprite sheet (pixels or percents)
**count** | Number of sprites in the atlas
