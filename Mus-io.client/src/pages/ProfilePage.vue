<template>
  <div class="container-fluid bg-gradient">
    <div class="row justify-content-start">
      <div class="p-5"></div>

      <div class="col-12 mt-3">
        <div class="">
          <img
            :src="profile.picture"
            class="img-fluid cropped border border-dark ms-5"
            alt="Profile Picture of the User"
          />

          <h2 class="ms-5 mt-3 text-light">{{ profile.name }}</h2>
        </div>
      </div>

      <div class="col-12 p-3 d-flex justify-content-around mt-3">
        <button
          class="btn btn-success rounded-pill m-2 hoverable"
          data-bs-toggle="modal"
          data-bs-target="#create-performer"
          v-if="account.id == profile.id"
        >
          Add New Performer
        </button>
        <button
          class="btn btn-success rounded-pill m-2 hoverable"
          data-bs-toggle="modal"
          data-bs-target="#create-venue"
          v-if="account.id == profile.id"
        >
          Add New Venue
        </button>
        <button
          class="btn btn-success rounded-pill  hoverable"
          data-bs-toggle="modal"
          data-bs-target="#edit-account"
          v-if="account.id == profile.id"
        >
          Edit Account
        </button>
      </div>
    </div>
    <h1
      class="text-center text-light custom-text p-3"
      v-if="account.id == profile.id"
    >
      My Preformers
    </h1>
    <h1 class="text-center text-light custom-text p-3" v-else>Preformers</h1>
    <div class="row justify-content-center p-3 mt-5">
      <div
        class="col-md-4 p-0 m-3 bg-grey shadow rounded hoverable"
        v-for="b in myBands"
        :key="b.id"
      >
        <PerformerCard :band="b" />

        <!-- <OffCanvas /> -->
      </div>
    </div>
    <h1
      class="text-center text-light custom-text p-3"
      v-if="account.id == profile.id"
    >
      My Venues
    </h1>
    <h1 class="text-center text-light custom-text p-3" v-else>Venues</h1>
    <div class="row justify-content-center p-3 mt-5">
      <div
        class="col-md-4 p-0 m-3 bg-grey shadow hoverable rounded"
        v-for="v in myVenues"
        :key="v.id"
      >
        <VenueCard :venue="v" />
      </div>
    </div>
  <Modal id="create-performer">
    <template #title> Create Performer </template>
    <template #body><CreatePerformer :bandData="band" /></template>
  </Modal>
  <Modal id="create-venue">
    <template #title> Create Venue </template>
    <template #body><CreateVenue :venueData="venue" /></template>
  </Modal>
  <Modal id="edit-account">
    <template #title> Edit Account </template>
    <template #body><EditAccount :accountData="account" /></template>
  </Modal>
  <OffCanvas id="request">
    <template #requests>
      <div class="row">
        <div class="col-8">
          {{ offersBand.name }}
        </div>
      </div>
    </template>
  </OffCanvas>

  <!-- <OffCanvas> </OffCanvas> -->
  <!-- <OffCanvas> -->
  <!-- <template #requests> -->
  <!-- <div class="row">
        <div class="col-8" v-for="o in offers" :key="o.id">
          <div v-if="o.creatorId == account.id">
            <h4>{{ o.band.name }} is wanting to friend you</h4>
            <h4>{{ o.body }} || this persons budget is {{ o.band.price }}</h4>
          </div>
        </div>
      </div> -->
  <!-- </template> -->
  <!-- </OffCanvas> -->
  </div>
  <!-- <OffCanvas /> -->
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import { bandsService } from "../services/BandsService"
import { venuesService } from "../services/VenuesService"
import { offersService } from "../services/OffersService"
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        await bandsService.getAll()
        await offersService.getMyOffers()
        await venuesService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          AppState.profile = {}

          await profilesService.getProfile(route.params.id)

        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      myBands: computed(() => AppState.bands.filter(b => b.creatorId == AppState.profile.id)),
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.profile.id)),
      offers: computed(() => AppState.offers),
      offersBand: computed(() => AppState.activeBand),
      sentBand: computed(() => AppState.offers.filter(o => o.band.creatorId !== AppState.account.id))
    }
  }
}
</script>

<style scoped>
img {
  height: 40vh;
  width: 40vh;
}
.custom-text {
  text-decoration: underline;
}

.cropped {
  border-radius: 50%;
  height: 30vh;
  max-width: 30vh;
  border: 2px solid rgba(135, 190, 202, 1);
}
.hoverable:hover {
  transform: scale(1.03);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
  cursor: pointer;
  user-select: none;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}

/* .bg-darkblue{
  background-color: 
} */
</style>
