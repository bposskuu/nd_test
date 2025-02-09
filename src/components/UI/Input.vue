<template>
  <div class="inputContainer">
    <label for="inputName" class="topInputLabel text_small"><slot name="label"></slot></label>
    <div class="inputWithEye">
      <input type="text" class="input text_small" placeholder="Введите значение" @input="updateInput" :value="modelValue" v-bind="$attrs" ref="input" v-if="!isTextarea">
      <textarea class="textarea text_small" placeholder="Введите значение" @input="updateInput" :value="modelValue" v-bind="$attrs" v-else></textarea>
      <div class="eye" v-if="'type' in $attrs && $attrs.type === 'password'" @click="switchPasswordView">
        <img src="@/assets/images/eye.svg" alt="" v-if="eyeSwitch">
        <img src="@/assets/images/no_eye.svg" alt="" v-else>
      </div>
    </div>
    <div class="bottom" v-if="showCharCounter">
      <label for="inputName" class="errorLabel text_small"></label>
      <label for="inputName" class="charCounter text_small">{{ charCount }}/{{ $attrs['maxlength'] }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, type ShallowRef, useTemplateRef} from 'vue'

export default defineComponent({
  props: {
    modelValue: [String],
    showCharCounter: {
      type: Boolean,
      required: false
    },
    isTextarea: {
      type: Boolean,
      required: false
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const charCount = ref(Number(0))
    const inputRef:ShallowRef = useTemplateRef('input')
    const eyeSwitch = ref(false)

    const updateInput = function updateInput(e: any) {
      charCount.value = e.target.value.length
      emit('update:modelValue', e.target.value)
      //this.$emit('update:modelValue', e.target.value)
    }

    const switchPasswordView = function switchPasswordView(): void {
        inputRef.value['type'] = inputRef.value['type'] === 'text' ? 'password' : 'text'
        eyeSwitch.value = !eyeSwitch.value
    }

    return {
      charCount,
      updateInput,
      switchPasswordView,
      eyeSwitch,
    }
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;

.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .topInputLabel {
    color: $gray;
    margin-left: 24px;
  }

  .input, .textarea {
    border-radius: 36px;
    width: 100%;
    padding: 22.5px 28px;
    border: none;
    resize: none;
    gap: 8px;
    font-family: "Montserrat",sans-serif;

    &:hover, &:focus {
      border: 2px solid $green-light;
      outline: none;
    }
  }

  .textarea {
    height: 250px;
    padding: 16px 28px;
  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 24px;

     .errorLabel {
       color: #FF7461;
     }

    .charCounter {
      color: $gray;
    }
  }

  .inputWithEye {
    display: flex;
    flex-direction: row-reverse;

    .eye {
      position: absolute;
      margin-right: 24px;
      display: flex;
      align-self: center;
      cursor: pointer;
    }
  }
}
</style>