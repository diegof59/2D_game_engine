"use strict;"

function MyGame(htmlCanvasID){

  // Shader for drawing
  this.mShader = null;

  // Init webGL of the canvas
  globEngine.Core.initWebGL(htmlCanvasID);

  // Create, load and compile the vertex and fragment shaders
  // Shader path is relative to server root
  this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");

  // Setup the camera
  this.mCamera = new Camera(
    vec2.fromValues(20,60), // WC center
    20, // WC width
    [20,40,600,300] // Viewport [originX, originY, width, height]
  );

  // Create the corner squares
  this.mTopLeftSq = new Renderable(this.mShader);
  this.mTopLeftSq.setColor([0.9,0.1,0.1,1]);
  this.mTopRightSq = new Renderable(this.mShader);
  this.mTopRightSq.setColor([0.1,0.9,0.1,1]);
  this.mBottomLeftSq = new Renderable(this.mShader);
  this.mBottomLeftSq.setColor([0.1,0.1,0.9,1]);
  this.mBottomRightSq = new Renderable(this.mShader);
  this.mBottomRightSq.setColor([0.1,0.1,0.1,1]);

  // Create renderable white and burgundy squares
  this.mWhiteSquare = new Renderable(this.mShader);
  this.mWhiteSquare.setColor([1,1,1,1]);
  this.mBurgundySquare = new Renderable(this.mShader);
  this.mBurgundySquare.setColor([0.46,0.042,0.11,1]);

  // Clear canvas to a  color
  globEngine.Core.clearCanvas([0.09, 0.07, 0.95, 1]);

  this.mCamera.setupViewProjection();
  let vpMatrix = this.mCamera.getVPMatrix();

  /* Transformations for white square */
  // Translates vertices to the left and up
  this.mWhiteSquare.getTransform().setTranslation(20,60);
  // Rotates vertices by 0.2 radians
  this.mWhiteSquare.getTransform().setRotationInRad(0.2);
  // Scales by 1.2 in x and y
  this.mWhiteSquare.getTransform().setScale(5,5);

  // Draw the renderable square white square, with the transformations to apply
  this.mWhiteSquare.draw(vpMatrix);
  
  /* Transformations for the burgundy square*/
  this.mBurgundySquare.getTransform().setTranslation(20, 60);
  this.mBurgundySquare.getTransform().setRotationInRad(-0.785);
  this.mBurgundySquare.getTransform().setScale(2.4,2.4);

  // Draw the renderable square burgundy square, with the transformations to apply
  this.mBurgundySquare.draw(vpMatrix);

  // Corner squares
  this.mTopLeftSq.getTransform().setTranslation(10,65);
  this.mTopLeftSq.draw(vpMatrix);

  this.mTopRightSq.getTransform().setTranslation(30,65);
  this.mTopRightSq.draw(vpMatrix);

  this.mBottomLeftSq.getTransform().setTranslation(10,55);
  this.mBottomLeftSq.draw(vpMatrix);

  this.mBottomRightSq.getTransform().setTranslation(30,55);
  this.mBottomRightSq.draw(vpMatrix);

}