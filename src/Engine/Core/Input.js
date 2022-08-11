"use strict;"

var globEngine = globEngine || {};

globEngine.Input = (function() {
  
  // Key codes
  const KEYS = {
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Space: 32,
    LastKey: 222
  };

  /* Keys states as booleans */

  // Previous update state cicle key state (if pressed)
  let mKeyPreviousState = [];

  // Pressed keys on current game update state
  let mIsKeyPressed = [];

  // Key clicked event, when a key is pressed and then released
  let mIsKeyClicked = [];

  let _OnKeyDown = function(event) {
    mIsKeyPressed[event.keyCode] = true;
  };

  let _OnKeyUp = function(event) {
    mIsKeyPressed[event.keyCode] = false;
  };

  let init = function(){
    // Fill keys states
    for(i=0;i<KEYS.LastKey;i++){
      mIsKeyPressed[i] = false;
      mKeyPreviousState[i] = false;
      mIsKeyClicked[i] = false;
    }

    // Register event listeners
    addEventListener('keyup', _OnKeyUp);
    addEventListener('keydown', _OnKeyDown);
  };

  let update = function(){
    for(i=0;i<KEYS.LastKey;i++){
      mIsKeyClicked[i] = !mKeyPreviousState[i] && mIsKeyPressed[i];
      mKeyPreviousState[i] = mIsKeyPressed[i];
    }
  };

  let isKeyPressed = function(keyCode){
    return mIsKeyPressed[keyCode];
  };

  let isKeyClicked = function(keyCode){
    return mIsKeyClicked[keyCode];
  };

  let mPublic = {
    init,
    update,
    isKeyPressed,
    isKeyClicked,
    KEYS
  };

  return mPublic;
})();