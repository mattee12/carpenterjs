/**
 *A function to capitalize every even character in a string.
 *@param {string} string - The string to transform.
 *@returns {string} - The transformed string.
 */
function capitalizeEveryEvenCharacter(string){
    var result = "";
    for(var i = 0; i < string.length; i++){
        if(i % 2 == 0){
            result += string[i].toUpperCase();
        }else{
            result += string[i];
        }
    }
    return result;
}