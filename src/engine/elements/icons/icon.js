var ICON_PATH = {
    "icon-change": "assets/icons/change.svg",
    "icon-distance": "assets/icons/distance.svg"
}
class Icon{
    constructor(e, p){
        this.e = e;
        this.p = p;
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
                    case "color2":
                        applyStyle(el.querySelector("#" + k), {"fill": this.p[k]});
                        break;
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
