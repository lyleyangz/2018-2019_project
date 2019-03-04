
function phoneNumCheck(val){
    var check = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(check.test(val)){
        return false
    }else{
        return true
    }
}
export default phoneNumCheck;