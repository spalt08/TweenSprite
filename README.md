# TweenSprite 
Simple sprite animation plugin for TweenMax.js

More info at http://greensock.com/docs/#/HTML5/GSAP/TweenMax/

## Usage
Basics
```js
// perform the sequence list
var sequenceList = ["./path/sequence1.png", "./path/sequence2.png", "./path/sequence3.png"];
var domElement = document.getElementById("img_id");
var sequenceTime = 1.5;

// perform the animation
sequence( domElement, sequenceList, sequenceTime, {delay: 1.0} );
// the last one is a Tweenmax parameters for the animation
// example: { delay: 1.0, repeat: -1, onStart: function, etc.. }
```

With TimelineMax
```js
// make a timeline
var tl = new TimelineMax();
tl.to(domElement, 1.0, { left: "-=100px" }); // some timeline stuff
tl.add( sequence( domElement, sequenceList, sequenceTime) ); // adding sequence
```
