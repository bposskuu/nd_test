<template>
    <div class="welcome">
        <div class="message">
            <h1 class="h1-mob">Мои заметки</h1>
            <div class="bottom_message">
                <h3 class="h3-mob">Не забывай о важном, храни его в облаке.</h3>
            </div>
        </div>
        <div class="picture">
            <img src="../assets/images/picture.svg" alt="">
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, watch} from 'vue'
import {useUserStore} from "@/stores/user.ts";
import {useRouter} from "vue-router";

export default defineComponent({
    setup() {
        const user = useUserStore()
        const router = useRouter()

        const userId = computed(() => {
          return user.user.id
        })

        watch(userId, (newValue) => {
          if (newValue !== -1) {
            router.push({path: '/notes'})
          }
        })
        return {}
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;
.welcome {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .message {
        display: inline-flex;
        align-self: center;
        flex-direction: column;
        gap: 40px;

        .bottom_message {
            width: 65%;
            h3 {
                color: $gray;
            }
        }
    }

    .picture {
        display: inline-flex;
        justify-content: center;
        overflow: auto;

        img {
          overflow: auto;
        }
    }

    @media (max-width: 1920px) {
        & {
            padding: 0 160px;
        }
    }

    @media (max-width: 1366px) {
        & {
            padding: 0 80px;
        }
    }

    @media (max-width: 1200px) {
        & {
            padding: 0 40px;
            flex-direction: column;

            .message {
                gap: 20px;
                text-align: center;
                align-items: center;
            }
        }
    }

    @media (max-width: 360px) {
        & {
            padding: 0 20px;
            flex-direction: column;

            .message {
                gap: 20px;
                text-align: center;
                align-items: center;
            }
        }
    }
}
</style>