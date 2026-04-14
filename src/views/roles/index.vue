<script lang="ts" setup>
import { hasAccess } from '~/src/services/profile'
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { getRoles_API, type RoleModel } from '/@/services/roles'
import { useI18n } from 'vue-i18n'
import ViewIcon from '/@/icon/action/ViewIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'

const { t } = useI18n()
const _items = ref<RoleModel[]>([])
const _totalItems = ref(0)
const _loading = ref(false)

const tableColumns = [
  {
    label: t('management_roles.fields.name'),
    prop: 'name',
    sortable: true,
    checked: true,
  },
]

const router = useRouter()
const _modalRef = ref()

async function loadItems() {
  _loading.value = true
  const [error, response] = await getRoles_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openBranchModal(item?: RoleModel) {
  _modalRef.value.open(item)
}

const navigateToSingleView = (item: RoleModel) => {
  if (item.id)
    router.push({
      path: '/management/roles/singleRole',
      query: {
        id: item.id,
      },
    })
}

const deleteBranchs = (items: RoleModel | RoleModel[]) => {
  const payload: RemoveItemModel = {
    id: [],
    url: '/roles',
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

loadItems()
</script>

<template>
  <div>
    <the-modal ref="_modalRef" @update="loadItems" />

    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <div v-if="row.name !== 'ADMIN'">
          <el-button v-if="hasAccess(PERMISSION_ENUM.role_view)" :icon="ViewIcon" type="info" @click="() => navigateToSingleView(row)" />
          <el-button v-if="hasAccess(PERMISSION_ENUM.role_edit)" :icon="EditIcon" type="warning" @click="() => openBranchModal(row)" />
          <el-button v-if="hasAccess(PERMISSION_ENUM.role_delete)" :icon="DeleteIcon" type="danger" @click="() => deleteBranchs(row)" />
        </div>
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.role_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openBranchModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.role_delete) && selectedRows.length > 0"
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
