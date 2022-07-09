// Vertex shader expects one vertex position
attribute vec3 aSquareVertexPosition;

// Matrix to transform the vertex position, its the same for all
// vertices in the shader
uniform mat4 uModelTransform;

void main(void) {
  // Convert the vec3 into vec4 for scan conversion, applies the matrix transformation
  // and assigns it to gl_Position to pass the vertex to the fragment shader
  gl_Position = uModelTransform * vec4(aSquareVertexPosition, 1.0);
}