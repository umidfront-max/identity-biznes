import { VabRouteRecordRaw } from '/@/router/types.ts'
import Layout from '/@vab/layouts/index.vue'

import { PERMISSION_ENUM } from '../pemissionsEnum'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const installments: VabRouteRecordRaw[] = [
  {
    path: '/installments',
    name: 'installments',
    component: Layout,
    meta: {
      title: t('installments.meta.title'),
      icon: 'money-dollar-box-fill',
    },
    children: [
      {
        path: 'installments',
        name: 'installments',
        component: () => import('/src/views/installments/installments/index.vue'),
        meta: {
          title: t('installments.meta.title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          role: PERMISSION_ENUM.installment_view_all,
        },
      },
      {
        path: 'creditInstallment',
        name: 'creditInstallment',
        component: () => import('/src/views/installments/installments/creditInstallment.vue'),
        meta: {
          title: t('installments.meta.credit_title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          hidden: true,
          role: PERMISSION_ENUM.installment_create,
          activeMenu: '/installments/installments',
        },
      },
      {
        path: 'singleInstallment',
        name: 'singleInstallment',
        component: () => import('/src/views/installments/installments/singleInstallment/index.vue'),
        meta: {
          title: t('installments.meta.credit_title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          hidden: true,
          role: PERMISSION_ENUM.installment_view,
          activeMenu: '/installments/installments',
        },
      },
      {
        path: 'transaction',
        name: 'Transaction',
        component: () => import('/src/views/installments/installments/singleInstallment/transaction/singleTransaction.vue'),
        meta: {
          title: t('installments.meta.transaction_title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          role: PERMISSION_ENUM.transaction_view_all,
          hidden: true,
          // hidden: hasAccess(PERMISSION_ENUM.transaction_type_view_all)
        },
      },
      {
        path: 'tariffs',
        name: 'tariffs',
        component: () => import('/src/views/installments/tariffs/index.vue'),
        meta: {
          title: t('tariff.meta.credit_title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          role: PERMISSION_ENUM.tariff_view_all,
        },
      },
      {
        path: 'calculator',
        name: 'calculator',
        component: () => import('/src/views/installments/calculator/index.vue'),
        meta: {
          title: 'Calculator',
          icon: 'hand-coin-fill',
          noClosable: false,
          role: PERMISSION_ENUM.calculate_installment,
        },
      },
      {
        path: 'transactionType',
        name: 'TransactionType',
        component: () => import('/src/views/installments/transactionType/index.vue'),
        meta: {
          title: t('installments.meta.transaction_title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          role: PERMISSION_ENUM.transaction_type_view_all,
          // hidden: hasAccess(PERMISSION_ENUM.transaction_type_view_all)
        },
      },

      {
        path: 'singleTransactionType',
        name: 'singleTransactionType',
        component: () => import('/src/views/installments/transactionType/singleTransactionType.vue'),
        meta: {
          title: t('installments.meta.title'),
          icon: 'hand-coin-fill',
          noClosable: false,
          activeMenu: '/installments/transactionType',
          hidden: true,
          role: PERMISSION_ENUM.transaction_type_view,
        },
      },
      {
        path: 'tariff',
        name: 'single-tariff',
        component: () => import('/src/views/installments/tariffs/singleTariff.vue'),
        meta: {
          hidden: true,
          title: t('tariff.meta.single_title'),
          activeMenu: '/installments/tariffs',
          dynamicNewTab: true, // Multiple details pages can be opened based on different ID parameters.
          role: PERMISSION_ENUM.tariff_view,
        },
      },
    ],
  },
]
