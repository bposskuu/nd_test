<template>
  <Header />
  <RouterView />
  <LoginPopUp v-if="app.showModal === 'SHOW_LOGIN'" />
  <RegisterPopUp v-if="app.showModal === 'SHOW_REGISTRATION'" />
  <AddNotePopUp v-if="app.showModal === 'SHOW_ADD_NOTE'" />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import HomeView from "@/views/HomeView.vue";
import {defineComponent, onMounted} from 'vue'
import Modal from "@/components/UI/Modal.vue";
import LoginPopUp from "@/components/LoginPopUp.vue";
import RegisterPopUp from "@/components/RegisterPopUp.vue";
import {useAppStore} from "@/stores/app.ts";
import {useUserStore} from "@/stores/user.ts";
import AddNotePopUp from "@/components/AddNotePopUp.vue";


export default defineComponent({
  components: {
    AddNotePopUp,
    RegisterPopUp,
    LoginPopUp,
    Modal,
    Header,
    Home: HomeView
  },
  setup() {
    const app = useAppStore()
    const user = useUserStore()

    onMounted(async () => {
        await user.auth()
    })

    return {
      app
    }
  }
})
</script>

<style lang="scss">

</style>
