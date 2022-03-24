<template>
  <div class="container-fluid bg-gradient">
    <div class="row justify-content-start ms-5">
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
          class="btn btn-primary ms-5 me-5"
          data-bs-toggle="modal"
          data-bs-target="#edit-account"
        >
          Edit Account
        </button>

        <!-- <OffCanvas> </OffCanvas> -->
        <OffCanvas>
          <template #requests>
            <div class="row">
              <div class="col-8" v-for="o in offers" :key="o.id">
                <div v-if="o.creatorId == account.id">
                  <h4>{{ o.band.name }} is wanting to friend you</h4>
                  <h4>
                    {{ o.body }} || this persons budget is {{ o.band.price }}
                  </h4>
                </div>
              </div>
            </div>
          </template>
        </OffCanvas>
      </div>
    </div>
    <div class="row justify-content-center p-0 mt-5">
      <div
        class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded"
        v-for="b in band"
        :key="b.id"
      >
        <!-- <img :src="b.bannerImg" alt="" />
        {{ b.name }} -->
        <!-- <div class="col-12">
            <h1 class="ms-2 p-1">{{ b.name }}</h1>
            <h5 class="ms-4">{{ b.genre }}</h5>
            <img
              class="img-fluid rounded shadow mt-3"
              :src="b.bannerImg"
              alt=""
            />
          </div> -->
        <PerformerCard :band="b" />
      </div>
    </div>
    <div class="row justify-content-center p-0 mt-5">
      <div
        class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded"
        v-for="v in venue"
        :key="v.id"
      >
        <!-- <img :src="v.bannerImg" alt="" />
        <h3>{{ v.location }}</h3> -->

        <!-- <div class="col-12">
            <h1 class="ms-2 p-1">{{ v.name }}</h1>
            <h5 class="ms-4">{{ v.location }}</h5>
            <img
              class="img-fluid rounded shadow mt-3"
              :src="v.bannerImg"
              alt=""
            />
          </div> -->
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
