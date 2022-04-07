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
    constructor(){
        super();
        this.type = "icon";
    }

    /**
     * Sets the given properties on the element.
     * @param {object} properties 
     */
    setProperties(p){
        super.setProperties(p);
        this.p = p;
    }

    #handleProperties(p){
        Object.keys(p).forEach((k) => {
            switch(k){
                case "color1":
                case "color2": {
                    let colorElem = this.e.querySelector("#" + k);
                    if(colorElem != null){
                        colorElem.style.fill = p[k];
                        break;
                    }
                    debugPrint("Could not find " + k + " for " + this.type);
                    break;
                }
            }
        });
    }

    /**
     * Deploys the element. This is an asynchronous function,
     * because it is loading an asset from the internet.
     * @param {HTMLElement} element - The element to deploy to.
     */
    async deploy(e){
        var el = await elementFromUrl("https://mattee.net/" + ICON_PATH[this.type]);
        mergeStyle(el, this.e);
        if(this.p) this.#handleProperties(this.p);
        e.parentElement.replaceChild(el, e);
   }
}