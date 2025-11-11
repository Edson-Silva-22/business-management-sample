import productRoutes from "@/modules/products/router/products.router"
import { createRouter, createWebHistory } from "vue-router"

declare module 'vue-router' {
  interface RouteMeta {
    //permissões para acessar
    // roles?: string[]

    //exige autenticação
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...productRoutes
  ]
})

export default router