var REGISTERED_SCRIPTS = [];
var LOADED_SCRIPTS = [];
var WAITING_FOR_SCRIPTS = [];

/** 
 *Register a function which is called when all scripts are loaded.
 *@param {function} callback - The function to call.
 */
function registerWaitingForScripts(callback){
    if(REGISTERED_SCRIPTS.length == 0){
        callback();
    }else{
        WAITING_FOR_SCRIPTS.push(callback);
    }
}

/**
 *Load a single script.
 *@param {string} path - The path to the script.
 *@returns {Promise<boolean>} - Returns true if the script was loaded successfully.
 */
function loadScript(path, name){
    var scriptTag = document.createElement('script');
    scriptTag.src = path;
    scriptTag.async = false;
    return new Promise(resolve => {
        if(LOADED_SCRIPTS.includes(path)){
            resolve(true);
        }

        scriptTag.onerror = function(){
            scriptTag.onload = null;
            resolve(false);
        }
        scriptTag.onload = function(){
            scriptTag.onerror = null;

            //Remove module from REGISTERED_SCRIPTS.
            var index = REGISTERED_SCRIPTS.indexOf(name);
            if(index > -1){
                REGISTERED_SCRIPTS.splice(index, 1);
            }

            //Add module to LOADED_SCRIPTS.
            LOADED_SCRIPTS.push(path);

            resolve(true);
        }
        document.head.appendChild(scriptTag);
    });
}

/**
 *Load all the scripts.
 *@param {string[]} modules - The modules to load.
 */
async function loadScripts(modules){
    //Copy the elements of modules into REGISTERED_SCRIPTS.
    for(var i = 0; i < modules.length; i++){
        REGISTERED_SCRIPTS.push(modules[i]);
    }

    var length = modules.length;
    var errorCount = 0;
    for(var i = 0; i < length; i++){
        var e = modules[i];
        var result = await loadScript("https://mattee.net/scripts/carpenterjs/" + e.toString() + ".js?version=" + createRandomString(10), e.toString());
        if(!result){
            result = await loadScript("scripts/" + e.toString() + ".js?version=" + createRandomString(10), e.toString());
            if(!result){console.log("Failed to load " + e.toString()); errorCount++;}
        }
        console.log("loaded " + e);
    }
    if(REGISTERED_SCRIPTS.length == 0){
        console.log("all scripts loaded successfully.");
        WAITING_FOR_SCRIPTS.forEach((callback) => {
            callback();
        });
        WAITING_FOR_SCRIPTS = [];
    }
}