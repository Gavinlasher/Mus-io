<template>
  <div class="container-fluid bg-gradient">
    <div class="row justify-content-start ms-5">
      <div class="p-5"></div>
      <div class="col-6 mt-3">
        <div class="d-flex align-items-center">
          <img
            :src="account.picture"
            class="img-fluid cropped border border-dark"
            alt="Profile Picture of the User"
          />

          <h2 class="ms-3 text-light">{{ account.name }}</h2>
        </div>
      </div>

      <div class="col-6 p-3">
        <button
          class="btn btn-success rounded-pill me-5 hoverable"
          data-bs-toggle="modal"
          data-bs-target="#create-performer"
        >
          Add New Performer
        </button>
        <button
          class="btn btn-success rounded-pill hoverable"
          data-bs-toggle="modal"
          data-bs-target="#create-venue"
        >
          Add New Venue
        </button>
        <button
          class="btn btn-success rounded-pill ms-5 me-5 hoverable"
          data-bs-toggle="modal"
          data-bs-target="#edit-account"
        >
          Edit Account
        </button>
      </div>
    </div>
    <h1 class="text-center text-light custom-text p-3">My Preformers</h1>
    <div class="row justify-content-center p-0 mt-5">
      <div
        class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded"
        v-for="b in band"
        :key="b.id"
      >
        <PerformerCard :band="b" />
      </div>
    </div>
    <h1 class="text-center text-light custom-text p-3">My Venues</h1>
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
  <!-- <OffCanvas> </OffCanvas> -->
  <OffCanvas>
    <template #requests>
      <div class="row">
        <div class="col-8" v-for="o in offers" :key="o.id">
          <div v-if="o.creatorId == account.id">
            <h4>{{ o.band.name }} is wanting to friend you</h4>
            <h4>{{ o.body }} || this persons budget is {{ o.band.price }}</h4>
          </div>
        </div>
      </div>
    </template>
  </OffCanvas>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import { bandsService } from "../services/BandsService"
import { venuesService } from "../services/VenuesService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await bandsService.getAll()
        await venuesService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      band: computed(() => AppState.bands),
      venue: computed(() => AppState.venues),
      offers: computed(() => AppState.offers)
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
