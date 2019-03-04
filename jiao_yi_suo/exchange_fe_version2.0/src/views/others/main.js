import Vue from 'vue'
import '@common/filter'
import App from './App'
import router from './router'
import utils from '@common/utils'
import i18n from '@common/i18n';
// 样式引入
import '@common/assets/styles/reset.scss'
import '@common/styles/global.scss'
import '@common/assets/styles/iviewTheme/index.less'

Vue.prototype.globalFun = utils;

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
