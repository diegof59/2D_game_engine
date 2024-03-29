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
  const _initWebGL = (htmlCanvasID) => {
    let canvas = document.getElementById(htmlCanvasID); // get canvas
    // get the canvas webgl context and assign it to mGL var
    mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if(mGL === null){
      document.write("<br/> WebGL is not supported");
      return;
    }
  };

  const initEngineCore = (htmlCanvasID, game) => {

    _initWebGL(htmlCanvasID);
    globEngine.VertexBuffer.init();
    globEngine.Input.init();
    globEngine.DefaultResources.init(() => {startScene(game);});
  };

  const startScene = (game) => {
    game.loadScene();
    globEngine.GameLoop.start(game);
  };

  /* Clear canvas to a given color */
  const clearCanvas = (color) => {
    mGL.clearColor(color[0], color[1], color[2], color[3]); // set color
    mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color setted
  };

  // Utility function to inherit from a super class
  const inheritPrototype = function (subClass, superClass) {
    let prototype = Object.create(superClass.prototype);
    prototype.constructor = subClass;
    subClass.prototype = prototype;
  };

  // Public exports
  let mPublic = {
    getGL,
    initEngineCore,
    clearCanvas,
    startScene,
    inheritPrototype
  };

  return mPublic;
})();