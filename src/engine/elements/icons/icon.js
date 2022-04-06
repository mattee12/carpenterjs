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
        this.#loadAssets();
    }

    #loadAssets (){
        placeholder(e, p);
        super.#handleProperties(function(k){
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

        this.el = await elementFromUrl("https://mattee.net/" + ICON_PATH[this.type]);
        this.#deploy();
    }
}
