var REGISTERED_ELEMENTS = [];
var WAITING_FOR_ELEMENTS = [];

loadScripts([
    "engine/elements/icons/icon",
    "engine/elements/dialog/dialog"
]);

var elementTypes = [
    "calendar",
    "dialog_alert"
];

function handleElements(){
    var styleElement = document.createElement("link")
    styleElement.rel = "stylesheet";
    styleElement.href = "https://mattee.net/assets/css/carpenter.css?version=" + createRandomString(10);
    document.head.appendChild(styleElement);

    var elements = listTree(document);
    elements.forEach((e) => {
        var list = e.classList;
        var props = {"type": list[0]};
        list.forEach((s, i) => {
            if(i == 0) return;
            var splitS = s.split("=");
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
    if(p["type"].split("-")[0] == "icon"){
        var el = new Icon(e, p);
        await el.deploy();
        REGISTERED_ELEMENTS.pop();
    } else{
        switch(p["type"]){
            case "calendar":
                loadCalendar(e);
                break;
            default:
                console.log("Invalid type: " + p["type"]);
                break;
        }
    }
    if(REGISTERED_ELEMENTS.length == 0){
        WAITING_FOR_ELEMENTS.forEach((callback) => {
            callback();
        })
    }
}

function placeholder(e, p){
    return new Promise(resolve => {
        if((p["width"] != null || p["w"] != null) && (p["height"] != null || p["h"] != null)){
            if(p["width"] != null){applyStyle(e, {"width": p["width"]});}
            else{applyStyle(e, {"width": p["w"]});}
            if(p["height"] != null){applyStyle(e, {"height": p["height"]});}
            else{applyStyle(e, {"height": p["h"]});}
            var pE = document.createElement("img");
            pE.src = "assets/icons/loading_white.svg";
            applyStyle(pE, {"animation": "spin 1s ease-in-out infinite", "width": "100%", "height": "100%"});
            e.appendChild(pE);
        }
        resolve(true);
    });
}

var counter = 0;

function listTree(e){
    if(e.children == null || e.children.length == 0){
        return null;
    }
    var list = [];
    for(var i = 0; i < e.children.length; ++i){
        counter++;
        var el = e.children[i];
        var lt = listTree(el);
        if(lt != null && lt.length != 0){
            list = list.concat(lt);
        }
        if(el.classList != null &&
        el.classList.length != 0 &&
        (elementTypes.includes(el.classList[0]) ||
        (el.classList[0].split("-") != undefined) && el.classList[0].split("-")[0] == "icon")){
            list.push(el);
        }
    }
    return list;
}