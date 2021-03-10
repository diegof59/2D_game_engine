"use strict";

let globGL = null;

function initializeGL(){
  let canvas = document.getElementById("GLCanvas");
  globGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

  if (globGL !== null) {
    // set the color to be cleared
    globGL.clearColor(0.09, 0.07, 0.95, 1.0);

    // Init the vertex buffer
    initSquareBuffer(); // from vertexBuffer.js

     // Load and compile the shaders
    initSimpleShader("VertexShader", "FragmentShader"); // from shaderSupport.js
  } else {
    document.write("<br/> WebGL is not supported")
  }
}

function drawSquare(){
  globGL.clear(globGL.COLOR_BUFFER_BIT); // clears the setted color

  // S1 Activate the program to use
  globGL.useProgram(globSimpleShader); // from shaderSuppor.js

  // S2 Enables the vertex position attrib
  globGL.enableVertexAttribArray(globShaderVertexPositionAttribute);

  // S3 Draws with the settings determined, draws a square
  // by drawing 2 triangles
  globGL.drawArrays(globGL.TRIANGLE_STRIP, 0, 4);
}

function drawGL(){
  initializeGL();
  drawSquare();
}
