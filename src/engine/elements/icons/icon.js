var ICON_PATH = {}
var ICON_TYPES = [
    "icon-change",
    "icon-tick",
    "icon-distance",
    "icon-cross",
]

ICON_TYPES.forEach((type) => {
    ICON_PATH[type] = "assets/icons/" + type.split("-")[1] + ".svg";
});

class Icon{
    constructor(e, p){
        this.e = e;
        this.p = p;
        this.type = p["type"];
    }
    deploy(){
        return new Promise(async resolve => {
            var el = await elementFromUrl("https://mattee.net/" + ICON_PATH[this.p["type"]]);
            delete this.p["type"];
            Object.keys(this.p).forEach((k) => {
                switch(k){
                    case "w":
                    case "width":
                        applyStyle(el, {"width": this.p[k]});
                        break;
                    case "h":
                    case "height":
                        applyStyle(el, {"height": this.p[k]});
                        break;
                    case "color1":
                    case "color2": {
                        var colorElem = el.querySelector("#" + k);
                        if(colorElem != null){
                            colorElem.style.fill = this.p[k];
                            break;
                        }
                        debugPrint("Could not find " + k + " for " + this.type);
                        break;
                    }
                    case "fadein":
                        applyStyle(el, {"animation": "fadein .25s linear"});
                        break;
                    default:
                        console.log("Invalid property for " + this.p["type"] + ": " + k);
                        break;
                }
            });
            this.e.parentElement.replaceChild(el, this.e);
            resolve(true);
        });
    }
}
