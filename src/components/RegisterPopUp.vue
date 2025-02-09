<template>
  <Modal v-if="!registeredFlag">
    <template v-slot:header>
      Регистрация
    </template>
    <Input v-model="email">
      <template v-slot:label>Email</template>
    </Input>
    <Input type="password" v-model="password">
      <template v-slot:label>Пароль</template>
    </Input>
    <Input type="password" v-model="password_confirm">
      <template v-slot:label>Пароль еще раз</template>
    </Input>
    <template v-slot:footer>
      <span class="text_small">У вас уже есть аккаунт? <a href="#" class="text_small_bold" @click="app.showModal = 'SHOW_LOGIN'">Войдите</a></span>
      <Button @click="clickRegister">Зарегистрироваться</Button>
    </template>
    <template v-slot:warning v-if="warning">
      {{ warning }}
    </template>
  </Modal>
  <Modal v-else>
    <template v-slot:header>
      Спасибо за регистрацию!
    </template>
    <span class="text_small"><a href="#" @click="app.showModal = 'SHOW_LOGIN'">Войдите</a> в свой аккаунт используя введенные данные при регистрации.</span>
  </Modal>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Input from "@/components/UI/Input.vue";
import Modal from "@/components/UI/Modal.vue";
import Button from "@/components/UI/Button.vue";
import {useNotesStore} from "@/stores/notes.ts";
import {useUserStore} from "@/stores/user.ts";
import {useAppStore} from "@/stores/app.ts";

export default defineComponent({
  components: {Button, Modal, Input},
  setup() {
    const notes = useNotesStore()
    const user = useUserStore()
    const app = useAppStore()

    const email = ref('')
    const password = ref('')
    const password_confirm = ref('')
    const warning = ref('')
    const registeredFlag = ref(false)

    const clickRegister = async function() {
        warning.value = await user.registration(email.value, password.value, password_confirm.value)
        if (!warning.value) registeredFlag.value = true
    }


    return {
      notes,
      email,
      password,
      password_confirm,
      user,
      warning,
      clickRegister,
      registeredFlag,
      app
    }
  }
})
</script>

<style scoped>

</style>