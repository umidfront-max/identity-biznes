import { gp } from '/@vab/plugins/vab'

function clipboardSuccess(text: any) {
  gp.$baseMessage(`Copied ${text} successfully`, 'success', 'hey')
}

function clipboardError(text: any) {
  gp.$baseMessage(`Copying ${text} failed`, 'error', 'hey')
}

/**
 * @description Copy data
 * @param text
 */
export default function handleClipboard(text: string) {
  const { isSupported, copy } = useClipboard()
  if (!isSupported) {
    usePermission('clipboard-write')
  }
  copy(text)
    .then(() => {
      clipboardSuccess(text)
    })
    .catch(() => {
      clipboardError(text)
    })
}
