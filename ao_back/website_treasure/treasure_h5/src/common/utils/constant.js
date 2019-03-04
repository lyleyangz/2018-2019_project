var constant = {}
const BORROWUNIT = {"1":"天","2":"月","3":"年"}
constant.borrowUnit = function(val){
    return BORROWUNIT[val] || '';
}

module.exports = constant;  