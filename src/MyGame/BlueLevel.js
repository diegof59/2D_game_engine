"use strict;"

/* The logic of the game */
function BlueLevel(){
  
  // Scene file
  this.sceneFile = "assets/BlueLevel.xml";

  // Camera to view the scene
  this.mCamera = null;

  // Game objects
  this.squareSet = [];
}

globEngine.Core.inheritPrototype(BlueLevel, Scene);

/* Loads the scene from its file */
BlueLevel.prototype.loadScene = function() {
  globEngine.TextFileLoader.loadTextFile(
    this.sceneFile,
    globEngine.TextFileLoader.TextFileType.XMLFile
  );
};

/* Unloads the scene and starts next scene */
BlueLevel.prototype.unloadScene = function() {
  globEngine.TextFileLoader.unloadTextFile(this.sceneFile);

  let nextLevel = new GrayLevel();
  globEngine.Core.startScene(nextLevel);
};

/* Init the game state */
BlueLevel.prototype.init = function(){

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

  let sceneParser = new SceneFileParser(this.sceneFile);

  // Parse and setup the camera
  this.mCamera = sceneParser.parseCamera();

  // Parse and setup the objects
  sceneParser.parseSquares(this.squareSet);

};

/* Updates the game state */
BlueLevel.prototype.update = function() {
  
  // Move the white square like a wheel and pulse the burgundy one
  
  // Moving the white square
  let whiteSqXform = this.squareSet[0].getTransform();
  let deltaX = 0.05;

  if(whiteSqXform.getXPos() > 30){
    whiteSqXform.setPosition(10,60);
  }

  // If white square crosses left boundarie, change to gray level
  if(whiteSqXform.getXPos() < 10){
    globEngine.GameLoop.stop()
  }

  if(globEngine.Input.isKeyPressed(globEngine.Input.KEYS.Right)){
    whiteSqXform.incXPosBy(deltaX);
  }

  if(globEngine.Input.isKeyPressed(globEngine.Input.KEYS.Left)){
    whiteSqXform.incXPosBy(-deltaX);
  }

  if(globEngine.Input.isKeyPressed(globEngine.Input.KEYS.Up)){
    whiteSqXform.incRotationByDegree(1);
  }

  // Pulse the burgundy square
  let burgundySqXform = this.squareSet[1].getTransform();

  if(globEngine.Input.isKeyPressed(globEngine.Input.KEYS.Down)){
    if(burgundySqXform.getWidth() > 5){
      burgundySqXform.setScale(2,2);
    }
    burgundySqXform.incSizeBy(0.05)
  }
};

/* Draws the current game state */
BlueLevel.prototype.draw = function(){

  globEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

  this.mCamera.setupViewProjection();
  let vpMatrix = this.mCamera.getVPMatrix();

  // Draw the renderable squares
  for (let i = 0; i < this.squareSet.length; i++) {
    this.squareSet[i].draw(vpMatrix);
  }
};