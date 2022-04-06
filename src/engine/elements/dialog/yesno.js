class YesNoDialog extends Dialog{
    constructor(t, y, n){
        super();
        this.type = "dialog-yesno";
        this.t = t;
        this.y = y;
        this.n = n;
    }
    deploy(){
        if(!DIALOG_QUEUE.includes(this)){DIALOG_QUEUE.push(this);}
        if(DIALOG_QUEUE[0] == this){
            var thisObj = this;
            DIALOG.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; flex: 2;">
                <p style="font-family: Roboto Regular; font-size: 24px; overflow-wrap: break-word; text-align: center; padding: 0px 16px;">` + this.t + `</p>
            </div>
            <div style="display: flex; justify-content: space-evenly; align-items: center; flex: 1; flex-direction: row;">
                <p id="YES" style="margin: 0; cursor: pointer; font-family: Roboto Regular; font-size: 28px; padding: 8px 24px; border-radius: 12px; color: white; background-color: #34c759;">Igen</p>
                <p id="NO" style="margin: 0; cursor: pointer; font-family: Roboto Regular; font-size: 28px; padding: 8px 24px; border-radius: 12px; color: white; background-color: #ff3b30;">Nem</p>
            </div>`;
            applyStyle(BACKDROP, {"visibility": "visible", "opacity": "1"});
            DIALOG.classList.replace("closed", "open");
            var yesButton = DIALOG.querySelector("#YES");
            var yes = function(){
                if(thisObj.y != null){thisObj.y();}
                close();
            }
            var noButton = DIALOG.querySelector("#NO");
            var no = function(){
                if(thisObj.n != null){thisObj.n();}
                close();
            }
            var close = function(){
                applyStyle(BACKDROP, {"visibility": "hidden", "opacity": "0"});
                DIALOG.classList.replace("open", "closed");
                BACKDROP.removeEventListener("click", close);
                yesButton.removeEventListener("click", yes);
                noButton.removeEventListener("click", no);
                setTimeout(function(){
                    var tempArr = [];
                    DIALOG_QUEUE.forEach((dialog_e, i) => {
                        if(i != 0){
                            tempArr.push(dialog_e);
                        }
                    });
                    DIALOG_QUEUE = tempArr;
                    if(DIALOG_QUEUE.length > 0){DIALOG_QUEUE[0].deploy();}
                }, 200);
            }
            yesButton.addEventListener("click", yes);
            noButton.addEventListener("click", no);
            BACKDROP.addEventListener("click", close);
        }
    }
}