let check = {};

check.password = function(val){
    var r=/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,20}$/;
    return r.test(val);
}
check.email = function(val){
    var r=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return r.test(val);
}
module.exports = check;