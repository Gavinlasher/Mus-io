<template>
  <div class="container-fluid">
    <div class="row">
      <div class="div mt-5"></div>
      <div class="col-12 p-4 mt-4">
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
                <button
                  class="btn btn-primary rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#create-offer"
                >
                  Send Offer
                </button>
              </div>
              <div
                class="col-12 ps-4 pb-3"
                v-if="venue.creatorId == account.id"
              >
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
      <div
        class="col-md-4 text-light mb-5 ms-4 selectable"
        @click="goTo(venue.creator.id)"
        title="venue manager"
      >
        <div class="row">
          <div class="col-12">
            <h4 class="border-bottom">Venue Manager</h4>
          </div>
          <div class="col-12">
            <img
              class="img-fluid pp mt-4"
              :src="venue.creator.picture"
              alt=""
              srcset=""
              :title="venue.creator.name"
            />
          </div>
          <div class="col-12 mt-4">
            <h6><i class="mdi mdi-email"></i> {{ venue.creator.email }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="edit-venue">
    <template #title> Edit Venue</template>
    <template #body><VenueForm /></template>
  </Modal>
  <Modal id="create-offer">
    <template #title> Create Offer</template>
    <template #body><OfferForm /> </template>
  </Modal>
</template>


<script>
import { computed, popScopeId, reactive, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { venuesService } from "../services/VenuesService"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
import { profilesService } from "../services/ProfilesService"
import Calendar from "../components/Calendar.vue"

export default {
  components: { Calendar },
  setup() {

    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      if (route.name == 'Venue') {
        await venuesService.getVenueById(route.params.id)
      }
    })
    return {
      venue: computed(() => AppState.activeVenue),
      account: computed(() => AppState.account),
      async goTo(id) {
        try {
          await profilesService.getProfile(id)
          router.push({
            name: 'Profile',
            params: { id: AppState.profile.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      }

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
.pp {
  height: 15vh;
  width: 15vh;
  border: 1px solid whitesmoke;
  border-radius: 50%;
}
</style>