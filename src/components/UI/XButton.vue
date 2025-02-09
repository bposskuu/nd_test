<template>
    <button class="xButton">
        <img src="../../assets/images/close.svg" alt="" :class="{ 'rotated':rotated }">
    </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    rotated: {
      type: Boolean,
      default: false
    }
  },
    setup() {


        return {}
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;

.xButton{
  display: inline-flex;
  background-color: $green-light;
  border-radius: 32px;
  padding: 20px;
    align-self: flex-end;
    border: none;
    user-select: none;

    &:hover {
        background-color: $green-middle;
    }

    &:active {
        background-color: $green-dark;
    }

    &:disabled {
        background-color: $gray;
    }

    .rotated{
      transform: rotate(45deg);
    }
}
</style>