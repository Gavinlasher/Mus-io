<template>
  <div class="container-fluid">
    <div class="p-5"></div>
    <div v-for="m in messages" :key="m.id" class="row mx-4 mt-2 rounded shadow">
      <Message :message="m" />
    </div>
    <div class="p-5">
      <form @submit.prevent="createMessage">
        <textarea
          v-model="editable.body"
          class="col-12 mt-3 rounded"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div class="row d-flex justify-content-end me-3">
          <button class="col-2 rounded btn-success">Send</button>
        </div>
      </form>
    </div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { offersService } from "../services/OffersService"
import { messagesService } from "../services/MessagesService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { socketService } from "../services/SocketService"
export default {
  name: 'Offer',
  setup() {
    const route = useRoute();
    const editable = ref({});
    onMounted(async () => {
      try {
        socketService.joinRoom('offer-' + route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.massage, 'error')
      }
    })
    watchEffect(async () => {
      try {
        await offersService.getOfferById(route.params.id)
        await messagesService.getMessagesByOffer(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      editable,
      async createMessage() {
        try {
          await messagesService.createMessage(editable.value, route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      messages: computed(() => AppState.messages)
    }
  }
}
</script>

<style>
</style>