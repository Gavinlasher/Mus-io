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
    <div
      class="col-12 d-flex justify-content-start"
      v-if="route.name == 'Venue'"
    >
      <label for="bands" class="">Bands:</label>
      <select v-model="editable.bandId" class="ms-5" required>
        <option v-for="b in myBands" :key="b.id" :value="b.id">
          {{ b.name }}
        </option>
      </select>
    </div>
    <div
      class="col-12 d-flex justify-content-start"
      v-if="route.name == 'Band'"
    >
      <label for="venues" class="">Venues:</label>
      <select v-model="editable.venueId" class="ms-5" required>
        <option v-for="v in myVenues" :key="v.id" :value="v.id">
          {{ v.name }}
        </option>
      </select>
    </div>
    <div class="col-12">
      <label for="" class="form-label mt-5">Offer: </label>

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
import { bandsService } from "../services/BandsService"
import { useRoute } from "vue-router"
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    watchEffect(async () => {
      try {
        await venuesService.getAll()
        await bandsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      route,
      myBands: computed(() => AppState.bands.filter(b => b.creatorId == AppState.account.id)),
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.account.id)),
      creator: computed(() => AppState.activeBand.creator),
      editable,
      async sendOffer() {
        try {
          if (route.name == "Venue") {
            logger.log(AppState.activeVenue.creatorId)
            editable.value.venueId = AppState.activeVenue.id
            editable.value.recipientId = AppState.activeVenue.creatorId
            await offersService.createOffer(editable.value)
          }
          if (await route.name == "Band") {
            editable.value.bandId = AppState.activeBand.id
            editable.value.recipientId = AppState.activeBand.creatorId
            await offersService.createOffer(editable.value)
          }
          Modal.getOrCreateInstance(document.getElementById('create-offer')).hide()
          Pop.toast("Offer Sent!", 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }


      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>