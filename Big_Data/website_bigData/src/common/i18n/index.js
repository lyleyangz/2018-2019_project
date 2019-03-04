import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import { getLang } from '@common/utils/lang'

import ENG from './lang/ENG'
import ZHS from './lang/ZHS'
import ZHF from './lang/ZHF'


Vue.use(VueI18n)
// const _locale = getLang() || 'zh-CN'
const i18n = new VueI18n({
  locale: localStorage.getItem("locale")  || 'ZHS', // 语言标识
  messages: {
    'ENG': ENG,
    'ZHS': ZHS,
    'ZHF': ZHF
  }
})


export default i18n
