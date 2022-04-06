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

class Icon extends Element{
    constructor(e, p){
        super(e, p);
        this.#deploy();
    }

    #deploy(){
        return new Promise(async resolve => {
            var el = await elementFromUrl("https://mattee.net/" + ICON_PATH[this.type]);
            Object.keys(this.p).forEach((k) => {
                switch(k){
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
                }
            });
            mergeStyle(el, this.e);
            this.e.parentElement.replaceChild(el, this.e);
            resolve(true);
        });
   }
}
