<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="sendOffer()"
  >
    <div class="col-12">
      <label for="" class="form-label">Offer: </label>

      <textarea
        v-model="editable.body"
        required
        rows="7"
        type="text"
        class="form-control mb-3 mt-3"
        aria-describedby="helpId"
        placeholder="offer details..."
      />
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary rounded-pill">Send Offer</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { offersService } from "../services/OffersService"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { venuesService } from "../services/VenuesService"
export default {
  setup() {
    const editable = ref({})
    watchEffect(async () => {
      try {
        await venuesService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.account.id)),
      creator: computed(() => AppState.activeBand.creator),
      editable,
      async sendOffer() {
        editable.value.recipientId = AppState.activeBand.creator.id
        editable.value.bandId = AppState.activeBand.id
        await offersService.createOffer(editable.value)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>