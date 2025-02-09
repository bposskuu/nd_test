<template>
  <article class="note">
    <div class="border"></div>
    <div class="content">
      <div class="noteElement title">
        <h4>{{ note.title }}</h4>
      </div>
      <div class="noteElement">
        <span class="text_normal">{{ note.content }}</span>
      </div>
      <div class="deleteNote" @click="deleteNote">
        <img src="../assets/images/close.svg" alt="">
        Удалить
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useNotesStore} from "@/stores/notes.ts";

export default defineComponent({
  props: {
    note: {
      type: Object,
      required: true
    },
  },
  setup(note) {
    const notes = useNotesStore()

    const deleteNote = async () => {
      await notes.deleteNote(note.note.id)
    }

    return {
      deleteNote
    }
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;

.note {
  width: 30%;
  background-color: $green-light;
  display: inline-flex;
  flex-direction: row-reverse;
  border-radius: 12px;
  align-self: flex-start;

  &:before{
    content:"";
    border-top:20px solid $dark;
    border-right:20px solid $dark;

    border-bottom:20px solid $green;
    border-left:20px solid $green;
    position:absolute;
    border-bottom-left-radius:12px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .noteElement {
      padding: 20px 28px;
    }
    .title {
      border-bottom: 1px solid $green-middle;
    }
    .deleteNote {
      display: flex;
      align-items: center;
      padding: 24px;
      gap: 12px;
      justify-content: flex-end;
      cursor: pointer;
      user-select: none;
    }
  }

  @media (max-width: 1150px) {
    & {
      width: 47.5%;
    }
  }

  @media (max-width: 768px) {
    & {
      width: 100%;
    }
  }
}
</style>