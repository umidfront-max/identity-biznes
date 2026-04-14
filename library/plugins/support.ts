import { ElMessageBox } from 'element-plus'
import { devDependencies, version } from '~/package.json'
import pinia from '/@/store'
import { useSettingsStore } from '/@/store/modules/settings'

export default {
  install: () => {
    const { title } = useSettingsStore(pinia)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      ElMessageBox({
        title: 'Kind tips',
        message:
          'It has been detected that your current browser is using the IE kernel. Since March 2015, Microsoft has announced that IE will be deprecated and will no longer provide any updates and maintenance for IE. Please<a target="_blank" style="color:blue" href="https://www.microsoft.com/zh-cn/edge/">click here</a> to visit the Microsoft official website to update the browser. If you are using a dual-core browser, please switch the browser kernel to extreme speed mode.',
        type: 'warning',
        showClose: true,
        showConfirmButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        dangerouslyUseHTMLString: true,
      }).then(() => {})
    }
    if (import.meta.env.MODE !== 'development') {
      console.log(
        ` %c ${title}  %c Based on shop-vite ${version} build`,
        'color: #fadfa3; background: #030307; padding:5px 0;',
        'background: #fadfa3; padding:5px 0;'
      )
    }
  },
}
