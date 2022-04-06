/**
 * Apply CSS properties to an element.
 * @param {HtmlElement} element - The element to apply the style to. 
 * @param {Object} style - The style to apply.
 * 
 * Example:
 * applyStyle(element, {"margin-top": "0px", "width": "100px"});
 */
function applyStyle(e, s){
    for(se in s) {
        var ss = "";
        var isDash = false;
        for(ch of se) {
            if(ch == "-"){
                isDash = true;
            } else{
                if(isDash){
                    ss += ch.toUpperCase();
                    isDash = false;
                } else{
                    ss += ch;
                }
            }
        }
        e.style[ss] = s[se];
    }
}

/**
 * Merge the CSS properties of the source element into the target element.
 * @param {HtmlElement} target 
 * @param {HtmlElement} source 
 */
function mergeStyle(target, source){
    for(var i = 0; i < source.style.length; i++){
        var property = source.style[i];
        var value = source.style[property];
        target.style[property] = value;
    }
}