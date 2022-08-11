"use strict";

var globEngine = globEngine || { };

globEngine.ResourceMap = (function () {
    
  // Object that represents a resource
  let MapEntry = function (rName) {
    this.mAsset = rName;
  };

  /* Number of outstanding load operations, number of resource
    load requests issued and not completed */
  let mNumOutstandingLoads = 0;

  /* Callback function when all textures are loaded, that is 
    when mNumOutstandingLoads is 0 */
  let mLoadCompleteCallback = null;

  /* Resource storage, hashmap of MapEntry
    Supports the storage and retrieval of resources
    according to its unique id */
  let mResourceMap = {};

  /* Register one more resource to load
    Increases number of resources currently loading
  */
  let asyncLoadRequested = function (rName) {
      mResourceMap[rName] = new MapEntry(rName); // place holder for the resource to be loaded
      ++mNumOutstandingLoads;
  };

  /* Checks if the resource is loaded in the resourceMap
    and assigns the loaded asset reference to the resource.
    It decreases the number of resources currently loading
    Calls to check if all resources are loaded
  */
  let asyncLoadCompleted = function (rName, loadedAsset) {
      if (!isAssetLoaded(rName)) {
          alert("globEngine.asyncLoadCompleted: [" + rName + "] not in map!");
      }
      mResourceMap[rName].mAsset = loadedAsset;
      --mNumOutstandingLoads;
      _checkForAllLoadCompleted();
  };

  /* Check if resources are loaded (mNumOutstandingLoads == 0)
    and calls the callback funct if is defined. It resets the LoadCompleteCallback
    so its called only once */
  let _checkForAllLoadCompleted = function () {
    if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
      let functToCall = mLoadCompleteCallback;
      mLoadCompleteCallback = null;
      functToCall();
    }
  };

  /* Sets the callback funct to be called when all resources are loaded
    Calls _checkForAllLoadCompleted after setting the funct
    Make sure to set the callback _AFTER_ all load commands are issued 
  */
  let setLoadCompleteCallback = function (funct) {
    mLoadCompleteCallback = funct;
    _checkForAllLoadCompleted();
  };

  /* Retrieves a resource asset from the map */
  let retrieveAsset = function (rName) {
    let resource = null;
    if (rName in mResourceMap) {
      resource = mResourceMap[rName].mAsset;
    } else {
      alert("globEngine.retrieveAsset: [" + rName + "] not in map!");
    }
    return resource;
  };

  /* Is asset loaded or loading */
  let isAssetLoaded = function (rName) {
    return (rName in mResourceMap);
  };

  /* Unloads a resource deleting its reference from the resource map */
  let unloadAsset = function (rName) {
    if (rName in mResourceMap) {
      delete mResourceMap[rName];
    }
  };
  
  let mPublic = {
    // Resource loading
    asyncLoadRequested,
    asyncLoadCompleted,
    setLoadCompleteCallback,
    // Resource storage
    retrieveAsset,
    unloadAsset,
    isAssetLoaded
  };

  return mPublic;
}());