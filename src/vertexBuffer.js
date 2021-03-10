"use strict";

let globSquareVertexBuffer = null;

function initSquareBuffer(){
  // Define the vertices of the square
  let squareVertices = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
  ];

  // Create a buffer on the globGL context for the vertex positions
  // Buffer on the GPU
  globSquareVertexBuffer = globGL.createBuffer();

  // Activate buffer
  globGL.bindBuffer(globGL.ARRAY_BUFFER, globSquareVertexBuffer);

  // Load squareVertices into the vertexBuffer
  globGL.bufferData(globGL.ARRAY_BUFFER,
    new Float32Array(squareVertices),
    globGL.STATIC_DRAW);
}