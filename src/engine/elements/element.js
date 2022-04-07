class Element {
    constructor(){
        this.type = "element";
        this.e = document.createElement("div");
    }

    deploy(e){
        mergeStyle(e, this.e);
        this.e = e;
    }

    /**
     * Sets the given properties on the element.
     * @param {object} properties 
     */
    setProperties(p){
        this.#handleProperties(p);
    }

    #handleProperties(p){
        if(p["type"]) this.type = p["type"]; delete p["type"];
        Object.keys(p).forEach((k) => {
            switch(k){
                case "w":
                case "width":
                case "h":
                case "height": {
                    const k_long = k == "w" ? "width" : k == "h" ? "height" : k;
                    const size =
                    p[k] == "xs" ? "16px" :
                    p[k] == "xs2" ? "24px" :
                    p[k] == "sm" ? "32px" :
                    p[k] == "sm2" ? "48px" :
                    p[k] == "md" ? "64px" :
                    p[k] == "md2" ? "128px" :
                    p[k] == "lg" ? "256px" :
                    p[k] == "lg2" ? "320px" :
                    p[k] == "xl" ? "480px" : null;
                    applyStyle(this.e, {[k_long]: size ? size : p[k]});
                    break;
                }
                case "fadein":
                    applyStyle(this.e, {"animation": "fadein .25s linear"});
                    break;
            }
        });
    }
}