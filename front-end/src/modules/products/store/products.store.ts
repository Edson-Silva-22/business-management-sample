import { useApi } from '@/plugins/http-client'
import { defineStore } from 'pinia'

export interface Product {
  _id: string
  name: string
  status: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

export const useProductsStore = defineStore('products', () => {
  const loading = ref(false)

  async function findAllProducts() {
    loading.value = true
    const response = await useApi('get', '/products')
    loading.value = false
    return response
  }

  async function updateProduct(productId: string, data: Partial<Product>) {
    loading.value = true
    const response = await useApi('put', `/products/${productId}`, data)
    loading.value = false
    return response
  }

  return {
    loading,
    findAllProducts,
    updateProduct
  }
})