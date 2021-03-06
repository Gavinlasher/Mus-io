<template>
  <div class="container-fluid bg-gradient">
    <div class="row justify-content-start ms-5">
      <div class="p-5"></div>

      <div class="col-6 mt-3">
        <div class="d-flex align-items-center">
          <img
            :src="account.picture"
            class="img-fluid main-font cropped border border-dark"
            alt="Profile Picture of the User"
          />

          <h2 class="ms-3 main-font text-light">{{ account.name }}</h2>
        </div>
      </div>

      <div class="col-10 p-3">
        <button
          class="btn btn-success main-font rounded-pill me-5 hoverable"
          data-bs-toggle="modal"
          data-bs-target="#create-performer"
        >
          Add New Performer
        </button>
        <button
          class="btn btn-success main-font rounded-pill hoverable"
          data-bs-toggle="modal"
          data-bs-target="#create-venue"
        >
          Add New Venue
        </button>
        <button
          class="btn btn-success main-font rounded-pill ms-5 me-5 hoverable"
          data-bs-toggle="modal"
          data-bs-target="#edit-account"
        >
          Edit Account
        </button>
      </div>
    </div>
    <h1 class="text-center text-light custom-text p-3 main-font">
      My Performers
    </h1>
    <div class="row justify-content-center p-0 mt-5">
      <div
        class="col-3 p-1 my-1 mx-1 bg-grey shadow rounded"
        v-for="b in band"
        :key="b.id"
      >
        <PerformerCard :band="b" />
      </div>
    </div>
    <h1 class="text-center text-light custom-text p-3 main-font">My Venues</h1>
    <div class="row justify-content-center p-0 mt-5">
      <div
        class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded"
        v-for="v in venue"
        :key="v.id"
      >
        <VenueCard :venue="v" />
      </div>
    </div>
  </div>
  <Modal id="create-performer main-font">
    <template #title> Create Performer </template>
    <template #body><CreatePerformer :bandData="band" /></template>
  </Modal>
  <Modal id="create-venue main-font">
    <template #title> Create Venue </template>
    <template #body><CreateVenue :venueData="venue" /></template>
  </Modal>
  <Modal id="edit-account main-font">
    <template #title> Edit Account </template>
    <template #body><EditAccount :accountData="account" /></template>
  </Modal>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import { bandsService } from "../services/BandsService"
import { venuesService } from "../services/VenuesService"
import { offersService } from "../services/OffersService"
import { profilesService } from "../services/ProfilesService"
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        await bandsService.getAll()
        await offersService.getMyOffers()
        await venuesService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      band: computed(() => AppState.bands),
      venue: computed(() => AppState.venues),
      offers: computed(() => AppState.offers),
      offersBand: computed(() => AppState.activeBand),
      sentBand: computed(() => AppState.offers.filter(o => o.band.creatorId !== AppState.account.id)),
      async goTo(id) {
        try {
          await bandsService.getBandById(id)
          router.push({
            name: 'Band',
            params: { id: AppState.activeBand.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
      async goTo2(id) {
        try {
          await venuesService.getVenueById(id)
          router.push({
            name: 'Venue',
            params: { id: AppState.activeBand.id }
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

.main-font {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>
