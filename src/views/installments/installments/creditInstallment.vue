<script lang="ts" setup>
import PasportInfo from './pasportInfo.vue'
import CreditDetails from './creditDetails.vue'
import CreateInstalment from './createInstallment.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const status = ref(0)

const handleSetStep = (_active: any) => {
  status.value = _active
}
function handlePrew(item: number) {
  status.value = item
}
</script>
<template>
  <div class="step-form-container">
    <el-row>
      <el-col
        :lg="{ span: 20, offset: 2 }"
        :md="{ span: 18, offset: 4 }"
        :sm="{ span: 16, offset: 7 }"
        :xl="{ span: 16, offset: 7 }"
        :xs="24"
      >
        <el-steps :active="status" align-center class="steps" style="padding-top: 20px">
          <el-step description="" :title="t('installments.customer_info')" />
          <el-step description="" :title="t('installments.credit_details')" />
          <el-step description="" :title="t('installments.success')" />
        </el-steps>
        <step1 v-if="status === 0" @change-step="handleSetStep" />
        <step2 v-if="status === 1" @change-step="handleSetStep" />
        <step3 v-if="status === 2" @change-step="handleSetStep" />
      </el-col>
      <div v-if="status === 0" style="width: 100%; margin-top: 20px">
        <pasport-info @next="status = 1" />
      </div>
      <div v-if="status === 1" style="width: 100%; margin-top: 20px">
        <credit-details @next="status = 2" @prew="status = 0" />
      </div>
      <div v-if="status === 2" style="width: 100%; margin-top: 20px">
        <create-instalment @prew="handlePrew" />
      </div>
    </el-row>
  </div>
</template>

<style lang="scss">
.step-form-container {
  .el-form {
    width: 100% !important;
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
</style>
