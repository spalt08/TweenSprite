/*
 * Simple sprite animation plugin for TweenMax.js
 * Version: 0.2.0
 *
 * Konstantin Darutkin
 * 03 March 2015
 *
 */

var _TweenSpriteCounters = [];

TweenMax.sequence = function( domElement, sequenceList, time, params ) {
    if(!params) params = {};

    var counterID = _TweenSpriteCounters.length;
    _TweenSpriteCounters.push({ counter: 0 });

    params.counter = sequenceList.length;
    params.onUpdateParams = [counterID, sequenceList, domElement];
    params.ease = SteppedEase.config( sequenceList.length + 1 );
    params.onUpdate = function(counterID, sequenceList, domElement) {
        if ( _TweenSpriteCounters[counterID].counter < sequenceList.length)
            if( sequenceList[ Math.ceil( _TweenSpriteCounters[counterID].counter ) ] )
                domElement.src = sequenceList[ Math.ceil( _TweenSpriteCounters[counterID].counter ) ];
    }

    return TweenMax.to( _TweenSpriteCounters[counterID] , time, params );
}
TweenMax.spriteSheet = function( domElement, spritesheet, time, params ){
    if(!params) params = {};

    var counterID = _TweenSpriteCounters.length;
    _TweenSpriteCounters.push({ counter: 0 });

    if( spritesheet.data ) {
        if(spritesheet.original)
            domElement.style.position = "relative";

        spritesheet.count = spritesheet.data.length;

        params.onUpdate = function(counterID, spritesheet, domElement) {
            var counter = Math.ceil(_TweenSpriteCounters[counterID].counter);

            if ( counter < spritesheet.count) {
                domElement.style.backgroundPositionX = "-" + spritesheet.data[counter][0];
                domElement.style.backgroundPositionY = "-" + spritesheet.data[counter][1];
                domElement.style.width = spritesheet.data[counter][2];
                domElement.style.height = spritesheet.data[counter][3];

                if(spritesheet.original){
                    //console.log((parseInt(spritesheet.data[counter][2]) - parseInt(spritesheet.original[0]))/2); 
                    domElement.style.left = -(parseInt(spritesheet.data[counter][2]) - parseInt(spritesheet.original[0]))/2 + "px";
                    domElement.style.top  = -(parseInt(spritesheet.data[counter][3]) - parseInt(spritesheet.original[1]))/2 + "px";
                }
            } 
        }    
    } else {
        if(typeof spritesheet.stepX == "string"){
            spritesheet._stepXunits = spritesheet.stepX.replace(parseFloat(spritesheet.stepX), "");
            spritesheet.stepX = parseFloat(spritesheet.stepX);
        } else
            spritesheet._stepXunits = "px";

        if(typeof spritesheet.stepY == "string"){
            spritesheet._stepYunits = params.stepY.replace(parseFloat(spritesheet.stepY), "");
            spritesheet.stepY = parseFloat(params.stepY);
        } else
            spritesheet._stepYunits = "px";


        if(spritesheet._stepXunits == "%")
            spritesheet._spritesInRow = Math.floor(100 / spritesheet.stepX);
        else
            spritesheet._spritesInRow = Math.floor(spritesheet.width / spritesheet.stepX);

        if(!spritesheet.offsetX) spritesheet.offsetX = 0;
        if(!spritesheet.offsetY) spritesheet.offsetY = 0;

        params.onUpdate = function(counterID, spritesheet, domElement) {
            if ( _TweenSpriteCounters[counterID].counter < spritesheet.count - 1) {
                var counter = Math.ceil(_TweenSpriteCounters[counterID].counter);

                domElement.style.backgroundPositionX = "-" + (spritesheet.offsetX + spritesheet.stepX*(counter%spritesheet._spritesInRow)) + spritesheet._stepXunits;
                domElement.style.backgroundPositionY = "-" + (spritesheet.offsetY + spritesheet.stepY*Math.floor(counter/spritesheet._spritesInRow)) + spritesheet._stepYunits;
            } 
        }    
    }

    params.counter = spritesheet.count;
    params.onUpdateParams = [counterID, spritesheet, domElement];
    params.ease = SteppedEase.config( spritesheet.count + 1 );
    return TweenMax.to( _TweenSpriteCounters[counterID] , time, params );
}