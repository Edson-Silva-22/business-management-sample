<template>
  <v-container>
    <h2 class="mb-5">Linha de Produção</h2>

    <v-sheet class="bg-background d-flex ga-3">
      <v-card 
        v-for="(group) in groupedProducts"
        :key="group.status"
        class="w-full pa-2" 
        variant="outlined" 
        color="foreground"
      >
        <h3 class="text-center text-white ma-5">{{ group.title }}</h3>

        <draggable
          v-model="group.items"
          group="products"
          item-key="id"
          @end="onDropCard($event, group.status)"
          class="d-flex ga-2 flex-column"
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
                >
                  <v-card-title primary-title class="text-white">
                    {{ element.name }}
                  </v-card-title>
      
                  <v-card-text class="text-white">
                    {{ element.description }}
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </template>
        </draggable>

      </v-card>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'
  import { ref, computed } from 'vue'

  const products = ref([
    {
      id: 1,
      name: 'Produto 01',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique illo, nisi a debitis nulla dignissimos, blanditiis dolorem, ullam voluptatem dolor id.',
      status: 'notStarted'
    },
    {
      id: 2,
      name: 'Produto 02',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique illo, nisi a debitis nulla dignissimos, blanditiis dolorem, ullam voluptatem dolor id.',
      status: 'notStarted'
    },
    {
      id: 3,
      name: 'Produto 03',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, provident dicta fugiat impedit suscipit deserunt!',
      status: 'notStarted'
    },
    {
      id: 4,
      name: 'Produto 04',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores maiores sed explicabo perferendis doloribus quas!',
      status: 'inProgress'
    },
    {
      id: 5,
      name: 'Produto 05',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia enim dolore dicta exercitationem.',
      status: 'inProgress'
    },
    {
      id: 6,
      name: 'Produto 06',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ipsa voluptate dolorem molestias velit!',
      status: 'inProgress'
    },
    {
      id: 7,
      name: 'Produto 07',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod pariatur temporibus repudiandae doloremque odit.',
      status: 'review'
    },
    {
      id: 8,
      name: 'Produto 08',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, totam magni perspiciatis sit nostrum!',
      status: 'review'
    },
    {
      id: 9,
      name: 'Produto 09',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptate soluta dolorem earum minima!',
      status: 'review'
    },
    {
      id: 10,
      name: 'Produto 10',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ad voluptas quibusdam earum tempora.',
      status: 'done'
    },
    {
      id: 11,
      name: 'Produto 11',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, velit cumque nesciunt ratione vero.',
      status: 'done'
    },
    {
      id: 12,
      name: 'Produto 12',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, repellat possimus. Corrupti, quis!',
      status: 'done'
    }
  ])
  const stages = [
    { title: 'Não Iniciados', status: 'notStarted' },
    { title: 'Em Produção', status: 'inProgress' },
    { title: 'Em Revisão', status: 'review' },
    { title: 'Finalizado', status: 'done' }
  ]
  const groupedProducts = computed(() =>
    stages.map(stage => ({
      ...stage,
      items: products.value.filter(p => p.status === stage.status)
    }))
  )

  function onDropCard(event: any, newStatus: string) {
    const movedId = event.item?.__draggable_context?.element?.id
    const product = products.value.find(p => p.id === movedId)
    if (product) {
      product.status = newStatus
    }
  }

</script>