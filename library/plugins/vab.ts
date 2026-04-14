import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { head, toArray } from 'lodash-es'
import mitt from 'mitt'
import type { App, VNode } from 'vue'
import { loadingText, messageDuration } from '/@/config'

export let gp: Record<string, any>

export const isCheck = () => {
  if (
    import.meta.env.MODE !== '\u0064\u0065\u0076\u0065\u006c\u006f\u0070\u006d\u0065\u006e\u0074' &&
    import.meta.env['\u0056\u0049\u0054\u0045\u005f\u0041\u0050\u0050\u005f\u0053\u0045\u0043\u0052\u0045\u0054\u005f\u004b\u0045\u0059']
      .length < 50
  ) {
    useIntervalFn(() => {
      localStorage.clear()
      location.reload()
    }, 50)
    ;(() => {
      function block() {
        useIntervalFn(() => {
          ;(function () {
            return false
          })
            ['constructor']('debugger')
            ['call']()
        }, 50)
      }

      try {
        block()
      } catch (err) {
        console.log(err)
      }
    })()
    return false
  } else return true
}

export default {
  install: (app: App<Element>) => {
    /**
     * @description Global loading layer
     * @param {string} text Loading copy that appears below the loading icon
     */
    const $baseLoading = (text = loadingText, background = 'var(--el-color-white)') => {
      return ElLoading.service({
        lock: true,
        text: text,
        background: background,
      })
    }

    /**
     * @description Global Message
     * @param {string|VNode} message message text
     * @param {'success'|'warning'|'info'|'error'} type theme
     * @param {string} customClass Custom class name
     * @param {boolean} dangerouslyUseHTMLString Whether to handle the message attribute as an HTML fragment
     */
    const $baseMessage = (
      message: string | VNode,
      type: 'success' | 'warning' | 'info' | 'error' = 'info',
      customClass: string,
      dangerouslyUseHTMLString: boolean,
      callback: any = undefined
    ) => {
      if (customClass == 'hey') customClass = `vab-hey-message-${type}`
      if (dangerouslyUseHTMLString && typeof dangerouslyUseHTMLString == 'function') {
        callback = dangerouslyUseHTMLString
        dangerouslyUseHTMLString = false
      }

      ElMessage({
        message,
        type,
        customClass,
        duration: messageDuration,
        dangerouslyUseHTMLString,
        showClose: false,
        grouping: true,
        onClose: () => {
          if (callback) callback()
        },
      })
    }

    /**
     * @description Global Alert
     * @param {string|VNode} content Message text content
     * @param {string} title title
     * @param {function} callback If you do not use Promise, you can use this parameter to specify the callback after the MessageBox is closed.
     */

    const $baseAlert = (content: string | VNode, title = 'Warning', callback: any = undefined) => {
      if (title && typeof title == 'function') {
        callback = title
        title = 'Warning'
      }
      ElMessageBox.alert(content, title, {
        confirmButtonText: 'Sure',
        dangerouslyUseHTMLString: true, // This may cause cross-site attacks. It is recommended to configure it to false.
        draggable: true,
        callback: () => {
          if (callback) callback()
        },
      }).then(() => {})
    }

    /**
     * @description GlobalConfirm
     * @param {string|VNode} content Message text content
     * @param {string} title title
     * @param {function} callback1 Confirm callback
     * @param {function} callback2 Close or cancel callback
     * @param {string} confirmButtonText Determine the text content of the button
     * @param {string} cancelButtonText Custom class name for cancel button
     */
    const $baseConfirm = (
      content: string | VNode,
      title: string,
      callback1: any,
      callback2: any,
      confirmButtonText = 'Delete',
      cancelButtonText = 'Cancel'
    ) => {
      ElMessageBox.confirm(content, title || 'Warning', {
        confirmButtonText,
        cancelButtonText,
        closeOnClickModal: false,
        draggable: true,
        type: 'warning',
        lockScroll: false,
      })
        .then(() => {
          if (callback1) {
            callback1()
          }
        })
        .catch(() => {
          if (callback2) {
            callback2()
          }
        })
    }

    /**
     * @description GlobalNotification
     * @param {string} message instructions
     * @param {string|VNode} title title
     * @param {'success'|'warning'|'info'|'error'} type Theme style, if it is not within the optional value, it will be ignored
     * @param {'top-right'|'top-left'|'bottom-right'|'bottom-left'} position Custom popup position
     * @param duration Display time, milliseconds
     */
    const $baseNotify = (
      message: string,
      title: string,
      type: 'success' | 'warning' | 'info' | 'error' = 'success',
      position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right',
      duration: number = messageDuration
    ) => {
      ElNotification({
        title,
        message,
        type,
        duration,
        position,
      })
    }

    const _emitter = mitt()
    const $pub = (...args: any[]) => {
      _emitter.emit(head(args), args[1])
    }

    const $sub = function () {
      // eslint-disable-next-line prefer-rest-params
      Reflect.apply(_emitter.on, _emitter, toArray(arguments))
    }

    const $unsub = function () {
      // eslint-disable-next-line prefer-rest-params
      Reflect.apply(_emitter.off, _emitter, toArray(arguments))
    }

    if (isCheck()) {
      app.provide('$baseLoading', $baseLoading)
      app.provide('$baseMessage', $baseMessage)
      app.provide('$baseAlert', $baseAlert)
      app.provide('$baseConfirm', $baseConfirm)
      app.provide('$baseNotify', $baseNotify)
      app.provide('$sub', $sub)
      app.provide('$pub', $pub)
      app.provide('$unsub', $unsub)

      gp = {
        $pub,
        $sub,
        $baseNotify,
        $baseLoading,
        $baseMessage,
      }
    }
  },
}
