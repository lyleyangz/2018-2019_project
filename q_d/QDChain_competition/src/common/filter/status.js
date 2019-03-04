import Vue from 'vue'
import i18n from '@common/i18n';

Vue.filter('withdraw', function (value) {
    let mes = i18n.messages[localStorage.getItem('JYS_lang')].constant;
    var map = mes.withdraw;
    return map[value] || value;
})
Vue.filter('deposit', function (value) {
    let mes = i18n.messages[localStorage.getItem('JYS_lang')].constant;
    var map = mes.deposit;
    return map[value] || value;
})
Vue.filter('currencyName', function (value) {
    let mes = i18n.messages[localStorage.getItem('JYS_lang')].constant;
    var map = mes.currencyName;
    return map[value] || '';
})
Vue.filter('orderStatus', function (value) {
    let mes = i18n.messages[localStorage.getItem('JYS_lang')].constant;
    var map = mes.orderStatus;
    return map[value] || '';
})

Vue.filter('replaceI18N', function (value,name) {
    value = value.replace(/{d}/g, name);
    return value;
})

