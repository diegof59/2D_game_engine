"use strict";

// Abstract class that defines a scene
// It must be subclassed to create a scene of a game
function Scene() {}

//<editor-fold desc="functions subclass should override">

// Begin Scene: must load all the scene contents
// when done 
//  => start the GameLoop
// The game loop will call initialize and then Update/draw
Scene.prototype.loadScene = function () {
  // override to load scene specific contents
};

// Must unload all resources
Scene.prototype.unloadScene = function () {
  // .. unload all resources
};

// Performs all initialization functions
//   => Should call gEngine.GameLoop.start(this)!
Scene.prototype.initialize = function () {
  // initialize the level (called from GameLoop)
};

// Update function to be called form EngineCore.GameLoop
Scene.prototype.update = function () {
  // when done with this level should call:
  // GameLoop.stop() ==> which will call this.unloadScene();
};


Scene.prototype.draw = function () {
  // draw function to be called from EngineCore.GameLoop
};