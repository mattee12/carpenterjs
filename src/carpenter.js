//Init CarpenterJS after the document is loaded.
window.onload = function() {
    //Loading the import module.
    var importModuleTag = document.createElement('script');
    importModuleTag.src = 'https://mattee.net/scripts/carpenterjs/core/import.js?version=' + createRandomString(10);
    importModuleTag.onload = async function(){
        loadScripts([
            "engine/engine",
            "init",
        ]);
    }
    document.head.appendChild(importModuleTag);
};

/**
 *Generates a random string of the given length.
 *@param {number} length - The length of the string.
 *@returns {string} - The generated string.
 */
 function createRandomString(length){
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpoqrstuvwxyz0123456789";

    let result = "";
    let charactersLength = characters.length;
    for(let i = 0; i < length; ++i){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//DEFAULTS
var DEBUG_MODE = false;