import http from './fetch.js';

// 系统参数列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/listadmin',
        method: 'post',
        params: params
    });
}

// 增加
export function addParam (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/addparam',
        method: 'post',
        params: params
    });
}

// 编辑
export function editParam (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/editparam',
        method: 'post',
        params: params
    });
}

// 详情
export function singleParams (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/single',
        method: 'get',
        params: params
    });
}

// 删除
export function delParam (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/del',
        method: 'get',
        params: params
    });
}

// token配置列表
export function scoreList (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig',
        method: 'get',
        params: params
    });
}

// 配置详情
export function scoreDetail (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig/id',
        method: 'get',
        params: params
    });
}

export function updateScore (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig',
        method: 'patch',
        params: params
    });
}
export function addScore (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig',
        method: 'post',
        params: params
    });
}
export function updateStatus (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig/status',
        method: 'patch',
        params: params
    });
}

// /******************************token矿池*********************************************/

// 
export function addToken (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/addTotalPoolsNumber',
        method: 'post',
        params: params
    });
}
// 
export function searchIdToken (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/getInfoById',
        method: 'get',
        params: params
    });
}
// 
export function searchCodeToken (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/getInfoByCode',
        method: 'get',
        params: params
    });
}
// 
export function tokenList (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/queryHistoryPageList',
        method: 'get',
        params: params
    });
}
// 
export function updateTokenWorth (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/update',
        method: 'post',
        params: params
    });
}
// 
export function getTokentotalNumber (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/getTotalNum',
        method: 'get',
        params: params
    });
}
// /*******************************************************************************/

/**********************************手续费设置*************************************************/ 

// 
export function costList (params = {}) {
    return http({
        url: '/service/app/v1/admin/poundage/listadmin',
        method: 'post',
        params: params
    });
}
export function addCost (params = {}) {
    return http({
        url: '/service/app/v1/admin/poundage/addpoundage',
        method: 'post',
        params: params
    });
}
export function updateCost (params = {}) {
    return http({
        url: '/service/app/v1/admin/poundage/editpoundage',
        method: 'post',
        params: params
    });
}
// /*******************************************************************************/


/**********************************系统token奖励设置*************************************************/ 


export function sysmTokenList (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/queryPageList',
        method: 'get',
        params: params
    });
}
export function intoToken (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/addPoolsNumber',
        method: 'post',
        params: params
    });
}
export function editToken (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/pools/batchUpdateScorePools',
        method: 'post',
        params: params
    });
}