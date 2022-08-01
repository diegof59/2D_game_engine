"use strict;"

function MyGame(htmlCanvasID){

  // Shader for drawing
  this.mShader = null;

  // Init webGL of the canvas
  globEngine.Core.initWebGL(htmlCanvasID);

  // Create, load and compile the vertex and fragment shaders
  // Shader path is relative to server root
  this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");

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

  let gl = globEngine.Core.getGL();

  // Set up the viewport, area on canvas to be drawn
  gl.viewport(
    20, // x pos of bottom left corner of vp
    40, // y pos of bottom left corner of vp
    600,// width of vp
    300 // height of vp
  );

  // Set up corresponding scissor area to limit clear area
  gl.scissor(
    20, // x pos of bottom left corner of vp
    40, // y pos of bottom left corner of vp
    600,// width of vp
    300 // height of vp
  );

  // Enable the scissor area, clear area, and then disable area
  gl.enable(gl.SCISSOR_TEST);
  globEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
  gl.disable(gl.SCISSOR_TEST);

  let viewMatrix = mat4.create();
  let projectionMatrix = mat4.create();
  
  // Defines the center of the WorldSpace
  mat4.lookAt(viewMatrix,
    [20,60,10], // Camera position
    [20,60,0],  // Look at position
    [0,1,0]     // Orientation
  );
  
  // Defines the distances of the borders from the center
  mat4.ortho(projectionMatrix,
    -10,  // Distance to left of WorldSpace
    10,   // Distance to right of WorldSpace
    -5,   // Distance to bottom of WorldSpace
    5,    // Distance to top of WorldSpace
    0,    // z-distance to near plane
    1000  // z-distance to far plane
  );

  // Creates the viewprojection matrix and assigns to it the multiplication of
  // view and projection matrices
  let vpMatrix = mat4.create();
  mat4.multiply(vpMatrix, projectionMatrix, viewMatrix);

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