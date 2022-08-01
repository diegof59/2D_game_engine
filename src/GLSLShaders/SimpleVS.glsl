// Vertex shader expects one vertex position
attribute vec3 aSquareVertexPosition;

// Matrix to transform the vertex position,
// its the same for all vertices in the shader
// Transforms from the ModelSpace to the WorldSpace
uniform mat4 uModelTransform;

// Matrix to transform from WorldSpace to
// WebGL Normalized Device Coordinate System
// which is the space that webGL draws to
uniform mat4 uViewProjectionTransform;

void main(void) {
  // Convert the vec3 into vec4 for scan conversion, applies the matrix transformation
  // and assigns it to gl_Position to pass the vertex to the fragment shader
  gl_Position = uViewProjectionTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);
}