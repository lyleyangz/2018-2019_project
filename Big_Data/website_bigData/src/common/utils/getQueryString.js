

/**
 * 截取url参数
 */
function getQueryString(name) {
    // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // var r = window.location.search.substr(1).match(reg);
    // if (r != null) return unescape(r[2]); return null;
    let url = (window.location.hash);
    if(url.includes(name)){
       return url.split("=")[1];
    }else{
        return ""
    }  
}
export default getQueryString;