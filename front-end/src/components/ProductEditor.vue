<template>
  <v-dialog v-model="model" max-width="600">
    <v-card color="foreground">
      <v-card-title>
        <EditorContent :editor="titleEditor" class="tiptap-editor" />
      </v-card-title>

      <v-card-subtitle>Descrição</v-card-subtitle>

      <div class="px-3">
        <v-btn-toggle 
          multiple 
          variant="outlined"
          color="primary"
          divided
        >
          <v-btn 
            icon="mdi-format-bold" 
            size="small"
            @click="descriptionEditor.chain().focus().toggleBold().run()"
          ></v-btn>

          <v-btn 
            icon="mdi-format-italic" 
            size="small"
            @click="descriptionEditor.chain().focus().toggleItalic().run()"
          ></v-btn>

          <v-btn 
            icon="mdi-format-underline" 
            size="small"
            @click="descriptionEditor.chain().focus().toggleUnderline().run()"
          ></v-btn>
        </v-btn-toggle>

        <v-btn-toggle 
          mandatory
          variant="outlined"
          color="primary"
          divided
          class="ml-2"  
        >
          <v-btn
            size="small"
            icon="mdi-format-list-bulleted"
            @click="descriptionEditor.chain().focus().toggleBulletList().run()"
          ></v-btn>

          <v-btn
            size="small"
            icon="mdi-format-list-numbered"
            @click="descriptionEditor.chain().focus().toggleOrderedList().run()"
          ></v-btn>

          <v-btn
            size="small"
            icon="mdi-format-list-checkbox"
            @click="descriptionEditor.chain().focus().toggleTaskList().run()"
          />
        </v-btn-toggle>
      </div>
      <v-card-text class="pa-3">
        <!-- Editor Tiptap -->
        <EditorContent :editor="descriptionEditor" class="tiptap-editor" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" @click="save">Salvar</v-btn>
        <v-btn variant="text" @click="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, watch, onBeforeUnmount } from 'vue'
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import type { Product } from '../modules/products/store/products.store'
  import TaskList from '@tiptap/extension-task-list'
  import TaskItem from '@tiptap/extension-task-item'

  const props = defineProps<{
    modelValue: boolean
    product: Product | null
  }>()

  const emit = defineEmits(['update:modelValue', 'save'])

  const model = ref(props.modelValue)
  const localProduct = ref({ ...props.product })
  const titleEditor = new Editor({
    extensions: [StarterKit],
    content: props.product?.name ?? '',
    autofocus: true,
    onUpdate: ({ editor }) => {
      localProduct.value.name = editor.getText()
    }
  })
  //Editor Tiptap
  const descriptionEditor = new Editor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      })
    ],
    content: props.product?.description ?? '',
    autofocus: true,
    onUpdate: ({ editor }) => {
      localProduct.value.description = editor.getJSON()
    }
  })

  // Reabrir com dados atualizados quando o diálogo abre
  watch(
    () => props.modelValue,
    (v) => {
      model.value = v

      if (v) {
        localProduct.value = { ...props.product }
        titleEditor.commands.setContent(props.product?.name || '')
        descriptionEditor.commands.setContent(props.product?.description || '')
      }
    }
  )

  // Fechar o diálogo
  function close() {
    emit('update:modelValue', false)
  }

  // Salvar dados
  function save() {
    emit('save', { ...localProduct.value })
    close()
  }

  onBeforeUnmount(() => {
    titleEditor.destroy()
    descriptionEditor.destroy()
  })
</script>

<style scoped>
  :deep(.tiptap-editor .ProseMirror) {
    outline-width: 0px;
  }

  :deep(.tiptap-editor) ul[data-type="taskList"] {
    margin-top: 20px;
  }

  :deep(.tiptap-editor) ul[data-type="taskList"] li {
    display: flex;
    align-items: center;
  }

  :deep(.tiptap-editor) ul[data-type="taskList"] li label {
    margin-right: 15px;
  }

  :deep(.tiptap-editor) ul[data-type="taskList"] li input[type="checkbox"] {
     /* removendo o estilo padrão */
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border: 2px solid rgb(var(--v-theme-primary)); /* cor quando DESMARCADO */
    border-radius: 4px;
    background: transparent;
    display: block;
    position: relative;
  }

  :deep(.tiptap-editor) ul[data-type="taskList"] li input[type="checkbox"]:checked {
    background: rgb(var(--v-theme-primary));
    border-color: rgb(var(--v-theme-primary));
  }

  :deep(.tiptap-editor) ul[data-type="taskList"] li input[type="checkbox"]:checked::after {
    content: '✔';
    color: white;
    font-size: 14px;
    position: absolute;
    top: -2px;
    left: 2px;
  }

  :deep(.tiptap-editor) ol li {
    margin: 20px 0  20px 20px;
  }

  :deep(.tiptap-editor) ul:not([data-type='taskList']) li {
    margin: 20px 0 20px 20px;
  }
</style>
