<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { getHumoRequest_DEFAULT, HumoRequestModel, createHumo_API } from '/@/services/scoring/humo'
import { CreditCardForm as TinyCreditCardForm } from '@opentiny/vue'
import type { FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const formRef = ref()
const formItemRef = ref()
const formItemRef1 = ref()
const rules = ref<FormRules>({
  expiry: [
    { required: true, trigger: 'blur', message: t('scoring_humo.messages.fill_field') },
    { min: 5, trigger: 'blur', message: t('scoring_humo.messages.fill_field') },
  ],
  number: [
    { required: true, trigger: 'blur', message: t('scoring_humo.messages.fill_field') },
    { min: 19, trigger: 'blur', message: t('scoring_humo.messages.card_number_is_16_characters') },
  ],
})

defineOptions({
  name: 'SingleHumo',
})

const $baseMessage = inject<any>('$baseMessage')
const backgroundImage = ref<string>(`https://res.hc-cdn.com/tiny-vue-web-doc/3.10.5.20230903162611/static/images/mountain.png`)
const _cardInfo = ref<HumoRequestModel>(getHumoRequest_DEFAULT())
const formData = ref<any>({
  cardNumber: _cardInfo.value.number || '',
  cardMonth: _cardInfo.value.expiry || '',
  cardYear: _cardInfo.value.expiry || '',
})

const handleSubmit = (value: any) => {
  $baseMessage(`create ：${JSON.stringify(value)}`, 'success', 'hey')
}

const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore

watch(
  () => _cardInfo.value.number,
  () => {
    formData.value.cardNumber = _cardInfo.value.number
  }
)
watch(
  () => _cardInfo.value.expiry,
  () => {
    formData.value.cardMonth = _cardInfo.value.expiry?.toString()?.substring(0, 2) || ' '
    formData.value.cardYear = `XX${_cardInfo.value.expiry?.toString()?.substring(3, 5) || ' '}`
  }
)
const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}

async function createHumo() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const data = {
        number: Number(_cardInfo.value.number?.toString()?.split(' ').join('')),
        expiry: Number(`${_cardInfo.value.expiry?.toString().substring(3, 5)}${_cardInfo.value.expiry?.toString().substring(0, 2)}`),
      }
      const [error] = await createHumo_API(data)
      if (error) {
        handleValidate(error.errors)
        return
      }
      $baseMessage(t('scoring_humo.messages.card_added_successfully'), 'success', 'hey')
      router.push('/scoring/humo')
    }
  })
}

function handleValidate(errors: any) {
  formItemRef.value.validateState = 'error'
  formItemRef.value.validateMessage = errors.number[0]
  formItemRef1.value.validateState = 'error'
  formItemRef1.value.validateMessage = errors.expiry[0]
  // for (const key in errors) {
  //   if (rules.value[key]) {
  // rules.value[key][0].message = errors[key][0];
  // formRef.value.validateField(key);
  // formRef.value.validate(key)
  //   }
  // }
}
</script>

<template>
  <div class="default-table-detail-container">
    <el-page-header content="Humo" @back="goBack" />
    <div class="credit-card-container">
      <tiny-credit-card-form :background-image="backgroundImage" :form-data="formData" @submit="handleSubmit" />

      <el-card class="card-item">
        <el-form ref="formRef" label-position="top" :model="_cardInfo" :rules="rules">
          <el-form-item ref="formItemRef" :label="t('scoring_humo.enter_card_number')" prop="number">
            <el-input
              v-model="_cardInfo.number"
              v-mask="'#### #### #### ####'"
              maxlength="19"
              placeholder="#### #### #### ####"
              size="large"
            />
          </el-form-item>
          <el-form-item ref="formItemRef1" :label="t('scoring_humo.enter_card_expiry_date')" prop="expiry">
            <el-input v-model="_cardInfo.expiry" v-mask="'##/##'" maxlength="5" size="large" />
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button size="large" style="width: 100%" type="primary" @click="createHumo">{{ $t('buttons.create') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
.card-item {
  width: 530px;
  padding: 20px;
  padding-top: 150px;
  padding-bottom: 0px;
}
.credit-card-form__inner {
  display: none !important;
}
.credit-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :deep() {
    .credit-card-input {
      &__label {
        color: var(--el-color-black);
      }

      &__input {
        color: var(--el-color-black);
        border: 1px solid var(--el-border-color);

        &:focus,
        &:hover {
          border-color: var(--el-color-primary);
          border-radius: var(--el-border-radius-base);
        }

        &.-select {
          font-size: 16px;
          background-image: none;
          border-radius: var(--el-border-radius-base);

          option {
            color: var(--el-color-black);
            background: var(--el-color-white);
            border: 0;
            border-radius: var(--el-border-radius-base);
          }
        }
      }

      &__eye {
        top: 34px;

        &.-active:not(:disabled),
        &:hover:not(:disabled) {
          color: var(--el-color-primary);
        }
      }
    }

    .credit-card-form {
      &__inner {
        background: var(--el-color-white);
        border: 1px solid var(--el-border-color);
        box-shadow: 0 30px 60px 0 var(--el-border-color);
      }

      &__button {
        color: var(--el-color-white);
        background: var(--el-color-primary);
        box-shadow: none;
        transition: var(--el-transition);

        &:hover,
        &:focus {
          background-color: var(--el-color-primary-light-3);
          border-color: var(--el-color-primary-light-3);
        }
      }
    }

    .credit-card-item {
      &__side {
        border: 1px solid var(--el-border-color);
        box-shadow: none;
      }
    }
  }
}
.default-table-detail-container {
  :deep() {
    .el-form--inline {
      .el-form-item {
        margin-right: 10px;
      }
    }
    .el-descriptions__label {
      min-width: 80px !important;
      text-align: right;
    }
  }
}
</style>
