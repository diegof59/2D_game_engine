"use strict;"

/* Encapsulates the rendering/drawing operation of an object */

function Renderable(shader){

  this.mShader = shader;
  this.mColor = [1,1,1,1];
  this.mTransform = new Transform();

}

Renderable.prototype.getColor = function(){
  return this.mColor;
};

Renderable.prototype.setColor = function(color){
  this.mColor = color;
};

Renderable.prototype.getTransform = function(){
  return this.mTransform;
};

/* Activates the shader with the setted color
  Loads the transform matrix in the vertex shader for it to be applied to the vertexes
*/
Renderable.prototype.draw = function(vpMatrix){
  let gl = globEngine.Core.getGL();
  this.mShader.activateShader(this.mColor,vpMatrix);
  this.mShader.loadObjectTransform(this.mTransform.getTransformMatrix());
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};