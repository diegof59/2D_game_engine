"use strict";

let globSimpleShader = null;
let globShaderVertexPositionAttribute = null;

function loadCompileShader(id, shaderType){
  
  let shaderText, shaderSource, compiledShader;
  
  // S1: Get the shader source from index.html
  shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;
  
  // S2: Create the shader based on the source type: vertex or fragment
  compiledShader = globGL.createShader(shaderType);
  
  // S3: Compile the created shader
  globGL.shaderSource(compiledShader, shaderSource);
  globGL.compileShader(compiledShader);
  
  // S4: check for error and return result
  if (!globGL.getShaderParameter(compiledShader, globGL.COMPILE_STATUS)) {
    alert("A shader compiling error occurred: " +
    globGL.getShaderInfoLog(compiledShader));
  }

  return compiledShader;
}

function initSimpleShader(vertexShaderId, fragmentShaderId){

  // S1 Load and compile the shaders
  let vertexShader = loadCompileShader(vertexShaderId, globGL.VERTEX_SHADER);
  let fragmentShader = loadCompileShader(fragmentShaderId, globGL.FRAGMENT_SHADER);

  // S2 Create and link the shaders into the program
  globSimpleShader = globGL.createProgram();
  globGL.attachShader(globSimpleShader, vertexShader);
  globGL.attachShader(globSimpleShader, fragmentShader);
  globGL.linkProgram(globSimpleShader);

  // S3 Check for errors
  if(!globGL.getProgramParameter(globSimpleShader, globGL.LINK_STATUS)){
    alert("Error linking shader");
  }

  // S4 Get a reference to the aSquareVertexPosition attribute
  globShaderVertexPositionAttribute = globGL.getAttribLocation(
    globSimpleShader, "aSquareVertexPosition");

  // S5 Activates the vertex buffer loaded in vertexBuffer.js
  globGL.bindBuffer(globGL.ARRAY_BUFFER, globSquareVertexBuffer);

  // S6 Describe the characteristics of the vertex position attrib
  globGL.vertexAttribPointer(globShaderVertexPositionAttribute,
    3, // each vertex element is a 3-float (x,y,z)
    globGL.FLOAT, // data type is FLOAT
    false, // if the content is normalized vectors
    0, // number of bytes to skip in between elements
    0  // offsets to the first element
  );

}