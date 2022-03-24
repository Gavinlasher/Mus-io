<template>
  <div class="container-fluid">
    <div class="row mt-3 justify-content-start ms-5">
      <div class="col-2">
        <img :src="account.picture" class="img-fluid cropped" alt="" />
      </div>
      <div class="col-4 d-flex justify-content-start mt-3 pt-5">
        <h2>{{ account.name }}</h2>
      </div>
      <div class="col-4 mt-3 pt-5 justify-content-between">
        <button
          class="btn btn-success me-5"
          data-bs-toggle="modal"
          data-bs-target="#create-performer"
        >
          Add New Performer
        </button>
        <button
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#create-venue"
        >
          Add New Venue
        </button>
        <button
          class="btn btn-info ms-5"
          data-bs-toggle="modal"
          data-bs-target="#edit-account"
        >
          Edit Account
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="b in band" :key="b.id">
        <!-- <img :src="b.bannerImg" alt="" />
        {{ b.name }} -->
        <div class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded">
          <div class="col-12">
            <h1 class="ms-2 p-1">{{ b.name }}</h1>
            <h5 class="ms-4">{{ b.genre }}</h5>
            <img
              class="img-fluid rounded shadow mt-3"
              :src="b.bannerImg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="v in venue" :key="v.id">
        <!-- <img :src="v.bannerImg" alt="" />
        <h3>{{ v.location }}</h3> -->
        <div class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded">
          <div class="col-12">
            <h1 class="ms-2 p-1">{{ v.name }}</h1>
            <h5 class="ms-4">{{ v.location }}</h5>
            <img
              class="img-fluid rounded shadow mt-3"
              :src="v.bannerImg"
              alt=""
            />
          </div>
        </div>
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
    <!-- <template #body><template> -->
  </Modal>
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
      venue: computed(() => AppState.venues)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.cropped {
  border-radius: 50%;
  height: 300px;
  max-width: 300px;
}

/* .bg-darkblue{
  background-color: 
} */
</style>
