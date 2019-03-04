import Vue from 'vue'
import '@common/filter'
import App from './App'
import router from './router'
import utils from '@common/utils'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@common/assets/js/flexible'
// 样式引入
import '@common/assets/styles/flexible.css'
import '@common/styles/global.scss'

Vue.use(MintUI)
Vue.prototype.globalFun = utils;
new Vue({
  el: '#app',
  router: router.routerGroup,
  render: h => h(App)
})
