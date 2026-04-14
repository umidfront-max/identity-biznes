import { PERMISSION_ENUM } from '../pemissionsEnum'
import { VabRouteRecordRaw } from '/@/router/types.ts'
import Layout from '/@vab/layouts/index.vue'
import { i18n } from '/@/i18n/index.ts'
const t = (i18n as any).global.t

export const customers: VabRouteRecordRaw[] = [
  {
    path: '/customers',
    name: 'customers',
    component: Layout,
    meta: {
      title: t('customers.meta.title'),
      icon: 'clipboard-line',
    },
    children: [
      {
        path: '',
        name: 'customers-list',
        component: () => import('/src/views/customers/index.vue'),
        meta: {
          title: t('customers.meta.list_title'),
          icon: 'clipboard-line',
          role: PERMISSION_ENUM.customer_view_all,
        },
      },
      {
        path: '/setCustomer',
        name: 'customers-create',
        component: () => import('/src/views/customers/setCustomer.vue'),
        meta: {
          title: t('customers.meta.set_title'),
          icon: 'clipboard-line',
          activeMenu: 'customer-list',
          hidden: true,
          role: PERMISSION_ENUM.customer_create,
        },
        // children: [
        //   {
        //     path: '',
        //     name: 'pasport-info',
        //     component: () => import('/src/views/customers/PasportInfo.vue'),
        //     meta: {
        //       title: 'pasport-info',
        //       icon: 'clipboard-line',
        //       activeMenu: 'customer-list',
        //       hidden: true,
        //       role: PERMISSION_ENUM.customer_create,
        //     },
        //   },
        //   {
        //     path: '/contactInfo',
        //     name: 'contact-info',
        //     component: () => import('/src/views/customers/ContactInfo.vue'),
        //     meta: {
        //       title: 'contact-info',
        //       icon: 'clipboard-line',
        //       activeMenu: 'customer-list',
        //       hidden: true,
        //       role: PERMISSION_ENUM.customer_create,
        //     },
        //   },
        //   {
        //     path: 'single-customer',
        //     name: 'single-customer',
        //     component: () => import('/src/views/customers/SingleCustomer.vue'),
        //     meta: {
        //       title: 'pasport-info',
        //       icon: 'clipboard-line',
        //       activeMenu: 'customer-list',
        //       hidden: true,
        //       role: PERMISSION_ENUM.customer_create,
        //     },
        //   },
        // ],
      },
      {
        path: '/singleCustomer',
        name: 'single-customer',
        component: () => import('/src/views/customers/singleCustomer/index.vue'),
        meta: {
          title: t('customers.meta.single_title'),
          icon: 'clipboard-line',
          activeMenu: 'customer-list',
          hidden: true,
          role: PERMISSION_ENUM.customer_view,
        },
      },
    ],
  },
]
