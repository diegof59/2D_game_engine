"use strict";

/* SimpleShader constructor */
function SimpleShader(vertexShaderPath, fragmentShaderPath){

  this.mCompiledShader = null;
  this.mShaderVertexPositionAttribute = null;
  this.mPixelColor = null;
  this.mModelTransform = null;
  this.mViewProjectionTransform = null;

  let gl = globEngine.Core.getGL();

  /* Compile vertex and fragment shader */
  let vertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
  let fragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

  /* Create a GL program and link the shaders to it */
  this.mCompiledShader = gl.createProgram();
  gl.attachShader(this.mCompiledShader, vertexShader);
  gl.attachShader(this.mCompiledShader, fragmentShader);
  gl.linkProgram(this.mCompiledShader);

  /* Error checking for shaders linking */
  if(!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)){
    alert("Error linking shader");
    return null;
  }

  /* Gets reference to the aSquareVertexPosition attribute of the vertex shader */
  this.mShaderVertexPositionAttribute = gl.getAttribLocation(
    this.mCompiledShader,
    "aSquareVertexPosition"
  );
  
  /* Gets reference to the shader pixel color attribute */
  this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");

  /* Gets reference to the shader model transform matrix */
  this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");

  /* Gets reference to the shader view projection matrix */
  this.mViewProjectionTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjectionTransform");

  /* Activates the vertex buffer loaded in engine Core
    Commented because is already activated in engine Core */
  //gl.bindBuffer(gl.ARRAY_BUFFER, globEngine.VertexBuffer.getGLVertexRef());

  /* Describe the characteristics of the vertex position attribute */
  gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
    3,              // each element is a 3-tuple
    gl.FLOAT,       // data type is FLOAT
    false,          // if the content is normalized vectors
    0,              // number of bytes to skip in between elements
    0               // offsets to the first element
  );
  
}

/* Shader getter
  Must use function declaration, arrow function doesn't work here because there
  is not binding of this object
*/
SimpleShader.prototype.getShader = function () { return this.mCompiledShader };

/* Loads and compiles a shader from its source code in the DOM
    shaderID is the shader source code id in the HTML
    Private function begins with underscore
*/
SimpleShader.prototype._compileShader = function (filePath, shaderType) {
  
  let shaderSource, compiledShader;
  let gl = globEngine.Core.getGL();
  
  /* Gets the shader source from the resource map */
  shaderSource = globEngine.ResourceMap.retrieveAsset(filePath);

  /* Creates the shader based on shaderType */
  compiledShader = gl.createShader(shaderType);

  /* Compiles the shader */
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  /* Error checking and logging for shader debugging */
  if(!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)){
    alert(`A shader compiling error ocurred ${gl.getShaderInfoLog(compiledShader)}`);
  }

  return compiledShader;
};

/* Activates the shader for drawing */
SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
  let gl = globEngine.Core.getGL();
  gl.useProgram(this.mCompiledShader);
  gl.uniformMatrix4fv(this.mViewProjectionTransform, false, vpMatrix);
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  // Copies the color values from pixelColor to the shader pixelColor attribute refered
  gl.uniform4fv(this.mPixelColor, pixelColor);
};

/* Loads per-object model transform to the vertex shader */
SimpleShader.prototype.loadObjectTransform = function(modelTransform){
  let gl = globEngine.Core.getGL();
  // Copies the modelTransform matrix to the vertex shader modeltransform
  gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};