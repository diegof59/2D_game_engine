"use strict;"

/* The logic of the game */
function MyGame(){

  // Shader for drawing
  this.mConstColorShader = null;
  // Camera to view the scene
  this.mCamera = null;

  // Game objects
  this.mWhiteSquare = null;
  this.mBurgundySquare = null;

}

/* Init the game state */
MyGame.prototype.init = function(){

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

  // Create, load and compile the vertex and fragment shaders
  // Shader path is relative to server root
  this.mConstColorShader = globEngine.DefaultResources.getConstColorShader();

  // Setup the camera
  this.mCamera = new Camera(
    vec2.fromValues(20,60), // WC center
    20, // WC width
    [20,40,600,300] // Viewport [originX, originY, width, height]
  );

  // sets the viewport bg to dark gray
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);  

  // Create renderable white and burgundy squares
  this.mWhiteSquare = new Renderable(this.mConstColorShader);
  this.mWhiteSquare.setColor([1,1,1,1]);
  this.mBurgundySquare = new Renderable(this.mConstColorShader);
  this.mBurgundySquare.setColor([0.46,0.042,0.11,1]);

  /* Init white square centered, 5x5 and rotate 0.2rad */
  // Translates vertices to the left and up
  this.mWhiteSquare.getTransform().setPosition(20,60);
  // Rotates vertices by 0.2 radians
  this.mWhiteSquare.getTransform().setRotationInRad(0.2);
  // Scales by 1.2 in x and y
  this.mWhiteSquare.getTransform().setScale(5,5);
  /* Init burgundy square centered, 2.4x2.4  */
  this.mBurgundySquare.getTransform().setPosition(20, 60);
  this.mBurgundySquare.getTransform().setScale(2.4,2.4);

  // Starts the game loop
  globEngine.GameLoop.start(this);
};

/* Updates the game state */
MyGame.prototype.update = function() {
  
  // Move the white square like a wheel and pulse the burgundy one
  
  // Moving the white square
  let whiteSqXform = this.mWhiteSquare.getTransform();
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
  let burgundySqXform = this.mBurgundySquare.getTransform();

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

  // Draw the renderable square white square, with the transformations to apply
  this.mWhiteSquare.draw(vpMatrix);

  // Draw the renderable square burgundy square, with the transformations to apply
  this.mBurgundySquare.draw(vpMatrix);
};