<template>
    <Modal>
      <template v-slot:header>
        Вход в ваш аккаунт
      </template>
      <Input v-model="email">
        <template v-slot:label>Email</template>
      </Input>
      <Input v-model="password" type="password">
        <template v-slot:label>Пароль</template>
      </Input>
      <template v-slot:footer>
        <span class="text_small">У вас нет аккаунта? <a href="#" class="text_small_bold" @click="app.showModal = 'SHOW_REGISTRATION'">Зарегистрируйтесь</a></span>
        <Button @click="async () => { warning = await user.login(email, password); if (!warning) app.showModal = '' }">Войти</Button>
      </template>
      <template v-slot:warning v-if="warning">
        {{ warning }}
      </template>
    </Modal>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Input from "@/components/UI/Input.vue";
import Modal from "@/components/UI/Modal.vue";
import Button from "@/components/UI/Button.vue";
import {useAppStore} from "@/stores/app.ts";
import {useUserStore} from "@/stores/user.ts";

export default defineComponent({
  components: {Button, Modal, Input},
    setup() {
        const app = useAppStore()
        const user = useUserStore()

        const email = ref('')
        const password = ref('')
        const warning = ref('')

        return {
          app,
          email,
          password,
          user,
          warning,
        }
    }
})
</script>

<style scoped>

</style>