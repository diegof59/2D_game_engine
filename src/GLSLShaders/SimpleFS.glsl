
// Sets precision for floating point computation
precision mediump float;

// Color attribute. uniform keyword for variable that is constant for all vertices
uniform vec4 uPixelColor;

void main(void){
  gl_FragColor = uPixelColor;
}