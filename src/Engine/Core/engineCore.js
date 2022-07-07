"use strict";

// Uses the actual var or creates it if it does not exist
var globEngine = globEngine || {};

// Using JS module pattern
// m[var] defines a instance/private variable
globEngine.Core = (function(){
  /* Graphical context for drawing */
  let mGL = null;

  /* GL getter */
  const getGL = () => mGL;

  /* Init webGL, vertexBuffer and compile shaders */
  const initWebGL = (htmlCanvasID) => {
    let canvas = document.getElementById(htmlCanvasID); // get canvas
    // get the canvas webgl context and assign it to mGL var
    mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if(mGL === null){
      document.write("<br/> WebGL is not supported");
      return;
    }
    // Initialize vertex buffer
    globEngine.VertexBuffer.init();
  };

  /* Clear canvas to a given color */
  const clearCanvas = (color) => {
    mGL.clearColor(color[0], color[1], color[2], color[3]); // set color
    mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color setted
  };

  // Public exports
  let mPublic = {
    getGL,
    initWebGL,
    clearCanvas
  };

  return mPublic;
})();