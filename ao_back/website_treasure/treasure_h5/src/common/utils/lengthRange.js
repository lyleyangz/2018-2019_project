function lengthRange(str,min,max) {
    if(str.length<min || str.length>max){
        return true;
    }
    return false;
}
export default lengthRange;