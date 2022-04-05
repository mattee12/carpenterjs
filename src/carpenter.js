//Init CarpenterJS after the document is loaded.
window.onload = function() {
    //Loading the import module.
    var importModuleTag = document.createElement('script');
    importModuleTag.src = 'https://mattee.net/scripts/carpenterjs/core/import.js';
    importModuleTag.onload = async function(){
        await loadScript("util/strings");
        loadScript("scripts/init.js?version=" + createRandomString(10));
    }
    document.head.appendChild(importModuleTag);
};