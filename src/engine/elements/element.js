class Element {
    constructor(e, p){
        this.e = e;
        this.p = p;
        this.type = p["type"];
        this.#handleProperties();
    }

    #handleProperties(){
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
                case "fadein":
                    applyStyle(el, {"animation": "fadein .25s linear"});
                    break;
            }
        });
    }
}