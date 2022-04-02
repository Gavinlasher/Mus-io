<template>
  <div class="row">
    <div class="col-12">
      {{ venueOffer.body }}
    </div>
    <div class="col-12">
      Status:
      {{ venueOffer.status }}
    </div>
    <div class="col-12">
      <label for="bands" class="">Bands:</label>
      <select v-model="editable.bandId" class="ms-5" required>
        <option v-for="b in myBands" :key="b.id" :value="b.id">
          {{ b.name }}
        </option>
      </select>
    </div>
    <button @click="decline(venueOffer)" type="button" class="btn btn-danger">
      Decline
    </button>
    <button @click="accept(venueOffer)" type="button" class="btn btn-success">
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
    venueOffer: {
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
      myBands: computed(() => AppState.bands.filter(b => b.creatorId == AppState.account.id)),
      async decline(r) {
        try {
          r.status = 'declined'
          await offersService.declineOffer(r)
          Pop.toast('Offer Declined', 'info')
          Modal.getOrCreateInstance(document.getElementById('band-offer' + props.venueOffer.id)).hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      },
      async accept(r) {
        try {
          r.status = 'accepted'
          r.bandId = editable.value.bandId
          await offersService.acceptBandOffer(r)
          Modal.getOrCreateInstance(document.getElementById('band-offer' + props.venueOffer.id)).hide()
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