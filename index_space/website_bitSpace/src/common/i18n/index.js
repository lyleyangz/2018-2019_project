import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLang } from '@common/utils/lang'

import ENG from './lang/ENG'
import ZHS from './lang/ZHS'

Vue.use(VueI18n)
const _locale = getLang() || 'zh-CN'
const i18n = new VueI18n({
  locale: _locale,
  messages: {
    'en-US': ENG,
    'zh-CN': ZHS
  }
})

export default i18n
