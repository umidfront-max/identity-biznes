import App from './App.vue'

import VueMask from '@devindex/vue-mask'
import ElementPlus from 'element-plus'
import { setupVab } from '~/library'
import { i18n } from '/@/i18n'
import { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
const app = createApp(App)
app.use(ElementPlus).use(i18n).use(VueMask)

setupVab(app)
// setupI18n(app)
setupStore(app)
setupRouter(app)
  .isReady()
  .then(() => app.mount('#app'))

export default app
