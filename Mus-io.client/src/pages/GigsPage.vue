<template>
  <div class="container-fluid">
    <h2 class="mt-5 capitalize text-light">My {{ filterBy }} Offers:</h2>
    <div class="col-4 btn btn-outline-primary" @click="filterBy = 'pending'">
      Pending
    </div>
    <div class="col-4 btn btn-outline-primary" @click="filterBy = 'accepted'">
      Accepted
    </div>
    <div class="col-4 btn btn-outline-primary" @click="filterBy = 'declined'">
      Declined
    </div>
    <div class="col-12 mt-5">
      <h2 class="mt-5 text-light">Offers From Bands:</h2>
      <div class="row mt-2">
        <div class="col-12" v-for="b in myBands" :key="b.id">
          <BandOfferGig :band="b" :filter="filterBy" />
        </div>
        <h2 class="mt-5 text-light">Offers From Venues:</h2>
        <div class="row mt-2">
          <div class="col-12" v-for="v in myVenues" :key="v.id">
            <VenueOfferGig :venue="v" :filter="filterBy" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="mt-4 text-light">Gigs:</h1>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="b in myBands" :key="b.id">
          <BandGig :band="b" />
        </div>
        <div class="col-md-3" v-for="v in myVenues" :key="v.id">
          <VenueGig :venue="v" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { bandsService } from '../services/BandsService'
import { venuesService } from '../services/VenuesService'
export default {
  setup() {
    const filterBy = ref('pending')
    watchEffect(async () => {
      try {
        await bandsService.getAll()
        await venuesService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      filterBy,
      myBands: computed(() => AppState.bands.filter(b => b.creatorId == AppState.account.id)),
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.account.id)),
    }
  }
}
</script>


<style lang="scss" scoped>
.scrollable {
  overflow: scroll;
  flex-wrap: nowrap;
}

.capitalize {
  text-transform: capitalize;
}
</style>