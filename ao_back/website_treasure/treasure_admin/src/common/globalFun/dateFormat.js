
function dateFormat(date, format){
    if(!date){
        return '';
    }
    if (/\d{13}/.test(date)) { date = date - 0 }
    else if (/\d{10}/.test(date)) { date = date*1000 };
    var dateObj = new Date(date);
    var o = {
        "M+" : dateObj.getMonth()+1, //month
        "d+" : dateObj.getDate(),    //day
        "h+" : dateObj.getHours(),   //hour
        "m+" : dateObj.getMinutes(), //minute
        "s+" : dateObj.getSeconds(), //second
        "q+" : Math.floor((dateObj.getMonth()+3)/3),  //quarter
        "S" : dateObj.getMilliseconds() //millisecond
    };
   
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (dateObj.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o){
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
    }
    return format;
}
export default dateFormat;