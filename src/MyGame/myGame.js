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
  let transform = mat4.create();

  /* Transform matrix for the white square
    transform = TRS
  */
  // Translates vertices to the left and up
  mat4.translate(transform, transform, vec3.fromValues(-0.25,0.25,0));
  // Rotates vertices by 0.2 radians
  mat4.rotateZ(transform, transform, 0.2);
  // Scales by 1.2 in x and y
  mat4.scale(transform, transform, vec3.fromValues(1.2,1.2,1));

  // Draw the renderable square white square, with the transform matrix to apply
  this.mWhiteSquare.draw(transform);

  // Restores the transform matrix to identity
  mat4.identity(transform);
  
  /* Transform matrix for the white square
    transform = TRS
  */
  mat4.translate(transform, transform, vec3.fromValues(0.25,-0.25,0));
  mat4.rotateZ(transform, transform, -0.785);
  mat4.scale(transform, transform, vec3.fromValues(0.4,0.4,1));

  // Draw the renderable square burgundy square, with the transform matrix to apply
  this.mBurgundySquare.draw(transform);

}