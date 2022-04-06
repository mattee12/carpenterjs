class Element {
    constructor(e, p){
        this.e = e;
        this.p = p;
        this.type = p["type"];
        this.#handleProperties();
    }

    #handleProperties(cb){
        delete this.p["type"];
        Object.keys(this.p).forEach((k) => {
            switch(k){
                case "w":
                case "width":
                    applyStyle(this.e, {"width": this.p[k]});
                    break;
                case "h":
                case "height":
                    applyStyle(this.e, {"height": this.p[k]});
                    break;
                case "fadein":
                    applyStyle(this.e, {"animation": "fadein .25s linear"});
                    break;
            }
            if(cb != undefined){
                cb(k);
            }
        });
    }

    #deploy(el){
        mergeStyle(el, this.e);
        this.e.parentElement.replaceChild(el, this.e);
    }
}