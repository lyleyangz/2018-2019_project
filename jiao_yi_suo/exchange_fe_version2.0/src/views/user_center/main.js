import Vue from 'vue'
import '@common/filter'
import App from './App'
import router from './router/index.js'
import utils from '@common/utils'
import i18n from '@common/i18n';
// 样式引入
import '@common/assets/styles/reset.scss'
import '@common/styles/global.scss'
import '@common/assets/styles/iviewTheme/index.less'
import clipboard from 'clipboard';

Vue.prototype.clipboard = clipboard;
Vue.prototype.globalFun = utils;
new Vue({
  el: '#app',
  router:router.rountList,
  i18n,
  render: h => h(App)
})
