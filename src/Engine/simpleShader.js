"use strict";

/* SimpleShader constructor */
function SimpleShader(vertexShaderId, fragmentShaderId){

  this.mCompiledShader = null;
  this.mShaderVertexPositionAttribute = null;

  let gl = globEngine.Core.getGL();

  /* Load and compile vertex and fragment shader */
  let vertexShader = this._loadCompileShader(vertexShaderId, gl.VERTEX_SHADER);
  let fragmentShader = this._loadCompileShader(fragmentShaderId, gl.FRAGMENT_SHADER);

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
SimpleShader.prototype._loadCompileShader = function (shaderID, shaderType) {
  let shaderText, shaderSource, compiledShader;
  let gl = globEngine.Core.getGL();
  
  /* Get the shader source from the HTML */
  shaderText = document.getElementById(shaderID);
  shaderSource = shaderText.firstChild.textContent;

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
}

/* Activates the shader for drawing */
SimpleShader.prototype.activateShader = function () {
  let gl = globEngine.Core.getGL();
  gl.useProgram(this.mCompiledShader);
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
}