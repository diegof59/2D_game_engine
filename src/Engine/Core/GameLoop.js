"use strict;"

var globEngine = globEngine || {};

/* Implements the game loop functionality */
globEngine.GameLoop = (function(){
  
  let FPS = 60; // Frames per second
  let MPF = 1000 / FPS; // Milliseconds per frame

  let mPreviousTime;
  let mLagTime;
  let mCurrentTime;
  let mElapsedTime;

  // The current loop state (running or should stop)
  let mIsLoopRunning = false;

  // Reference to game logic
  let mMyGame = null;

  let _runLoop = function() {
    if(mIsLoopRunning){
      /* Setup for next call to runLoop and update input
        Uses window.requestAnimationFrame to call runLoop
        each frame available. Uses .call() to call runLoop
        with mMyGame as this object binded.
      */
      requestAnimationFrame(function() {_runLoop.call(mMyGame);});
      
      /* Compute time passed since last runLoop was executed
        Updates lagTime adding the elapsedTime to current lagTime
        If there is no lag, lagTime will be less or equal than frame time (MPF)
      */
      mCurrentTime = Date.now();
      mElapsedTime = mCurrentTime - mPreviousTime;
      mPreviousTime = mCurrentTime;
      mLagTime += mElapsedTime;

      /* Update the state of the game every frame
        If lag is larger than a frame time (MPF), keep
        updating the game state until lag is overcome
        Updates lagTime by substracting the frameTime to it
        because we are a frame ahead after updating
      */
      while ((mLagTime >= MPF) && mIsLoopRunning) {
        globEngine.Input.update();
        this.update();
        mLagTime -= MPF;
      }
      
      // Draw current state of the game
      this.draw();
    }
  };

  let start = function(myGame) {
    // Binds the game logic reference
    mMyGame = myGame;

    // Starts frame timing
    mPreviousTime = Date.now();
    mLagTime = 0.0;

    // Indicates gameLoop is now running
    mIsLoopRunning = true;

    // Starts runLoop next frame available
    requestAnimationFrame(function() {_runLoop.call(mMyGame);})
  };

  let mPublic = { start };

  return mPublic;
})();