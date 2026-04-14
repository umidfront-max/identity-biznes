<template>
  <el-dialog v-model="dialogFormVisible" append-to-body draggable height="400px" :title="title" width="500px" @close="close">
    <div class="list-container">
      <ul class="vab-auto-box">
        <li v-for="(item, index) in data" :key="index" class="list-item">
          <div>{{ item.label }}</div>
          <div>{{ item.value }}</div>
        </li>
      </ul>
    </div>
    <template #footer>
      <el-button @click="close">{{ $t('buttons.close') }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
defineOptions({ name: 'VabTableViewDialog' })

const data = ref<any>([])
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)

const openViewModal = (item: any) => {
  data.value = item
  dialogFormVisible.value = true
}

defineExpose({
  openViewModal,
  data,
})

const close = () => {
  dialogFormVisible.value = false
}
</script>
<style lang="scss" scoped>
.list-container {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    outline: none;

    .list-item {
      display: flex;
      padding: var(--el-padding);

      &:not(:last-child) {
        border-bottom: 1px solid var(--el-border-color);
      }

      & div {
        width: 50%;
      }
    }
  }
}
</style>
