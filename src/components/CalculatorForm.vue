<script lang="ts" setup>
import { CalculatorModel, getCalculator_API, postCalculator_DEFAULT } from '/@/services/calculator'
import { TariffModel, getTariff_API } from '~/src/services/tariff'
import type { FormInstance } from 'element-plus'
import { rules } from '/@/views/installments/calculator/rules.ts'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ref, unref } from 'vue'
// import { getImageUrl } from '/@/utils/imageUrl'
import { hasAccess } from '/@/utils/permission.ts'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum.ts'
import CalculatorIcon from '/@/icon/action/CalculatorIcon.vue'

const formRef = ref<FormInstance>()

const _tariffOptions = ref<TariffModel[]>([])
const _formData = ref<CalculatorModel>(postCalculator_DEFAULT())

const buttonRef = ref()
const popoverRef = ref()
const router = useRouter()

// const calculatorImg = ref<string>(getImageUrl(`assets/calculator.svg`))

function handleItem() {
  buttonRef.value.click()
}
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
function sendForm() {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      const [error] = await getCalculator_API(_formData.value)

      if (error) return
      router.push({
        name: 'calculator',
        query: {
          items: JSON.stringify(_formData.value),
        },
      })

      onClickOutside()
      handleItem()
    }
  })
}
async function loadItems() {
  const [error, response] = await getTariff_API()

  if (error) return
  _tariffOptions.value = response.data
}

if (hasAccess(PERMISSION_ENUM.calculate_installment)) {
  loadItems()
}
</script>
<template>
  <div class="calculators">
    <!-- <el-button v-click-outside="onClickOutside" :icon="CalculatorIcon" type="warning" /> -->
    <el-button v-click-outside="onClickOutside" class="header_btn icons" :icon="CalculatorIcon" />
    <el-popover
      ref="popoverRef"
      :persistent="true"
      :teleported="true"
      trigger="click"
      :virtual-ref="buttonRef"
      virtual-triggering
      width="400"
    >
      <div class="calculator_card">
        <el-form ref="formRef" class="calculator_forma" label="Tarif" label-position="top" :model="_formData" :rules="rules">
          <el-form-item label="Tarif" prop="tariff_i">
            <el-select v-model="_formData.tariff_id" class="m-2" placeholder="Select" @blur="handleItem">
              <el-option v-for="item in _tariffOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item label="Qiymat" prop="amount">
            <el-input v-model="_formData.amount" type="number" />
          </el-form-item>
          <el-form-item label="Dastlabgi to'lov" prop="initial_amount">
            <el-input v-model="_formData.initial_amount" type="number" />
          </el-form-item>
          <el-form-item label="Davr" prop="period">
            <el-input v-model="_formData.period" type="number" />
          </el-form-item>
        </el-form>
        <el-button style="width: 100%" type="primary" @click="sendForm">To'lov jadvalini olish</el-button>
      </div>
    </el-popover>
  </div>
</template>
<style lang="scss">
.calculators {
  margin-top: 2px;
  .el-popper {
    width: 500px !important;
  }
}
.calculator_forma {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 30px;
}
</style>
