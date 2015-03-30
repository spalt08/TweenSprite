var _TweenSpriteCounters = [];

function sequence( domElement, sequenceList, time, params ) {
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