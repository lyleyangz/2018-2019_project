const LOCAL_KEY = "save_localstorage_key";
const setItem = function(info={}){
    localStorage.setItem(LOCAL_KEY+info.name, JSON.stringify(info));
}
const getItem = function(info={}){
    return JSON.parse(localStorage.getItem(LOCAL_KEY+info.name));
}
const removeItem = function(info={}){
    localStorage.removeItem(LOCAL_KEY+info.name);
}
const removeAll = function(){
    localStorage.clear();
}
const localApi = {
    setItem,
    getItem,
    removeItem,
    removeAll
}
export default localApi;