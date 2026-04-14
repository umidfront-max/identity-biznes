<script setup lang="ts">
// Models
import Users from '/@/models/table-models/management/users.ts'
import UsersForm from '/@/models/dynamic-form-models/management/users.ts'
import RoleAttachment from './role.vue'
// Components
import VabChangePassword from '/@/components/views-components/VabChangePassword/index.vue'
import VabThemeDrawer from '/src/components/views-components/VabTheme/index.vue'
import { themeConfig } from '/@/config/theme.config.ts'
import instance from '/@/utils/request.ts'
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { inject } from 'vue'
// import Devices from '/@/models/table-models/management/devices.ts'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const {
  params: { id },
} = useRoute()
const model = new Users()
// const device = new Devices(`users/${id}/devices`)
const formModel = new UsersForm()

const $baseMessage = inject<any>('$baseMessage')

const formFields: { [key: string]: FieldType } = formModel.fields
const tabsStore = useTabsStore()
const { changeTabsMeta } = tabsStore

delete formFields.password
delete formFields.password_confirmation

const userElTabs: ElTab[] = [
  { label: t('management_users.tabs.role_info'), name: 'role_info' },
  { label: t('management_users.tabs.user_info'), name: 'user_info' },
  {
    label: t('management_users.tabs.change_password'),
    name: 'change_password',
  },
  { label: t('management_users.tabs.change_theme'), name: 'change_theme' },
]

const userElTabsBottom: ElTab[] = [{ label: t('management_users.tabs.user_devices'), name: 'user_info' }]

const loading = ref(false)

const updateTheme = (theme: any) => {
  loading.value = true

  instance
    .post(`${model.getItemEndpoint(id)}/change-theme`, theme)
    .then((res: any) => {
      if (res.success) {
        setTheme(res.data)
        $baseMessage(t('management_users.updated_successfully'), 'success', 'hey')
      } else {
        $baseMessage(t('management_users.error'), 'warning', 'hey')
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const fetchItem = () => {
  model.getItem(id).then((res: any) => {
    formModel.setFormData(res)
    setTheme(res)
  })
}

const setTheme = (item: any) => {
  if (!item.template_theme) {
    formModel.store.$patch((state: any) => {
      state.theme = { ...themeConfig }
    })
  } else {
    formModel.store.$patch((state: any) => {
      state.theme = {
        ...item.template_theme,
      }
    })
  }
}

const theme: any = computed({
  get: () => {
    return formModel.store.theme
  },
  set: (newValue) => {
    formModel.store.$patch({ theme: newValue })
  },
})

onMounted(() => {
  fetchItem()
  changeTabsMeta({
    title: 'Iframe',
    meta: {
      title: `Params Id=${id}`,
    },
  })
})

onUnmounted(() => {
  formModel.resetFormData()
})
</script>

<template>
  <div>
    <vab-profile :el-tabs="userElTabs" :el-tabs-bottom="userElTabsBottom" :form-data="formModel.store.formData as any">
      <template #el-tab-role_info>
        <role-attachment />
      </template>
      <template #el-tab-user_info>
        <vab-dynamic-form :form-model="formModel" />
      </template>
      <template #el-tab-change_password>
        <vab-change-password :endpoint="`${model.endpoint}/${id}/change-password`" />
      </template>
      <template #el-tab-change_theme>
        <vab-theme-drawer :loading="loading" :props-theme="theme" @update="updateTheme" />
      </template>

      <!--      <template #el-tab-bottom-user_info="{ isActiveTab }">-->
      <!--        <vab-table v-if="isActiveTab" :table-model="device" />-->
      <!--      </template>-->
    </vab-profile>
  </div>
</template>

<style scoped lang="scss"></style>
