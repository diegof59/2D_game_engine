"use strict;"

/* The logic of the game */
function MyGame(){
  
  // Scene file
  this.sceneFile = "assets/scene.xml";

  // Camera to view the scene
  this.mCamera = null;

  // Game objects
  this.squareSet = [];
}

/* Loads the scene from its file */
MyGame.prototype.loadScene = function() {
  globEngine.TextFileLoader.loadTextFile(
    this.sceneFile,
    globEngine.TextFileLoader.TextFileType.XMLFile
  );
};

/* Unloads the scene when game finished */
MyGame.prototype.unloadScene = function() {
  globEngine.TextFileLoader.unloadTextFile(this.sceneFile);
};

/* Init the game state */
MyGame.prototype.init = function(){

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

  let sceneParser = new SceneFileParser(this.sceneFile);

  // Parse and setup the camera
  this.mCamera = sceneParser.parseCamera();

  // Parse and setup the objects
  sceneParser.parseSquares(this.squareSet);

};

/* Updates the game state */
MyGame.prototype.update = function() {
  
  // Move the white square like a wheel and pulse the burgundy one
  
  // Moving the white square
  let whiteSqXform = this.squareSet[0].getTransform();
  let deltaX = 0.05;

  if(whiteSqXform.getXPos() > 30){
    whiteSqXform.setPosition(10,60);
  }

  if(whiteSqXform.getXPos() < 10){
    whiteSqXform.setPosition(30,60);
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
MyGame.prototype.draw = function(){

  globEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

  this.mCamera.setupViewProjection();
  let vpMatrix = this.mCamera.getVPMatrix();

  // Draw the renderable squares
  for (let i = 0; i < this.squareSet.length; i++) {
    this.squareSet[i].draw(vpMatrix);
  }
};