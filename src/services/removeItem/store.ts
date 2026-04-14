import { ElMessage, ElMessageBox } from 'element-plus'
import { RemoveItemModel, RemovePhoneItemModel, removeItem_API, removePhoneItem_API } from './index'

export function OPEN_REMOVE_MODAL(payload: RemoveItemModel | RemovePhoneItemModel, isPhone = false) {
  const title = payload.title || 'Are you sure you want to delete the selected item?'
  ElMessageBox.confirm(title, 'Warning', {
    confirmButtonText: 'YES',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(async () => {
      const [error] = !isPhone
        ? await removeItem_API(payload.id as number[], payload.url)
        : await removePhoneItem_API(payload.id as string[], payload.url)

      if (error) {
        ElMessage.error('Something went wrong')
        return
      }

      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })

      payload.callback()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
