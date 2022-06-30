"use strict";

// Uses the actual var or creates it if it does not exist
var globEngine = globEngine || {};

// Using JS module pattern
// m[var] defines a instance/private variable
globEngine.VertexBuffer = (function() {
  /* Define the vertices of the square */
  let squareVertices = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
  ];

  /* Reference to the vertex positions for the square in the gl context */
  let mSquareVertexBuffer = null;

  /* mSquareVertexBuffer getter */
  const getGLVertexRef = () => mSquareVertexBuffer;

  /* Creates and loads vertices onto the GPU  */
  const init = () => {
    /* gets GL context */
    let gl = globEngine.Core.getGL();

    // Creates a buffer on the globGL context for the vertex positions
    // Buffer on the GPU
    mSquareVertexBuffer = gl.createBuffer();

    // Activates buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

    // Load squareVertices into the vertexBuffer
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(squareVertices),
      gl.STATIC_DRAW
    );
  };

  let mPublic = {
    getGLVertexRef,
    init
  };

  return mPublic;
})();