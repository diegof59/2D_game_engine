"use strict";

var globEngine = globEngine || {};

// Note: loads the a textfile and when done calls the callbackFunction()
// fileName is treated as resource map key, file content is stored as asset
globEngine.TextFileLoader = (function () {
  
  const TextFileType = Object.freeze({
    XMLFile: 0,
    TextFile: 1
  });

  // if fileType is a TextFile type
  let loadTextFile = function (fileName, fileType, callbackFunction) {
    
    /* Checks if asset is loaded, if not, loads it, if is loaded it doesnt load it again */
    if (!(globEngine.ResourceMap.isAssetLoaded(fileName))) {
      // Update resources in load counter.
      globEngine.ResourceMap.asyncLoadRequested(fileName);

      // Asynchronously request the data from server.
      let req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if ((req.readyState === 4) && (req.status !== 200)) {
          alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
            "The index.html file must be loaded by a web-server.]");
        }
      };
      req.open('GET', fileName, true);
      req.setRequestHeader('Content-Type', 'text/xml');

      req.onload = function () {
        let fileContent = null;
        if (fileType === TextFileType.XMLFile) {
          let parser = new DOMParser();
          fileContent = parser.parseFromString(req.responseText, "text/xml");
        } else {
          fileContent = req.responseText;
        }
        // Sets the content as resource asset
        globEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);
        if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
          callbackFunction(fileName);
        }
      };
      req.send();
    } else {
      if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
        callbackFunction(fileName);
      }
    }
  };

  let unloadTextFile = function (fileName) {
    globEngine.ResourceMap.unloadAsset(fileName);
  };

  let mPublic = {
    loadTextFile,
    unloadTextFile,
    TextFileType
  };

  return mPublic;
}());