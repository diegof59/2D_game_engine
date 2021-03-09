"use strict";

let globalGL = null;

function initializeGL(){
  let canvas = document.getElementById("GLCanvas");
  globalGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

  if (globalGL !== null) {
    globalGL.clearColor(0.09, 0.07, 0.95, 1.0); // set the color to be cleared
  } else {
    document.write("<br/> WebGL is not supported")
  }
}

function clearCanvas(){
  globalGL.clear(globalGL.COLOR_BUFFER_BIT); // clears the setted color
}

function drawGL(){
  initializeGL();
  clearCanvas();
}
