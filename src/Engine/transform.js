/* Encapsulates the matrix transformation functionality */

function Transform(){

  this.mTranslation = [0,0];
  this.mScale = [1,1];
  this.mRotateInRad = 0;
}

/* Translation */

Transform.prototype.setTranslation = function(xPos, yPos){
  this.mTranslation[0] = xPos;
  this.mTranslation[1] = yPos;
};

Transform.prototype.getTranslation = function() { return this.mTranslation; };

Transform.prototype.getXPos = function () { return this.mTranslation[0]; };

Transform.prototype.setXPos = function (xPos) { this.mTranslation[0] = xPos; };

Transform.prototype.incXPosBy = function (delta) { this.mTranslation[0] += delta; };

Transform.prototype.getYPos = function () { return this.mTranslation[1]; };

Transform.prototype.setYPos = function (yPos) { this.mTranslation[1] = yPos; };

Transform.prototype.incYPosBy = function (delta) { this.mTranslation[1] += delta; };

/* Scaling */

Transform.prototype.setScale = function(width, height){
  this.mScale[0] = width;
  this.mScale[1] = height;
};

Transform.prototype.getScale = function() { return this.mScale; };

Transform.prototype.getWidth = function () { return this.mScale[0]; };

Transform.prototype.setWidth = function (width) { this.mScale[0] = width; };

Transform.prototype.incWidthBy = function (delta) { this.mScale[0] += delta; };

Transform.prototype.getHeight = function () { return this.mScale[1]; };

Transform.prototype.setHeight = function (height) { this.mScale[1] = height; };

Transform.prototype.incHeightBy = function (delta) { this.mScale[1] += delta; };

Transform.prototype.incSizeBy = function (delta) {
  this.incWidthBy(delta);
  this.incHeightBy(delta);
};

/* Rotation */

Transform.prototype.setRotationInRad = function(rotationInRad){
  this.mRotateInRad = rotationInRad;
  while (this.mRotateInRad > (2 * Math.PI)) {
    this.mRotateInRad -= (2 * Math.PI);
  }
};

Transform.prototype.getRotateInRad = function() { return this.mRotateInRad; };

Transform.prototype.incRotationByRad = function (deltaRad) {
  this.setRotationInRad(this.mRotateInRad + deltaRad);
};

Transform.prototype.setRotationInDegree = function (rotationInDegree) {
  this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
};

Transform.prototype.getRotationInDegree = function () { return this.mRotationInRad * 180.0 / Math.PI; };

Transform.prototype.incRotationByDegree = function (deltaDegree) {
  this.incRotationByRad(deltaDegree * Math.PI / 180.0);
};

/* Return the transformation matrix */
Transform.prototype.getTransformMatrix = function(){
  let matrix = mat4.create();

  // The matrices that WebGL uses are transposed, thus the typical matrix
  // operations must be in reverse. The transform matrix is TRS (TranslateRotateScale)

  mat4.translate(matrix, matrix, vec3.fromValues(this.mTranslation[0], this.mTranslation[1], 0.0));
  mat4.rotateZ(matrix, matrix, this.mRotateInRad);
  mat4.scale(matrix, matrix, vec3.fromValues(this.mScale[0], this.mScale[1], 1.0));

  return matrix;
};