<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
// Models
import UsersForm from '/@/models/dynamic-form-models/management/users.ts'
// import ChangePassword from '/@/views/profile/changePassword/index.vue'
// import ChangeThema from '/@/views/profile/changeTheme/index.vue'
// import MyInfo from '/@/views/profile/myInfo/index.vue'
// Components
import OwnLogs from './ownLogs/index.vue'
import { inject } from 'vue'
import { _profileStore } from '~/src/services/profile'
import VabChangePassword from '/@/components/views-components/VabChangePassword/index.vue'
import { themeConfig } from '/@/config/theme.config.ts'
import instance from '/@/utils/request.ts'
import VabThemeDrawer from '/src/components/views-components/VabTheme/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formModel = new UsersForm()

const formFields: { [key: string]: FieldType } = formModel.fields
const loading = ref(false)
const $baseMessage = inject<any>('$baseMessage')

delete formFields.password
delete formFields.password_confirmation

const userElTabs: ElTab[] = [
  { label: t('profile.tabs.my_info'), name: 'user_info' },
  { label: t('profile.tabs.change_password'), name: 'change_password' },
  { label: t('profile.tabs.change_theme'), name: 'change_theme' },
]

const setTheme = (them: any) => {
  if (!them) {
    formModel.store.$patch((state: any) => {
      state.theme = { ...themeConfig }
    })
  } else {
    formModel.store.$patch((state: any) => {
      state.theme = { ...them }
    })
  }
}

const updateTheme = () => {
  loading.value = true

  instance
    .post(`profile/change-theme`, formModel.store.theme)
    .then((res: any) => {
      if (res.success) {
        setTheme(res.data.template_theme)
        $baseMessage(t('profile.successfully_updated'), 'success', 'hey')
        loading.value = false
        location.reload()
      } else {
        $baseMessage(t('profile.sth_error'), 'warning', 'hey')
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const theme: any = computed({
  get: () => {
    return formModel.store.theme
  },
  set: (newValue) => {
    formModel.store.$patch({ theme: newValue })
  },
})

const userElTabsBottom: ElTab[] = [{ label: t('profile.tabs.my_devices'), name: 'user_info' }]
onMounted(() => {
  formModel.setFormData({ ..._profileStore.value })
  setTheme(_profileStore.value.template_theme)
})
</script>

<template>
  <div>
    <vab-profile :el-tabs="userElTabs" :el-tabs-bottom="userElTabsBottom">
      <template #el-tab-user_info>
        <vab-dynamic-form v-if="hasAccess(PERMISSION_ENUM.profile_edit)" :form-model="formModel" />
        <div>
          <!-- <p>{{formModel}}</p> -->
          <!-- <my-info v-if="hasAccess(PERMISSION_ENUM.profile_edit)" /> -->
        </div>
      </template>
      <template #el-tab-change_password>
        <vab-change-password v-if="hasAccess(PERMISSION_ENUM.profile_change_password)" endpoint="profile/change-password" />
        <!-- <change-password v-if="hasAccess(PERMISSION_ENUM.profile_change_password)" /> -->
      </template>
      <template #el-tab-change_theme>
        <vab-theme-drawer
          v-if="hasAccess(PERMISSION_ENUM.profile_change_theme)"
          :loading="loading"
          :props-theme="theme"
          @update="updateTheme"
        />
        <!-- <change-thema
          v-if="hasAccess(PERMISSION_ENUM.profile_change_theme)"
          :loading="loading"
          :props-theme="theme"
          @update="updateTheme"
        /> -->
      </template>
    </vab-profile>

    <own-logs />
  </div>
</template>

<style scoped lang="scss"></style>
