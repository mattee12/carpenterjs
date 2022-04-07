const ICON_TYPES = [
    "change",
    "tick",
    "distance",
    "cross",
]

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

    #setType(p){
        this.type.includes('-') ? this.type = this.type.split('-')[1]: null;
        if(!ICON_TYPES.includes(this.type)) depugPrint("Invalid icon type: " + this.type);
    }

    #handleProperties(p){
        this.#setType(p);
        Object.keys(p).forEach((k) => {
            switch(k){
                case "c1":
                case "color1":
                case "c2":
                case "color2": {
                    k = k == "c1" ? "color1" : k == "c2" ? "color2" : k; 
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
        var el = await elementFromUrl("https://mattee.net/assets/icons/" + this.type + ".svg");
        super.deploy(el);
        if(this.p) this.#handleProperties(this.p);
        e.parentElement.replaceChild(el, e);
   }
}