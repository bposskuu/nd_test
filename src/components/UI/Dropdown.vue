<template>
  <div class="dropdown">
    <div @click="primaryClick">
      <slot name="primary"></slot>
    </div>
    <div class="content" ref="dropdownContent">
      <div @click="contentClick"><slot></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, type ShallowRef} from 'vue'
import {useTemplateRef} from "vue";

export default defineComponent({
  setup() {
    const dropdownContent = <ShallowRef<any>>useTemplateRef('dropdownContent')
    const leftMargin = ref('')

    const contentClick = function () {
      dropdownContent.value.style.display = 'none'
    }

    const primaryClick = function () {
      dropdownContent.value.style.display = dropdownContent.value.style.display === 'flex' ? 'none' : 'flex'
      dropdownContent.value.style.left = 0 - dropdownContent.value.offsetWidth + dropdownContent.value.parentElement.children[0].offsetWidth + 'px'
      leftMargin.value = dropdownContent.value.offsetWidth - dropdownContent.value.parentElement.children[0].offsetWidth / 2 + 'px'
      dropdownContent.value.style.setProperty('--my-margin', leftMargin.value)
    }

    return {
      contentClick,
      dropdownContent,
      primaryClick,
      leftMargin,
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/colors' as *;
.dropdown {
  position: relative;

  .content {
    display: none;
    position: absolute;
    background-color: $dark-middle;
    width: max-content;
    z-index: 1;
    color: black;
    border-radius: 12px;
    flex-direction: column;
    box-shadow: 0 15px 46px -10px #00000099;
    margin-top: 20px;

    &::after {
      content: '';
      position: absolute;
      height: 10px;
      width: 10px;
      border-radius: 20px 0 0 0;
      background: $dark-middle;
      top: -5px;
      left: var(--my-margin);
      transform: translate(-50%, 0%) rotate(225deg) skew(-5deg, -5deg);
    }
  }
}

:slotted(label) {
  color: black;
  padding: 40px;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;

}
</style>