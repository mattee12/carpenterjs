/**
 *Generates a random string of the given length.
 *@param {number} length - The length of the string.
 *@returns {string} - The generated string.
 */
function createRandomString(length){
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpoqrstuvwxyz0123456789";

    let result = "";
    let charactersLength = characters.length;
    for(let i = 0; i < length; ++i){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}