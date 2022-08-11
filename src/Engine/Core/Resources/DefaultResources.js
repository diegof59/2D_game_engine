"use strict";

var globEngine = globEngine || {};

globEngine.DefaultResources = (function () {
  // Simple Shader
  const SimpleVS = "src/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader 
  const SimpleFS = "src/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader

  let mConstColorShader = null;

  /* Issues the load of the shaders from its textfiles and sets the
    createShaders function as the callback for when load is complete
  */
  let init = function (callBackFunction) {
    // constant color shader: SimpleVS, and SimpleFS
    globEngine.TextFileLoader.loadTextFile(SimpleVS, globEngine.TextFileLoader.TextFileType.TextFile);
    globEngine.TextFileLoader.loadTextFile(SimpleFS, globEngine.TextFileLoader.TextFileType.TextFile);

    globEngine.ResourceMap.setLoadCompleteCallback(() => { _createShaders(callBackFunction); });
  };

  /* Create the shader object with the shaders path as id to the loaded resource */
  let _createShaders = function (callBackFunction) {
    mConstColorShader = new SimpleShader(SimpleVS, SimpleFS);
    callBackFunction();
  };

  let getConstColorShader = function () { return mConstColorShader; };

  let mPublic = {
    init,
    getConstColorShader
  };
  return mPublic;
}());