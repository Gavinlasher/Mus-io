<template>
  <div class="container-fluid bg-gradient">
    <div class="row">
      <div class="col-12 p-4">
        <img :src="venue.bannerImg" alt="" class="img-fluid img-banner" />
      </div>
      <div class="col-12 ps-4 pb-3">
        <h1 class="text-light title">{{ venue.name }}</h1>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-12 text-light ps-4 pb-3">
                Budget: ${{ venue.budget }}
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                Capacity: {{ venue.capacity }}
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                {{ venue.location }}
              </div>
              <div class="col-12 ps-4 pb-3">
                <button class="btn btn-primary rounded-pill">Send Offer</button>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button
                  class="btn btn-primary rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-venue"
                >
                  Edit Venue
                </button>
              </div>
            </div>
          </div>
          <div class="col-9 text-light">
            <h3 class="ps-4 pb-3">About</h3>
            <p class="ps-4 pb-3">
              {{ venue.bio }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 spacer" style="height: 15vh"></div>
    </div>
  </div>
  <Modal id="edit-venue">
    <template #title> Edit Venue</template>
    <template #body><VenueForm /></template>
  </Modal>
</template>


<script>
import { computed, popScopeId, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { venuesService } from "../services/VenuesService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {

    const route = useRoute()
    watchEffect(async () => {
      if (route.name == 'Venue') {
        await venuesService.getVenueById(route.params.id)
      }
    }
    )
    return {

      venue: computed(() => AppState.activeVenue),

    }
  }
}
</script>


<style lang="scss" scoped>
.img-banner {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}
.title {
  font-size: 40pt;
}
</style>