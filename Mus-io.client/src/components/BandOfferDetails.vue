<template>
  <div class="row">
    <div class="col-12">
      {{ bandOffer.body }}
    </div>
    <div class="col-12">
      Status:
      {{ bandOffer.status }}
    </div>
    <div class="col-12">
      <label for="bands" class="">Venues:</label>
      <select v-model="editable.venueId" class="ms-5" required>
        <option v-for="v in myVenues" :key="v.id" :value="v.id">
          {{ v.name }}
        </option>
      </select>
    </div>
    <button @click="decline(bandOffer)" type="button" class="btn btn-danger">
      Decline
    </button>
    <button @click="accept(bandOffer)" type="button" class="btn btn-success">
      Accept
    </button>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { venuesService } from '../services/VenuesService'
import { bandsService } from '../services/BandsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { offersService } from '../services/OffersService'
import { Modal } from 'bootstrap'
export default {
  props: {
    bandOffer: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const editable = ref({})
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
      editable,
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.account.id)),
      async decline(r) {
        try {
          r.status = 'declined'
          Modal.getOrCreateInstance(document.getElementById('venue-a-offer' + props.bandOffer.id)).hide()
          await offersService.declineOffer(r)
          Pop.toast('Offer Declined', 'info')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      },
      async accept(r) {
        try {
          r.status = 'accepted'
          r.venueId = editable.value.venueId
          Modal.getOrCreateInstance(document.getElementById('venue-a-offer' + props.bandOffer.id)).hide()
          await offersService.acceptBandOffer(r)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>