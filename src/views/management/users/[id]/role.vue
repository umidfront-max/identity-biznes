<script lang="ts" setup>
import { getRoles_API, attachRole_API, RoleModel } from '~/src/services/roles'
import { getSingleUser_API } from '~/src/services/user'
const role = ref('')
const route = useRoute()
const _roles = ref<RoleModel[]>([])

const $baseMessage = inject<any>('$baseMessage')
async function getRoles() {
  const [error, response] = await getRoles_API()
  if (error) return
  _roles.value = response.data
}
async function loadItems() {
  const [error, response] = await getSingleUser_API(+route.params.id)

  if (error) return
  role.value = response.data.role.id
}

async function attachRole() {
  const [error] = await attachRole_API(route.params.id as string, role.value)
  if (error) return
  $baseMessage(`Role biriktirildi`, 'success', 'hey')
}
getRoles()
loadItems()
</script>

<template>
  <div style="display: flex; gap: 20px">
    <el-form-item>
      <el-select v-model="role" placeholder="Select">
        <el-option v-for="item in _roles" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="attachRole">Add</el-button>
    </el-form-item>
  </div>
</template>
