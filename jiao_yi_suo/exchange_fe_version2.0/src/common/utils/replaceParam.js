function replaceParam(str,...params){
    console.log(params)
    for(var index in params){
        str = str.replace("{"+index+"}",params[index]);
    }
    return str;
}
export default replaceParam;