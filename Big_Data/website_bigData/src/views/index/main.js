import Vue from 'vue'
import '@common/filter'
import App from './App'
import router from './router'
import utils from '@common/utils'
import iView from 'iview';
import i18n from '@common/i18n'
// import VueI18n from 'vue-i18n'
import apiGroup from "@api/api_group"

// Vue.use(VueI18n)

// 样式引入
import '@common/assets/styles/reset.scss'
import '@common/styles/global.scss'
import '@common/assets/styles/iviewTheme/index.less'


Vue.prototype.globalFun = utils;
Vue.prototype.apiGroup  = apiGroup
Vue.use(iView);
// Vue.use(VueI18n);

// const i18n = new VueI18n({
//   locale: 'ZHS', // 语言标识
//   messages: {
//     'ZHS': require('@common/i18n/lang/ZHS'),
//     'ENG': require('@common/i18n/lang/ENG'),
//   }
// })
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

new Vue({
  el: '#app',
  router,
  i18n,
  // apiGroup, 
  render: h => h(App)
})