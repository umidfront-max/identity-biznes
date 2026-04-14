<script lang="ts" setup>
import {
  attachPermissionToRole_API,
  getRole_DEFAULT,
  getSingleRole_API,
  type AttachPermissionModel,
  type RoleModel,
} from '/@/services/roles'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const $baseMessage = inject<any>('$baseMessage')
const route: any = useRoute()
const _singleItem = ref<RoleModel>(getRole_DEFAULT())

async function loadItems() {
  const [error, response] = await getSingleRole_API(route.query.id)

  if (error) return

  _singleItem.value = response.data
}

async function submit() {
  const payload: AttachPermissionModel[] = []

  for (const group of _singleItem.value.permission_groups) {
    for (const permission of group.permissions) {
      for (const branch of permission.branches) {
        payload.push({
          branch_id: branch.id,
          permission_id: permission.id,
          enabled: branch.enabled,
        })
      }
    }
  }

  const [error] = await attachPermissionToRole_API(route.query.id, payload)

  if (error) return

  console.log(payload)
  $baseMessage(t('management_roles.updated_successfully'), 'success', 'hey')
}
loadItems()
</script>

<template>
  <div>
    <el-button type="primary" @click="submit">submit</el-button>
    <div v-for="group of _singleItem.permission_groups" :key="group.id" style="margin-top: 20px">
      <el-card class="checkbox_item">
        <h2>
          {{ group.name }}
          <!-- {{ $t(TRANSLATE_PERMISSION_ENUM.get(group.name) || "") }} -->
        </h2>
        <div class="role">
          <el-card v-for="permission of group.permissions" :key="permission.id" class="permission">
            <p>
              {{ permission.name }}
              <!-- {{ $t(TRANSLATE_PERMISSION_ENUM.get(permission.name) || "") }} -->
            </p>

            <div v-for="branch of permission.branches" :key="branch.id" class="branch">
              <el-checkbox v-if="branch.editable" v-model="branch.enabled" :label="branch.name" />
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style lang="scss">
.el-card__body {
  padding: 5px 20px !important;
}
.role {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 30px;
}
.permission {
  p {
    font-size: 20px;
  }
}
.checkbox_item {
  h2 {
    font-size: 24px;
    color: rgb(136, 136, 227);
  }
}
</style>
