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

Renderable.prototype.draw = function(){
  let gl = globEngine.Core.getGL();
  this.mShader.activateShader(this.mColor);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}