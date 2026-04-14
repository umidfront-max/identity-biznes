import enLocale from 'element-plus/dist/locale/en'
import ruLocale from 'element-plus/dist/locale/ru'
import { createI18n } from 'vue-i18n'
import en from './en/index'
import pinia from '/@/store'

import ru from './ru/index'
import uz from './uz/index'

import { useSettingsStore } from '/@/store/modules/settings.ts'
import { LanguageType } from '/@/store/modules/types.ts'

export { enLocale, ruLocale }

const messages: Record<LanguageType, any> = {
  en,
  uz,
  ru,
}

const getLanguage = () => {
  const { getLanguage } = useSettingsStore(pinia)
  return getLanguage
}

export const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  fallbackLocale: 'ru',
  messages,
})

export const translate = (message: string | undefined) => {
  if (!message) return ''
  return [getLanguage(), 'vabI18n', message].reduce((o, k) => (o || {})[k], messages as any) || message
}
