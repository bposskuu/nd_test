<template>
  <div class="wrap">
    <div class="notesContainer">
      <XButton v-bind:rotated="true" class="addNoteButton" @click="app.showModal = 'SHOW_ADD_NOTE'" />
      <Note
          v-for="note in notes.notes"
          :key="note.id"
          :note="note"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import XButton from "@/components/UI/XButton.vue";
import {useNotesStore} from "@/stores/notes.ts";
import Note from "@/components/Note.vue";
import {useAppStore} from "@/stores/app.ts";

export default defineComponent({
  components: {Note, XButton},
  setup() {

    const notes = useNotesStore()
    const app = useAppStore()

    onMounted(async () => {
      await notes.getNotes()
    })


    return {
      notes,
      app
    }
  }
})
</script>

<style scoped lang="scss">
.addNoteButton {
  position: fixed;
  bottom: 24px;
  right: 5px;
  z-index: 9;
}

.wrap {
  display: flex;
  width: 100%;
  justify-content: center;
}

.notesContainer {
  display: flex;
  width: 90%;
  padding: 40px 0;
  flex-wrap: wrap;
  gap:40px;
  column-gap: 5%;

}
</style>