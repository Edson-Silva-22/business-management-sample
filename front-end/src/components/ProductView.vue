<template>
  <EditorContent :editor="descriptionEditor" class="tiptap-editor" />
</template>

<script lang="ts" setup>
  import { onBeforeUnmount } from 'vue'
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import type { Product } from '../modules/products/store/products.store'
  import TaskList from '@tiptap/extension-task-list'
  import TaskItem from '@tiptap/extension-task-item'

  const props = defineProps<{
    product: Product | null
  }>()

  const descriptionEditor = new Editor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      })
    ],
    content: props.product?.description ?? '',
    editable: false,
  })

  onBeforeUnmount(() => {
    descriptionEditor.destroy()
  })
</script>