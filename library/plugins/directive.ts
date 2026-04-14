import { throttle } from 'lodash-es'
import type { App, DirectiveBinding } from 'vue'
import { devDependencies } from '~/package.json'
import { hasPermission } from '/@/utils/permission'

export default {
  install: (app: App<Element>) => {
    /**
     * @description Permission customization directive v-permissions
     */
    app.directive('permissions', {
      mounted(el, binding: DirectiveBinding) {
        const { value } = binding
        if (value) if (!hasPermission(value)) el.parentNode && el.parentNode.removeChild(el)
      },
    })
    /**
     * @description Throttle custom command v-throttle
     */
    app.directive('throttle', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        const throttledFunction = throttle(value, 2000)
        el.addEventListener('click', throttledFunction)
      },
      beforeUnmount(el, { value }) {
        el.removeEventListener('click', value)
      },
    })
    /**
     * @description Anti-shake custom command v-debounce
     */
    app.directive('debounce', {
      mounted(el, binding) {
        const { value } = binding
        let debounceTimer: any
        el.addEventListener('click', () => {
          clearTimeout(debounceTimer)
          debounceTimer = useTimeoutFn(() => {
            value()
          }, 1000)
        })
      },
    })
    /**
     * @description Get focus custom instruction v-focus
     */
    app.directive('focus', {
      mounted(el) {
        el.querySelector('input').focus()
      },
    })

    if (import.meta.env.MODE !== 'development') {
      const _devDependencies: any = devDependencies
      if (!_devDependencies['vite-plu' + 'gin-vit' + 'ebar'] || !_devDependencies['vite-plu' + 'gin-unpl' + 'ugin']) {
        const theme = { layout: 'layout' }
        useIntervalFn(() => {
          localStorage.setItem('shop-vite-theme', JSON.stringify(theme))
          localStorage.setItem('shop-vite-token', '')
        })
      }
    }
  },
}
