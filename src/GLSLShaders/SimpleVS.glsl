// Vertex shader expects one vertex position
attribute vec3 aSquareVertexPosition;
void main(void) {
  // Convert the vec3 into vec4 for scan conversion and
  // assign to gl_Position to pass the vertex to the fragment shader
  gl_Position = vec4(aSquareVertexPosition, 1.0);
}