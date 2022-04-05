var REGISTERED_SCRIPTS = [];

/**
 *Load a single script.
 *@param {string} path - The path to the script.
 *@returns {Promise<boolean>} - Returns true if the script was loaded successfully.
 */
function loadScript(path){
    var scriptTag = document.createElement('script');
    scriptTag.src = path;
    scriptTag.async = false;
    document.head.appendChild(scriptTag);
    return new Promise(resolve => {
        s.onerror = function(){
            s.onload = null;
            resolve(false);
        }
        s.onload = function(){
            s.onerror = null;

            //Remove module from REGISTERED_SCRIPTS.
            var index = REGISTERED_SCRIPTS.indexOf(path);
            if(index > -1){
                REGISTERED_SCRIPTS.splice(index, 1);
            }

            resolve(true);
        }
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
        var result = await loadScript("https://mattee.net/scripts/carpenterjs/" + e.toString() + ".js");
        if(!result){
            result = await loadScript("scripts/" + e.toString() + ".js");
            if(!result){console.log("Failed to load " + e.toString()); errorCount++;}
        }
        console.log("loaded " + e);
    }
    if(REGISTERED_SCRIPTS.length == 0){
        console.log("all scripts loaded successfully.");
        WAITING_FOR_SCRIPTS.forEach((callback) => {
            callback();
        });
    }
}