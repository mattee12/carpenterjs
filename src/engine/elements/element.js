class Element {
    constructor(){
        this.type = "element";
        this.e = document.createElement("div");
    }

    deploy(e){
        mergeStyle(e, this.e);
    }

    /**
     * Sets the given properties on the element.
     * @param {object} properties 
     */
    setProperties(p){
        this.#handleProperties(p);
    }

    #handleProperties(p){
        this.type = p["type"];
        delete p["type"];
        Object.keys(p).forEach((k) => {
            switch(k){
                case "w":
                case "width":
                case "h":
                case "height": {
                    k = k == "w" ? "width" : k == "h" ? "height" : k;
                    console.log(k);
                    applyStyle(this.e, {[k]: p[k]});
                    break;
                }
                case "fadein":
                    applyStyle(this.e, {"animation": "fadein .25s linear"});
                    break;
            }
        });
    }
}