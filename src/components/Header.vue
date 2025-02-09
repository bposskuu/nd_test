<template>
    <header>
        <div class="header">
            <div class="logoContainer">
              <img src="../assets/images/logo.svg" alt="" class="logo">
            </div>
            <div class="account">
              <LoginButton @click="app.showModal = 'SHOW_LOGIN'" v-if="user.user.id === -1">
                <img src="../assets/images/login_logo.svg" alt="">
                Вход
              </LoginButton>
              <div class="userInfo" v-else>
                <span class="text_small">{{ user.user.email }}</span>
<!--                <a href="#" @click="user.logout">Выход</a>-->
                <Dropdown>
                  <template v-slot:primary>
                    <div class="profile">
                      <img src="@/assets/images/user.svg" alt="">
                    </div>
                  </template>
                  <label><a href="#" class="text_small_bold" @click="logout">Выйти</a></label>
                </Dropdown>
              </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Button from "@/components/UI/Button.vue";
import {useAppStore} from "@/stores/app.ts";
import {useUserStore} from "@/stores/user.ts";
import {useRouter} from "vue-router";
import Dropdown from "@/components/UI/Dropdown.vue";

export default defineComponent({
    components: {Dropdown, LoginButton: Button},
    setup() {
        const app = useAppStore()
        const user = useUserStore()
        const router = useRouter()

        const logout = () => {
          user.logout()
          router.push('/')
        }

        return {
          app,
          user,
          logout,
        }
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/colors' as *;

header {
    width: 100%;
}
.header {
    display: flex;
    width: 90%;
    justify-content: space-between;
    margin: 0 auto;
    align-items: center;

    @media (max-width: 1920px) {
        & {
            padding: 40px 0;
        }
    }

    @media (max-width: 1366px) {
        & {
            padding: 20px 0;
        }
    }

    @media (max-width: 440px) {
        .logoContainer .logo {
            height: 36px;
        }
    }

    @media (max-width: 440px) {
      .logoContainer {
        width: 40px;
        overflow: hidden;
      }
      .userInfo .profile {
        width: 36px;
        height: 36px;

        img {
          scale: 70%;
        }
      }
    }

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .profile {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $dark-middle;
    cursor: pointer;
  }
}


</style>