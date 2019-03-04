import Vue from 'vue'
import '@common/filter'
import App from './App'
import router from './router'
import utils from '@common/utils'
// 样式引入
import '@common/assets/styles/reset.scss'
import '@common/styles/global.scss'
import '@common/assets/styles/iviewTheme/index.less'

Vue.prototype.globalFun = utils;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
