//Init CarpenterJS after the document is loaded.
window.onload = function() {
    //Loading the import module.
    var importModuleTag = document.createElement('script');
    importModuleTag.src = './core/import.js';
    importModuleTag.onload = function(){
        loadScript("scripts/init.js");
    }
    document.head.appendChild(importModuleTag);
};