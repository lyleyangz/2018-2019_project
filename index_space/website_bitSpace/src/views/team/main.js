import Vue from 'vue'
import '@common/filter'
import App from './App'
import utils from '@common/utils'
// import iview from 'iview'
// 样式引入
import '@common/assets/styles/reset.scss'
import '@common/styles/global.scss'  
// import '@common/assets/styles/iviewTheme/index.less'                                     
Vue.prototype.globalFun = utils;
// Vue.use(iview);
new Vue({
  el: '#app',
  render: h => h(App)
})
