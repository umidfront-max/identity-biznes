<script lang="ts" setup>
import UniversalTableNext from '/@/components/UniversalTableNext.vue'
import TheModal from './Modal.vue'
// import { PERMISSION_ENUM } from "/@/router/pemissionsEnum";
// import { hasAccess } from "~/src/services/profile";
import { CommentsModel, InstalmentModel } from '~/src/services/instalment'
import { OPEN_REMOVE_MODAL, type RemoveItemModel } from '/@/services/removeItem'
import { useI18n } from 'vue-i18n'
import DeleteIcon from '/@/icon/action/DeleteIcon.vue'
import EditIcon from '/@/icon/action/EditIcon.vue'
import AddIcon from '/@/icon/action/AddIcon.vue'

const { t } = useI18n()
const _modalRef = ref()
const _loading = ref(false)
const _totalItems = ref(0)
const emit = defineEmits(['update'])
const props = defineProps({
  items: {
    type: Object as PropType<InstalmentModel>,
    required: true,
  },
})
const commentItems = computed(() => {
  return props.items.comments
})

const tableColumns = [
  {
    label: t('installments.fields.creator_name'),
    prop: 'creator_name',
    checked: true,
  },
  {
    label: t('installments.fields.comment'),
    prop: 'comment',
    checked: true,
  },
]

function openCommentModal(item?: CommentsModel) {
  _modalRef.value.open(item)
}
function loadItems() {
  emit('update')
}
function deleteAddress(items: CommentsModel | CommentsModel[]) {
  const payload: RemoveItemModel = {
    id: [],
    url: `/installment/installment/comment`,
    callback: loadItems,
  }

  if (Array.isArray(items)) {
    for (const iterator of items) {
      payload.id.push(iterator.id as number)
    }
  } else {
    payload.id.push(items.id as number)
  }
  OPEN_REMOVE_MODAL(payload)
}
</script>
<template>
  <div class="address">
    <the-modal ref="_modalRef" @update="emit('update')" />
    <universal-table-next
      :items="commentItems"
      :loading="_loading"
      :table-columns="tableColumns"
      :total-items="_totalItems"
      @sort="emit('update')"
    >
      <template #table-inline-actions="{ row }">
        <el-button :icon="EditIcon" type="warning" @click="() => openCommentModal(row)" />

        <el-button :icon="DeleteIcon" type="danger" @click="() => deleteAddress(row)" />
      </template>
      <template #table-standalone-actions="{ selectedRows }">
        <el-button :icon="AddIcon" size="large" type="primary" @click="() => openCommentModal(selectedRows)">
          {{ $t('buttons.add') }}
        </el-button>

        <el-button v-if="selectedRows.length > 0" :icon="DeleteIcon" size="large" type="danger" @click="() => deleteAddress(selectedRows)">
          {{ $t('buttons.delete') }}
        </el-button>
      </template>
    </universal-table-next>
  </div>
</template>

<style lang="scss">
.address {
  .top-panel {
    display: none !important;
  }
}
</style>
