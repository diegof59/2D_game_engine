"use strict;"

function MyGame(htmlCanvasID){

  // Shader for drawing
  this.mShader = null;

  // Init webGL of the canvas
  globEngine.Core.initWebGL(htmlCanvasID);

  // Create, load and compile the vertex and fragment shaders
  // Shader path is relative to server root
  this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");

  // Create renderable white and burgundy squares
  this.mWhiteSquare = new Renderable(this.mShader);
  this.mWhiteSquare.setColor([1,1,1,1]);
  this.mBurgundySquare = new Renderable(this.mShader);
  this.mBurgundySquare.setColor([0.46,0.042,0.11,1]);

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.09, 0.07, 0.95, 1]);

  // Creates a new identity transform operator (identity matrix)

  /* Transformations for white square */
  // Translates vertices to the left and up
  this.mWhiteSquare.getTransform().setTranslation(-0.25,0.25);
  // Rotates vertices by 0.2 radians
  this.mWhiteSquare.getTransform().setRotationInRad(0.2);
  // Scales by 1.2 in x and y
  this.mWhiteSquare.getTransform().setScale(1.2,1.2);

  // Draw the renderable square white square, with the transformations to apply
  this.mWhiteSquare.draw();
  
  /* Transformations for the burgundy square*/
  this.mBurgundySquare.getTransform().setTranslation(0.25,-0.25);
  this.mBurgundySquare.getTransform().setRotationInRad(-0.785);
  this.mBurgundySquare.getTransform().setScale(0.4,0.4);

  // Draw the renderable square burgundy square, with the transformations to apply
  this.mBurgundySquare.draw();

}