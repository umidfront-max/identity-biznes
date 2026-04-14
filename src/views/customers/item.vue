<template>
  <el-form ref="formRef" class="demo-dynamic" label-width="120px" :model="dynamicValidateForm">
    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'Domain' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        trigger: 'blur',
        validator: validate,
      }"
    >
      <el-input v-model="domain.value" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">{{ $t('buttons.submit') }}</el-button>
      <el-button @click="addDomain">{{ $t('customers.new_domain') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

interface DomainItem {
  key: number
  value: string
}

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
}>({
  domains: [
    {
      key: 1,
      value: '1',
    },
    {
      key: 21,
      value: '4',
    },
    {
      key: 14,
      value: '4',
    },
    {
      key: 114,
      value: '',
    },
  ],
})

function validate(rule: any, value: any, callback: any) {
  let isCurrent = true

  for (const iterator of dynamicValidateForm.domains) {
    if (isCurrent && iterator.value == value) {
      isCurrent = false
      continue
    }
    if (!isCurrent && iterator.value == value) {
      callback('dublicate')
      return
    }
  }

  if (!value) {
    callback('field is required')
  } else {
    callback()
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

nextTick(() => {
  submitForm(formRef.value)
})
</script>
