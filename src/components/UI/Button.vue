<template>
    <button class="loginButton">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    setup() {


        return {}
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;

.loginButton {
    background-color: $green-light;
    color: white;
    border-radius: 32px;
    padding: 12px 24px 12px 24px;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    border: none;
    user-select: none;
    justify-content: center;
    overflow: hidden;

    img {
        width: 32px;
    }

    &:hover {
        background-color: $green-middle;
    }

    &:active {
        background-color: $green-dark;
    }

    &:disabled{
        background-color: $gray;
    }
}

</style>