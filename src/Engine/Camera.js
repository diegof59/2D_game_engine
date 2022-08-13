/* Camera object that abstracts the view projection transform and
the viewport functionality */

// wcCenter: is a vec2
// wcWidth: is the width of the user defined WC
//      Height of the user defined WC is implicitly defined by the viewport aspect ratio
//      Please refer to the following
// viewPortArray: an array of 4 elements
//      [0] [1]: (x,y) position of lower left corner on the canvas (in pixel)
//      [2]: width of viewport
//      [3]: height of viewport
//      
//  wcHeight = wcWidth * viewport[3]/viewport[2]
function Camera(wcCenter, wcWidth, viewPortArray){

  // WorldCoordinateSpace and viewport position and size
  this.mWCCenter = wcCenter;
  this.mWCWidth = wcWidth;
  this.mViewPort = viewPortArray; // [x,y,width,height]
  this.mNearPlane = 0;
  this.mFarPlane = 1000;

  // Transformation matrices
  this.mViewMatrix = mat4.create();
  this.mProjectionMatrix = mat4.create();
  this.mVPMatrix = mat4.create();

  // Viewport background color
  this.mBgColor = [0.8,0.8,0.8,1];

}

Camera.prototype.setWCCenter = function(x, y){
  this.mWCCenter[0] = x;
  this.mWCCenter[1] = y;
};

Camera.prototype.getWCCenter = function () { return this.mWCCenter; };

Camera.prototype.setWCWidth = function (width) { this.mWCWidth = width; };

Camera.prototype.setViewport = function (viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function () { return this.mViewport; };

Camera.prototype.setBackgroundColor = function (color) { this.mBgColor = color; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

Camera.prototype.getVPMatrix = function () { return this.mVPMatrix; };

// Initializes the camera to begin drawing
// It configures webGL to draw to the viewport and sets up the view projection transfomr
Camera.prototype.setupViewProjection = function () {
  let gl = globEngine.Core.getGL();

  // Set up the viewport, area on canvas to be drawn
  gl.viewport(this.mViewPort[0], this.mViewPort[1], this.mViewPort[2], this.mViewPort[3]);
  // Set up corresponding scissor area to limit clear area
  gl.scissor(this.mViewPort[0], this.mViewPort[1], this.mViewPort[2], this.mViewPort[3]);
  // Set up color of the camera area
  gl.clearColor(this.mBgColor[0],this.mBgColor[1],this.mBgColor[2],this.mBgColor[3]);

  // Enable the scissor area, clear area, and then disable area
  gl.enable(gl.SCISSOR_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.disable(gl.SCISSOR_TEST);

  // Defines the center of the WorldSpace
  mat4.lookAt(this.mViewMatrix,
    [this.mWCCenter[0], this.mWCCenter[1], 10], // Camera position
    [this.mWCCenter[0], this.mWCCenter[1], 0],  // Look at position
    [0, 1, 0]     // Orientation
  );
  
  let halfWCWidth = 0.5 * this.mWCWidth;
  let halfWCHeight = halfWCWidth * this.mViewPort[3] / this.mViewPort[2];

  // Defines the distances of the borders from the center
  mat4.ortho(this.mProjectionMatrix,
    -halfWCWidth,  // Distance to left of WorldSpace
    halfWCWidth,   // Distance to right of WorldSpace
    -halfWCHeight,   // Distance to bottom of WorldSpace
    halfWCHeight,    // Distance to top of WorldSpace
    this.mNearPlane,    // z-distance to near plane
    this.mFarPlane  // z-distance to far plane
  );

  // Creates the viewprojection matrix and assigns to it the multiplication of
  // view and projection matrices
  mat4.multiply(this.mVPMatrix, this.mProjectionMatrix, this.mViewMatrix);
}