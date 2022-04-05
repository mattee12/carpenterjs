var REGISTERED_ELEMENTS = [];
var WAITING_FOR_ELEMENTS = [];

loadScripts([
    "engine/elements/icons/icon",
    "engine/elements/dialog/dialog"
]);

var elementTypes = [
    "icon-change",
    "icon-tick",
    "icon-cross",
    "icon-distance",
    "icon-ktrans",
    "calendar",
    "dialog_alert"
];

function handleElements(){
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
    //console.log("Our counter: " + counter);
    //console.log("Real: " + document.getElementsByTagName("*").length);
}

async function handleElement(e, p){
    //await placeholder(e, p);
    if(ICON_PATH[p["type"]] != null){
        var el = new Icon(e, p);
        await el.deploy();
        REGISTERED_ELEMENTS.pop();
    } else{
        switch(p["type"]){
            case "calendar":
                //TODO
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
        if(p["width"] != null && p["height"] != null){
            applyStyle(e, {"width": p["width"], "height": p["height"]});
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
        if(el.classList != null){
            if(elementTypes.includes(el.classList[0])){
                list.push(el);
            }
        }
    }
    return list;
}