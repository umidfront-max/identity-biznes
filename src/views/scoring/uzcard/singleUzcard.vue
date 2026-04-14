<script lang="ts" setup>
import { card_UTIL } from '/@/utils/card.ts'
import { formatDate_UTIL } from '/@/utils/dateFormat.ts'
import { useTabsStore } from '/@/store/modules/tabs.ts'
import { handleActivePath } from '/@/utils/routes'
import { UzcardResponseModel, UzcardDetailsModel, singleUzcard_API, getUzcardResponse_DEFAULT } from '/@/services/scoring/uzcard'
import { CreditCardForm as TinyCreditCardForm } from '@opentiny/vue'
import CardLoading from '../../../components/CardLoading.vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'SingleUzcard',
})
const { t } = useI18n()
const route: any = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore
const _item = ref<UzcardResponseModel>(getUzcardResponse_DEFAULT())
const backgroundImage = ref<string>(`https://res.hc-cdn.com/tiny-vue-web-doc/3.10.5.20230903162611/static/images/mountain.png`)
const _loading = ref(false)
const formData = ref<any>({
  cardNumber: 0,
  cardMonth: 0,
  cardYear: 0,
})

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}
async function loadItems() {
  _loading.value = true
  const [error, response] = await singleUzcard_API(route.query.id)
  _loading.value = false
  if (error) return
  _item.value = response.data

  formData.value.cardMonth = _item.value.request.expiry?.toString().substring(0, 2)
  formData.value.cardNumber = card_UTIL(_item.value.request.number as number)
  formData.value.cardYear = `XX${_item.value.request.expiry?.toString().substring(2, 4)}`
}

loadItems()
</script>

<template>
  <div>
    <card-loading v-if="_loading" />
    <div v-else class="card-wrap default-table-detail-container">
      <el-page-header :content="'UzCard ' + card_UTIL(_item.request.number as number)" @back="goBack" />
      <div class="credit-card-container">
        <tiny-credit-card-form :background-image="backgroundImage" :form-data="formData" />
      </div>
      <div>
        <h2>{{ $t('scoring_uzcard.report') }}</h2>
        <el-table v-if="_item.response.report.length" :data="_item.response.report" style="width: 100%">
          <el-table-column align="center" label="№" width="55">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column :label="t('scoring_uzcard.month')" prop="month" width="200">
            <template #default="{ row }">
              <p class="table-border">{{ formatDate_UTIL(row.month) }}</p>
            </template>
          </el-table-column>
          <el-table-column :label="t('scoring_uzcard.payment_info')" prop="details" width="400">
            <template #default="{ row }">
              <div v-for="(item, ind) in row.details" :key="ind" class="table-column">
                <p class="table-border">{{ item.description }}</p>
              </div>
              <p class="table-border">{{ $t('scoring_uzcard.total') }}</p>
            </template>
          </el-table-column>

          <el-table-column :label="t('scoring_uzcard.term')">
            <template #default="{ row }">
              <div v-for="(item, ind) in row.details" :key="ind" class="table-column">
                <p class="table-border">{{ item.amount.toLocaleString() }}</p>
              </div>
              <p class="table-border">
                {{ row.details.reduce((acc: number, current: UzcardDetailsModel) => acc + current.amount, 0)?.toLocaleString() }}
              </p>
            </template>
          </el-table-column>
        </el-table>
        <p v-else style="font-size: 18px; color: red; text-align: center">{{ $t('scoring_uzcard.no_payments') }}</p>
      </div>
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
.card-wrap {
  .el-table .cell {
    padding: 0;
  }
  .el-table th.el-table__cell.is-leaf,
  .el-table td.el-table__cell {
    padding: 0px;
    border: 1px solid #ccc;
  }
  th .cell {
    padding: 4px 10px !important;
  }
}
.table-column {
  border-bottom: 1px solid #ccc;
}
.table-border {
  padding: 4px;
  padding-bottom: 0px;
  margin: 0px 6px;
}
.credit-card-form__inner,
.credit-card-item__holder {
  display: none !important;
}
.credit-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 150px;
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
