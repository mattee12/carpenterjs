class AlertDialog{
    di = true;
    cb = null;
    type(ty){
        switch(ty){
            case "warning":
                this.ty = "https://mattee.net/freight/assets/icons/alert.svg";
                break;
            case "success":
                this.ty = "https://mattee.net/freight/assets/icons/tick.svg";
                break;
            case "error":
                this.ty = "https://mattee.net/freight/assets/icons/cross.svg";
                break;
            default:
                this.ty = "";
                break;
        }
        return this;
    }
    text(te){
        this.te = te;
        return this;
    }
    dismissable(di){
        this.di = di;
        return this;
    }
    callback(cb){
        this.cb = cb;
        return this;
    }
    deploy(){
        var thisObj = this;
        if(!DIALOG_QUEUE.includes(this)){DIALOG_QUEUE.push(this);}
        if(DIALOG_QUEUE[0] == this){
            DIALOG.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; flex: 2;">
                <img src="` + this.ty + `" style="width: 64px; height: 64px;">
            </div>
            <div id="textWrapper" style="display: flex; justify-content: center; align-items: center; flex: 1;">
                <p style="font-family: Roboto Regular; font-size: 24px; overflow-wrap: break-word; text-align: center; padding: 0px 16px;">` + this.te + `</p>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; flex: 2;">
                <p id="DONE" style="margin: 0; cursor: pointer; font-family: Roboto Regular; font-size: 28px; padding: 8px 24px; border-radius: 12px; color: white; background-color: black;">OK</p>
            </div>`;
            DIALOG.classList.replace("closed", "open");
            var done = DIALOG.querySelector("#DONE");
            var close = function(){
                applyStyle(BACKDROP, {"visibility": "hidden", "opacity": "0"});
                DIALOG.classList.replace("open", "closed");
                done.removeEventListener("click", close);
                if(thisObj.cb != null){thisObj.cb();}
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
            done.addEventListener("click", close);
            if(thisObj.di == false && thisObj.cb == null){
                done.style["opacity"] = 0.5;
                applyStyle(done, {"opacity": "0.2", "cursor": "default"});
                done.removeEventListener("click", close);
            }
            applyStyle(BACKDROP, {"visibility": "visible", "opacity": "1"});
        }
    }
}
