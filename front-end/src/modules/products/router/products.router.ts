import Default from "@/layouts/default.vue";
import type { RouteRecordRaw } from "vue-router";

const productRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/modules/products/pages/index.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/modules/products/pages/production.vue')
      }
    ]
  }
]

export default productRoutes;