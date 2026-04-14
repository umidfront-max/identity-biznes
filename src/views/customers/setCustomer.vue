<script lang="ts" setup>
import ContactInfo from './ContactInfo.vue'
import PasportInfo from './PasportInfo.vue'
import AutomaticPasportInfo from './AutomaticPasportInfo.vue'
import singleCustomer from './singleCustomer/index.vue'
import ArrowIcon from '/@/icon/action/ArrowIcon.vue'

import { useI18n } from 'vue-i18n'
import { _customerPassportInfoStore, _customerContactInfoStore, PHONE_TYPES } from '~/src/services/customer'
const { t } = useI18n()
const status = ref(0)
const router = useRouter()
const handleSetStep = () => {
  console.log('status.value ', status.value)
  if (status.value == 0) {
    router.push('/customers')
  } else if (status.value == 1) {
    status.value = 0
  } else if (status.value == 2) {
    status.value = 1
  } else if (status.value == 3) {
    status.value = 2
  }
}
</script>
<template>
  <div class="step-form-container customer-step">
    <el-row style="grid-column: span 4 / span 4; padding: 16px; background-color: white; border-radius: 10px">
      <el-button class="next_btn" :icon="ArrowIcon" @click="handleSetStep" />
      <el-col>
        <el-steps :active="status" align-center class="steps" style="padding-top: 20px">
          <el-step description="" :title="t('Паспортные информация')" />
          <el-step description="" :title="t('customers.descriptions.customer_info')" />
          <el-step description="" :title="t('customers.descriptions.contact_info')" />
          <el-step description="" :title="t('customers.descriptions.success')" />
        </el-steps>
        <step1 v-if="status === 0" @change-step="handleSetStep" />
        <step2 v-if="status === 1" @change-step="handleSetStep" />
        <step3 v-if="status === 2" @change-step="handleSetStep" />
        <step3 v-if="status === 3" @change-step="handleSetStep" />
      </el-col>
      <div v-if="status === 0" style="width: 100%; height: 100%; margin-top: 20px">
        <automatic-pasport-info @next="status = 1" />
      </div>
      <div v-if="status === 1" style="width: 100%; height: 100%; margin-top: 20px">
        <pasport-info @next="status = 2" />
      </div>
      <div v-if="status === 2" style="width: 100%; margin-top: 20px">
        <contact-info @next="status = 3" @prew="status = 0" />
      </div>
      <div v-if="status === 3" style="width: 100%; margin-top: 20px">
        <single-customer @prew="status = 1" />
      </div>
    </el-row>
    <div class="information">
      <p style="font-size: 18px; font-weight: 600; color: #008dff">Информация</p>
      <div>
        <p class="titles">{{ $t('customers.fields.passport_series_number') }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.passport_series + _customerPassportInfoStore.passport_number || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.first_name') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.first_name || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.last_name') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.last_name || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.middle_name') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.middle_name || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.first_name') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.birth_place || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.dwelling_place') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.first_name || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.tin') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.tin || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.pinfl') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.pinfl || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.passport_given_date') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.passport_given_date || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.passport_expiration_date') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.passport_expiration_date || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.passport_expiration_date') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.passport_expiration_date || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.passport_expiration_date') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.passport_expiration_date || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.passport_expiration_date') || '-' }}</p>
        <p class="title_val">{{ _customerPassportInfoStore.passport_expiration_date || '-' }}</p>
        <div v-for="(address, ind) in _customerContactInfoStore?.addresses" :key="ind">
          <p style="font-size: 18px; font-weight: 600; color: #008dff">Адрес {{ ind + 1 || '-' }}</p>

          <p class="titles">{{ $t('customers.fields.region_id') }}</p>
          <p class="title_val">{{ address.region?.name || '-' }}</p>

          <p class="titles">{{ $t('customers.fields.district_id') }}</p>
          <p class="title_val">{{ address.district?.name || '-' }}</p>

          <p class="titles">{{ $t('customers.fields.mahalla_id') }}</p>
          <p class="title_val">{{ address.mahalla?.name || '-' }}</p>

          <p class="titles">{{ $t('customers.address') }}</p>
          <p class="title_val">{{ address.address || '-' }}</p>
        </div>
      </div>

      <div v-for="(item, ind) in _customerContactInfoStore?.phones" :key="ind">
        <p style="font-size: 18px; font-weight: 600; color: #008dff">Контакт {{ ind + 1 }}</p>
        <p class="titles">{{ $t('customers.fields.phone') }}</p>
        <p class="title_val">{{ item.phone || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.type') }}</p>
        <p class="title_val">{{ PHONE_TYPES.get(item.type)?.label || '-' }}</p>

        <p class="titles">{{ $t('customers.fields.comment') }}</p>
        <p class="title_val">{{ item.comment || '-' }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.el-form-item__label {
  margin-bottom: 2px !important;
  font-size: 14px;
  color: #0f172a;
}
.el-input {
  height: 44px !important;
  background: #f1f5f9 !important;
}
.el-input__wrapper {
  background: #f1f5f9 !important;
}
.el-input__inner {
  font-size: 14px;
}
.el-input__icon {
  width: 20px;
  height: 20px;
  svg {
    width: 100%;
    height: 100%;
  }
}
.step-form-container {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 16px;
  background: var(--el-background-color) !important;
  .next_btn {
    position: absolute;
    z-index: 999;
    width: 32px;
    height: 32px;
    background: var(--el-background-color) !important;
    border-radius: 50%;
  }
  .el-step__icon {
    width: 44px;
    height: 44px;
    font-size: 22px;
    font-weight: 600;
  }
  .el-step.is-horizontal .el-step__line {
    top: 23px;
    height: 1px;
  }
  .el-step__title {
    font-size: 12px;
  }
  .el-form {
    width: 100% !important;
  }
  .information {
    grid-column: span 1 / span 1;
    height: var(--el-container-height);
    padding: 16px;
    padding-top: 0;
    overflow: auto;
    background: white;
    border-radius: 10px;
  }
  :deep() {
    .el-steps {
      margin: var(--el-margin) auto calc(var(--el-margin) * 2) auto !important;

      .el-step__title.is-process {
        color: var(--el-color-primary) !important;
      }

      .el-step__description.is-process {
        color: var(--el-color-primary) !important;
      }

      .el-step__head {
        &.is-process {
          color: var(--el-color-primary) !important;
          border-color: var(--el-color-primary) !important;

          .el-step__icon.is-text {
            color: var(--el-color-primary) !important;
            border: 1px solid !important;
          }

          .el-step__line {
            height: 1px !important;
          }
        }

        &.is-wait {
          .el-step__icon.is-text {
            border: 1px solid !important;
          }

          .el-step__line {
            height: 1px !important;
          }
        }

        &.is-finish {
          .el-step__icon.is-text {
            color: var(--el-color-white) !important;
            background: var(--el-color-primary) !important;
          }

          .el-step__line {
            height: 1px !important;
            background: var(--el-color-primary) !important;
          }
        }
      }
    }
  }
}
.customer-step {
  padding: 0 !important;
  border: none !important;
}
.titles {
  font-size: 14px;
  color: #94a3b8;
}
.title_val {
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  color: #000;
}
</style>
