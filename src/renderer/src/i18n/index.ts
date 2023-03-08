import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    plzSetApi: '请设置Api Key',
    alert: {
      hint: '提示',
      cancel: '取消',
      return: '确定'
    }
  },
  en: {
    plzSetApi: 'please set Api Key',
    alert: {
      hint: 'hint',
      cancel: 'Cancel',
      return: 'Confirm'
    }
  }
}

const i18n = createI18n({
  locale: navigator.language.substring(0, 2),
  fallbackLocale: 'en',
  messages
})

export default i18n
