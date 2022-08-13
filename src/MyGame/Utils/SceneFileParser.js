"use strict";

function SceneFileParser(sceneFilePath) {
  this.mSceneXml = globEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype._getElem = function (tagElem) {
  
  let element = this.mSceneXml.getElementsByTagName(tagElem);
  if (element.length === 0) {
    console.error("Warning: Level element:[" + tagElem + "]: is not found!");
  }
  return element;
};

SceneFileParser.prototype.parseCamera = function () {
 
  let camElem = this._getElem("Camera");
  let cx = Number(camElem[0].getAttribute("CenterX"));
  let cy = Number(camElem[0].getAttribute("CenterY"));
  let w = Number(camElem[0].getAttribute("Width"));
  let viewport = camElem[0].getAttribute("Viewport").split(" ");
  let bgColor = camElem[0].getAttribute("BgColor").split(" ");
  
  for (let j = 0; j < 4; j++) {
    bgColor[j] = Number(bgColor[j]);
    viewport[j] = Number(viewport[j]);
  }

  let cam = new Camera(
    vec2.fromValues(cx, cy),  // position of the camera
    w,                        // width of camera
    viewport                  // viewport (orgX, orgY, width, height)
  );

  cam.setBackgroundColor(bgColor);

  return cam;
};

SceneFileParser.prototype.parseSquares = function (sqSet) {
  
  let elem = this._getElem("Square");
  let x, y, width, height, rotation, color, square;
  
  for (let i = 0; i < elem.length; i++) {
    x = Number(elem.item(i).attributes.getNamedItem("PosX").value);
    y = Number(elem.item(i).attributes.getNamedItem("PosY").value);
    width = Number(elem.item(i).attributes.getNamedItem("Width").value);
    height = Number(elem.item(i).attributes.getNamedItem("Height").value);
    rotation = Number(elem.item(i).attributes.getNamedItem("Rotation").value);
    color = elem.item(i).attributes.getNamedItem("Color").value.split(" ");
    
    square = new Renderable(globEngine.DefaultResources.getConstColorShader());

    for (let j = 0; j < 4; j++) {
      color[j] = Number(color[j]);
    }

    square.setColor(color);
    square.getTransform().setPosition(x, y);
    square.getTransform().setRotationInDegree(rotation); // In Degree
    square.getTransform().setScale(width, height);

    sqSet.push(square);
  }
};