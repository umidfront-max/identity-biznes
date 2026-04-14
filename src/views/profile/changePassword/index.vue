<template>
  <vab-card class="change-password-form">
    <el-form ref="formRef" label-position="top" label-width="100px" :model="form" :rules="rules" @submit.prevent>
      <el-form-item :label="t('profile.password')" prop="password">
        <el-input v-model="form.password" clearable :placeholder="t('profile.placeholders.password')" />
      </el-form-item>
      <el-form-item :label="t('profile.confirm_password')" prop="password_confirmation">
        <el-input v-model="form.password_confirmation" clearable :placeholder="t('profile.message.confirm_passwords')" />
      </el-form-item>
    </el-form>
    <div class="change-password-form__bottom">
      <el-button :loading="loading" native-type="submit" plain style="min-width: 200px" type="primary" @click="handleSubmit">
        {{ $t('profile.change_password') }}
      </el-button>
    </div>
  </vab-card>
</template>

<script lang="ts" setup>
import { ProfilePassword_API, ProfilePasswordModel } from '/@/services/profile'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const $baseMessage = inject<any>('$baseMessage')

const formRef = ref<any>(null)
const loading = ref(false)
const form = reactive<ProfilePasswordModel>({
  password: '',
  password_confirmation: '',
})

const rules = reactive<any>({
  password_confirmation: [{ validator: validatePassword, trigger: 'blur' }],
})

const handleSubmit = () => {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      loading.value = true
      const [error] = await ProfilePassword_API(form)
      if (error) {
        $baseMessage(error.message, 'warning', 'hey')
        loading.value = false
        return
      }
      $baseMessage(t('profile.successfully_changed'), 'success', 'hey')
      loading.value = false
    }
  })
}

function validatePassword(rule: any, value: any, callback: any) {
  if (value !== form.password) {
    callback(new Error(t('profile.messages.passwords_not_match')))
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
