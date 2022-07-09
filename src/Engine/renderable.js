"use strict;"

/* Encapsulates the rendering/drawing operation of an object */

function Renderable(shader){

  this.mShader = shader;
  this.mColor = [1,1,1,1];

}

Renderable.prototype.getColor = function(){
  return this.mColor;
}

Renderable.prototype.setColor = function(color){
  this.mColor = color;
}

/* Activates the shader with the setted color
  Loads the transform matrix in the vertex shader for it to be applied to the vertexes
*/
Renderable.prototype.draw = function(modelTransform){
  let gl = globEngine.Core.getGL();
  this.mShader.activateShader(this.mColor);
  this.mShader.loadObjectTransform(modelTransform);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}