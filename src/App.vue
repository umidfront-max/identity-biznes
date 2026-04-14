<template>
  <vab-app />
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings.ts'
import { _PermissionsStore, _profileStore, getProfile_API } from '/@/services/profile'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'

defineOptions({
  name: 'App',
})

async function loadMyself() {
  const [error, response] = await getProfile_API()

  if (error) return
  console.log(response)

  _profileStore.value = response.data

  for (const key in _profileStore.value.permissions) {
    if (Object.prototype.hasOwnProperty.call(_profileStore.value.permissions, key)) {
      const element = _profileStore.value.permissions[key]

      _PermissionsStore.value.set(key as PERMISSION_ENUM, element)
    }
  }
}
loadMyself()

const settingsStore = useSettingsStore()
const { updateTheme, changeColor } = settingsStore

onBeforeMount(() => {
  changeColor()
  updateTheme()

  if (location.hostname === 'vue-admin-beautiful.com' || location.hostname === 'chu1204505056.gitee.io') {
    ;(() => {
      const block = () => {
        setInterval(() => {
          ;(function () {
            return false
          })
            ['constructor']('debugger')
            ['call']()
        }, 50)
      }

      try {
        console.error(
          'Debugging is prohibited at the demo address. If you need to debug the code, please contact customer service to purchase it.！'
        )
        block()
      } catch (err) {
        console.log(err)
      }
    })()
  }
})
</script>
