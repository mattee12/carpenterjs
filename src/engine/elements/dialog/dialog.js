loadScripts([
    "engine/elements/dialog/datepicker",
    "engine/elements/dialog/alert",
    "engine/elements/dialog/yesno"
]);

var DIALOG = document.createElement("div");
DIALOG.classList.add("dialog", "closed");
var BACKDROP = document.createElement("div");
var DIALOG_QUEUE = [];
registerWaitingForLoad(function(){
    document.body.appendChild(DIALOG);
    document.body.appendChild(BACKDROP);
    applyStyle(BACKDROP, {"z-index": "99", "opacity": "0", "visibility": "hidden", "background-color": "rgba(0, 0, 0, 0.35)", "width": "100vw", "height": "100vh", "position": "fixed", "transition": "opacity .2s, visibility .2s"});
});

class Dialog extends Element{
    constructor(){
        super(DIALOG, {});
    }
}