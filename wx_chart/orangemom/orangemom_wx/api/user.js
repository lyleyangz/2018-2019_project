const request = require('./request.js');
const user = {};
user.getOpenId = function (params = {}){
    return request({
        url: '/api/portal/user/getOpenId',
        method: 'post',
        params: params
    },'https://xcx.lingane-sport.com');
}
user.add = function (params = {}) {
    return request({
        url: 'json/smallProgram/admin/addUser',
        method: 'post',
        params: params
    });
}

module.exports = user;