"use strict;"

function MyGame(htmlCanvasID){

  // Shader for drawing
  this.mShader = null;

  // Init webGL of the canvas
  globEngine.Core.initWebGL(htmlCanvasID);

  // Create, load and compile the vertex and fragment shaders
  // Shader path is relative to server root
  this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.09, 0.07, 0.95, 1]);

  // Activates the shader
  this.mShader.activateShader([0,0.9,0.98, 0.8]);

  // Gets webgl and draws with the currently activated geometry and the activated shader
  let gl = globEngine.Core.getGL();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}