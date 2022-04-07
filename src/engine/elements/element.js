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
                    applyStyle(this.e, {"width": p[k]});
                    break;
                case "h":
                case "height":
                    applyStyle(this.e, {"height": p[k]});
                    break;
                case "fadein":
                    applyStyle(this.e, {"animation": "fadein .25s linear"});
                    break;
            }
        });
    }
}