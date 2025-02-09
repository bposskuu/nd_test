<template>
  <Modal>
    <template v-slot:header>
      Добавление заметки
    </template>
    <Input v-model="title" show-char-counter maxlength="100">
      <template v-slot:label>Название заметки</template>
    </Input>
    <Input v-model="content" is-textarea show-char-counter maxlength="500">
      <template v-slot:label>Текст заметки</template>
    </Input>
    <template v-slot:footer>
      <Button @click="async () => { warning = await notes.postNote(title, content); if (!warning) app.showModal = '' }">Добавить</Button>
    </template>
    <template v-slot:warning v-if="warning">
      {{ warning }}
    </template>
  </Modal>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Modal from "@/components/UI/Modal.vue";
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";
import {useNotesStore} from "@/stores/notes.ts";
import {useAppStore} from "@/stores/app.ts";

export default defineComponent({
  components: {Input, Button, Modal},
  setup() {
    const app = useAppStore()
    const notes = useNotesStore()

    const title = ref('')
    const content = ref('')
    const warning = ref('')

    return {
      title,
      content,
      warning,
      notes,
      app
    }
  }
})
</script>

<style scoped>

</style>