<script setup lang="ts">
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { UsersRequestModel, UsersResponseModel, getUser_API } from '/@/services/user'
import { useI18n } from 'vue-i18n'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'

const { t } = useI18n()
const _modalRef = ref()
const router = useRouter()

const _loading = ref(false)

const _items = ref<UsersResponseModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('management_users.fields.username'),
    prop: 'username',
    sortable: true,
    checked: true,
  },

  {
    label: t('management_users.fields.first_name'),
    prop: 'first_name',
    sortable: true,
    checked: true,
  },
  {
    label: t('management_users.fields.last_name'),
    prop: 'last_name',
    sortable: true,
    checked: true,
  },
  {
    label: t('management_users.fields.status'),
    prop: 'status',
    checked: true,
  },
  {
    label: t('management_users.fields.phone'),
    prop: 'phone',
  },
]
async function loadItems() {
  _loading.value = true
  const [error, response] = await getUser_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}
loadItems()

const updateUser = (item: UsersRequestModel) => {
  router.push(`/management/users/${item.id}/update`)
}

const navigateToSingleView = (item: UsersRequestModel) => {
  if (item.id)
    router.push({
      path: '/management/users/singleUser',
      query: {
        id: item.id,
      },
    })
}
const deleteBranchs = (items: UsersResponseModel | UsersResponseModel[]) => {
  const payload: RemoveItemModel = {
    id: [],
    url: '/management/users',
    callback: loadItems,
  }

  if (Array.isArray(items)) {
    for (const iterator of items) {
      payload.id.push(iterator.id)
    }
  } else {
    payload.id.push(items.id)
  }

  OPEN_REMOVE_MODAL(payload)
}

function openBranchModal(item?: UsersResponseModel) {
  _modalRef.value.open(item)
}
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @refresh-table="loadItems" />
    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <el-button v-if="hasAccess(PERMISSION_ENUM.user_view)" :icon="ViewIcon" type="info" @click="() => navigateToSingleView(row)" />
        <el-button v-if="hasAccess(PERMISSION_ENUM.user_edit)" :icon="EditIcon" type="warning" @click="() => updateUser(row)" />
        <el-button v-if="hasAccess(PERMISSION_ENUM.user_delete)" :icon="DeleteIcon" type="danger" @click="() => deleteBranchs(row)" />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.user_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openBranchModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.user_delete) && selectedRows.length > 0"
          :icon="DeleteIcon"
          size="large"
          type="danger"
          @click="() => deleteBranchs(selectedRows)"
        >
          {{ $t('buttons.delete') }}
        </el-button>
      </template>
    </universal-table-next>
  </div>
</template>
