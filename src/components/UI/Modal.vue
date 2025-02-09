<template>
    <div class="modal" @click="">
        <div class="wrap">
            <CloseButton class="closeBtn" @click="app.showModal = ''" />
            <div class="content" @click.stop>
                <h2 class="h2-mob"><slot name="header"></slot></h2>
                <slot></slot>
                <div class="modalFooter">
                  <slot name="footer"></slot>
                </div>
                <div class="warning" v-if="$slots.warning">
                  <span class="text_small">
                    <slot name="warning"></slot>
                  </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted} from 'vue'
import XButton from "@/components/UI/XButton.vue";
import {useAppStore} from "@/stores/app.ts";

export default defineComponent({
    components: {CloseButton: XButton},
    setup() {
      const app = useAppStore()

      onMounted(() => {
        document.body.style.overflowY = 'hidden'
      })

      onUnmounted(() => {
        document.body.style.removeProperty('overflow-y')
      })


        return {
        app,
        }
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba($dark, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  font-size: 16px;

    .wrap {
        display: flex;
        width: 45%;
        flex-direction: column;
        border-radius: 40px;
        background: $dark-middle;

        .closeBtn {
            position: absolute;
            margin: 24px 24px 0 0;
        }
        .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 40px;
            padding: 80px;

            .modalFooter {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              @media (max-width: 500px) {
                & {
                  flex-direction: column-reverse;
                  gap: 12px;
                }
              }
            }

            .warning {
              display: flex;
              width: 100%;
              background-color: rgba(#FF7461, 0.1);
              border-radius: 24px;
              color: #FF7461;
              padding: 8px 20px;
            }

          @media (max-width: 1100px) {
            & {
              gap: 28px;
            }
          }
        }

      @media (max-width: 1100px) {
        & {
          width: 80%;
        }
      }

      @media (max-width: 768px) {
        & {
          width: 90%;
        }
      }

      @media (max-width: 500px) {
        & {
          width: 100%;
          height: 100%;
        }
      }
    }

}

@media (max-width: 500px) {
  :slotted(button) {
    width: 100%;
    height: 56px;
  }
}

</style>