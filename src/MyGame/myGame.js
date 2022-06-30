"use strict;"

function MyGame(htmlCanvasID){

  // Shader for drawing
  this.mShader = null;

  // Init webGL of the canvas
  globEngine.Core.initWebGL(htmlCanvasID);

  // Create, load and compile the vertex and fragment shaders
  this.mShader = new SimpleShader("VertexShader", "FragmentShader");

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.09, 0.07, 0.95, 1]);

  // Activates the shader
  this.mShader.activateShader();

  // Gets webgl and draws with the currently activated geometry and the activated shader
  let gl = globEngine.Core.getGL();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}