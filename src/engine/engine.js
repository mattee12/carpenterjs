var REGISTERED_ELEMENTS = [];
var WAITING_FOR_ELEMENTS = [];

loadScripts([
    "util/style",
    "engine/elements/element",
    "engine/elements/icons/icon",
    "engine/elements/dialog/dialog"
]);

var elementTypes = [
    "i", "icon",
    "dp", "datepicker",
    "dialog",
];

registerWaitingForLoad(() => {
    var styleElement = document.createElement("link")
    styleElement.rel = "stylesheet";
    styleElement.href = "https://mattee.net/assets/carpenter/css/carpenter.css?version=" + createRandomString(10);
    document.head.appendChild(styleElement);
    handleElements();
    document.addEventListener("DOMSubtreeModified", function cb(){
        document.removeEventListener("DOMSubtreeModified", cb);
        handleElements();
    });
});

function handleElements(){
    var elements = listTree(document);
    elements.forEach((e) => {
        var list = e.classList;
        var props = {"type": list[0]};
        list.forEach((s, i) => {
            if(i == 0) return;
            var splitS = s.split("-");
            if(splitS.length == 2){
                var splitKey = splitS[0].split(",");
                if(splitKey.length > 0){
                    splitKey.forEach((k) => {
                        props[k] = splitS[1];
                    });
                    return;
                }
                props[splitS[0]] = splitS[1];
                return;
            }
            props[s] = "";
        });
        handleElement(e, props);
    });
    return elements;
}

async function handleElement(e, p){
    await placeholder(e, p);
    const type = p["type"].split("-")[1] ? p["type"].split("-")[0] : p["type"];
    switch(type){
        case "i":
        case "icon": {
            const el = new Icon();
            el.setProperties(p);
            await el.deploy(e);
            REGISTERED_ELEMENTS.pop();
            break;
        }
        case "dp":
        case "datepicker": {
            const el = new DatePicker();
            el.setProperties(p);
            await el.deploy(e);
            REGISTERED_ELEMENTS.pop();
            break;
        }
        default:
            console.log("Invalid type: " + p["type"]);
            break;
    }
    if(REGISTERED_ELEMENTS.length == 0){
        document.addEventListener("DOMSubtreeModified", function cb(){
            document.removeEventListener("DOMSubtreeModified", cb);
            handleElements();
        });
        WAITING_FOR_ELEMENTS.forEach((callback) => {
            callback();
        })
    }
}

function placeholder(e, p){
    return new Promise(resolve => {
        if((p["width"] || p["w"]) && (p["height"] || p["h"])){
            if(p["width"]){applyStyle(e, {"width": p["width"]});}
            else{applyStyle(e, {"width": p["w"]});}
            if(p["height"]){applyStyle(e, {"height": p["height"]});}
            else{applyStyle(e, {"height": p["h"]});}
            var pE = document.createElement("img");
            pE.src = "https://mattee.net/assets/icons/loading.svg";
            applyStyle(pE, {"animation": "spin 1s ease-in-out infinite", "width": "100%", "height": "100%"});
            e.appendChild(pE);
        }
        resolve(true);
    });
}

function listTree(e){
    if(e.children == null || e.children.length == 0){
        return null;
    }
    var list = [];
    for(var i = 0; i < e.children.length; ++i){
        var el = e.children[i];
        var lt = listTree(el);
        if(lt != null && lt.length != 0){
            list = list.concat(lt);
        }
        if(el.classList && el.classList.length != 0 &&
        (elementTypes.includes(el.classList[0].split('-')[1] ? el.classList[0].split('-')[0] : el.classList[0]))){
            list.push(el);
        }
    }
    return list;
}