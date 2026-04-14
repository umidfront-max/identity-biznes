<template>
  <vab-card class="change-password-form">
    <el-form ref="formRef" label-position="top" label-width="100px" :model="form" :rules="rules" @submit.prevent>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" clearable placeholder="Password" />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="password_confirmation">
        <el-input v-model="form.password_confirmation" clearable placeholder="Confirm Password" />
      </el-form-item>
    </el-form>
    <div class="change-password-form__bottom">
      <el-button :loading="loading" native-type="submit" plain style="min-width: 200px" type="primary" @click="handleSubmit">
        Change Password
      </el-button>
    </div>
  </vab-card>
</template>

<script lang="ts" setup>
import instance from '/@/utils/request.ts'
import { inject } from 'vue'

const { endpoint } = defineProps<{
  endpoint: string
}>()

const $baseMessage = inject<any>('$baseMessage')

const formRef = ref<any>(null)
const loading = ref(false)
const form = reactive<any>({
  password: null,
  password_confirmation: null,
})

const rules = reactive<any>({
  password_confirmation: [{ validator: validatePassword, trigger: 'blur' }],
})

const handleSubmit = () => {
  formRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true
      instance
        .post(endpoint, form)
        .then((res: any) => {
          if (res.success) {
            $baseMessage(`Successfully Changed`, 'success', 'hey')
          } else {
            $baseMessage(res.message, 'warning', 'hey')
          }
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

function validatePassword(rule: any, value: any, callback: any) {
  if (value !== form.password) {
    callback(new Error('The passwords do not match'))
  } else {
    callback()
  }
}
</script>

<style lang="scss" scoped>
.change-password-form {
  &__bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px auto;
    text-align: center;
  }
}
</style>
