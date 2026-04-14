<script setup lang="ts">
import TheModal from './Modal.vue'
import UniversalTableNext from '/@/components/UniversalTableNext.vue'

import { hasAccess } from '~/src/utils/permission'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { BranchModel, getBranch_API } from '/@/services/branch'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { useI18n } from 'vue-i18n'
import AddIcon from '/@/icon/action/AddIcon.vue'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import ViewIcon from '/@/icon/action/ViewIcon.vue'

const { t } = useI18n()
const _items = ref<BranchModel[]>([])
const _totalItems = ref(0)
const tableColumns = [
  {
    label: t('management_branches.fields.name'),
    prop: 'name',
    sortable: true,
    checked: true,
  },

  {
    label: t('management_branches.fields.address'),
    prop: 'address',
    sortable: true,
    checked: true,
  },
  {
    label: t('management_branches.fields.inn'),
    prop: 'inn',
    checked: true,
  },
  {
    label: t('management_branches.fields.created_at'),
    prop: 'created_at',
  },
  {
    label: t('management_branches.fields.updated_at'),
    prop: 'updated_at',
  },
]
const router = useRouter()
const _modalRef = ref()
const _loading = ref(false)

async function loadItems() {
  _loading.value = true
  const [error, response] = await getBranch_API()
  _loading.value = false

  if (error) return

  _items.value = response.data
  _totalItems.value = response.meta.total
}

function openBranchModal(item?: BranchModel) {
  _modalRef.value.open(item)
}

const navigateToSingleView = (item: BranchModel) => {
  if (item.id)
    router.push({
      path: '/management/branch',
      query: {
        id: item.id,
      },
    })
}

const deleteBranchs = (items: BranchModel | BranchModel[]) => {
  const payload: RemoveItemModel = {
    id: [],
    url: '/management/branches',
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
    <the-modal ref="_modalRef" @refresh-table="loadItems" />

    <universal-table-next :items="_items" :loading="_loading" :table-columns="tableColumns" :total-items="_totalItems" @sort="loadItems">
      <template #table-inline-actions="{ row }">
        <el-button v-if="hasAccess(PERMISSION_ENUM.branch_view)" :icon="ViewIcon" type="info" @click="() => navigateToSingleView(row)" />
        <el-button v-if="hasAccess(PERMISSION_ENUM.branch_edit)" :icon="EditIcon" type="warning" @click="() => openBranchModal(row)" />
        <el-button v-if="hasAccess(PERMISSION_ENUM.branch_delete)" :icon="DeleteIcon" type="danger" @click="() => deleteBranchs(row)" />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.branch_create)"
          :icon="AddIcon"
          size="large"
          type="primary"
          @click="openBranchModal(undefined)"
        >
          {{ $t('buttons.add') }}
        </el-button>
        <el-button
          v-if="hasAccess(PERMISSION_ENUM.branch_delete) && selectedRows.length > 0"
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
