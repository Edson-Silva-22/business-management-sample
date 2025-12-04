<template>
  <v-container>
    <h2 class="mb-5">Linha de Produção</h2>

    <v-sheet class="bg-background d-flex ga-3">
      <v-card 
        v-for="(group) in groupedProducts"
        :key="group.status"
        class="w-25 pa-2" 
        variant="outlined" 
        color="foreground"
      >
        <h3 class="text-center text-white ma-5">{{ group.title }}</h3>

        <draggable
          v-model="group.items"
          group="products"
          item-key="id"
          @change="onDropCard($event, group.status)"
          class="d-flex ga-2 flex-column"
          v-if="productsStore.loading == false"
        >
          <template #item="{ element }">
            <div>
              <v-hover
                v-slot="{ isHovering, props }"
              >
                <v-card
                  v-bind="props"
                  :color="isHovering ? 'primary' : 'foreground'"
                  class="cursor-pointer"
                  @click="openDialogEditProduct = true; selectProduct = element"
                >
                  <v-card-title primary-title class="text-white">
                    {{ element.name }}
                  </v-card-title>
      
                  <v-card-text class="text-white">
                    <ProductView :product="element" />
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </template>
        </draggable>

        <v-skeleton-loader 
          v-else 
          type="article"
          class="mb-2"
          color="foreground"
        ></v-skeleton-loader>

      </v-card>
    </v-sheet>

    <ProductEditor
      v-model="openDialogEditProduct"
      :product="selectProduct"
      @save="updateTask"
    />
  </v-container>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'
  import { ref, computed } from 'vue'
  import { useProductsStore, type Product } from '../store/products.store'

  const productsStore = useProductsStore()
  const products = ref<Product[] | []>([])
  const stages = [
    { title: 'Não Iniciados', status: 'notStarted' },
    { title: 'Em Produção', status: 'inProgress' },
    { title: 'Em Revisão', status: 'review' },
    { title: 'Finalizado', status: 'done' }
  ]
  const groupedProducts = computed(() =>
    stages.map(stage => ({
      ...stage,
      items: products.value!.filter(p => p.status === stage.status)
    }))
  )
  const openDialogEditProduct = ref(false)
  const selectProduct = ref<Product | null>(null)

  async function onDropCard(event: any, targetStatus: string) {
    // Movimentação entre as colunas de status
    if (event && event.added && event.added.element) {
      const elementMoved = event.added.element
      await productsStore.updateProduct(elementMoved._id, { status: targetStatus })
    }

    // Reordenação dentro da mesma coluna
    if (event && event.moved && event.moved.element) {
      const elementMoved = event.moved.element
      const prevElement = products.value![event.moved.newIndex - 1]
      const nextElement = products.value![event.moved.newIndex + 1]

      await productsStore.updateProduct(elementMoved._id, { order: 
        prevElement && nextElement
          ? (prevElement.order + nextElement.order) / 2
          : prevElement
            ? prevElement.order + 1
            : nextElement
              ? nextElement.order - 1
              : 0
      })
    }
  }

  async function updateTask(updated: Product) {
    // Aqui você chama sua API para salvar no backend
    await productsStore.updateProduct(updated._id, {
      name: updated.name,
      description: updated.description
    })
  }

  onMounted(async () => {
    products.value = await productsStore.findAllProducts()
  })
</script>