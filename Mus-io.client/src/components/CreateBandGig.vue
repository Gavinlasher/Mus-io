<template>
  <div class="row">
    <div class="col-12">
      {{ bandOffer.body }}
    </div>
    <div class="col-12 mt-5">
      <label for="date">Start Date:</label>
      <input type="date" v-model="editable.startDate" />
    </div>

    <button
      @click="createGig(bandOffer)"
      type="button"
      class="btn btn-success mt-5"
    >
      Create Gig
    </button>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { gigsService } from '../services/GigsService'
import { bandsService } from '../services/BandsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { venuesService } from '../services/VenuesService'
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
      myVenues: computed(() => AppState.venues.filter(b => b.creatorId == AppState.account.id)),
      async createGig(r) {
        try {
          r.status = 'accepted'
          r.startDate = editable.value.startDate
          await gigsService.createGig(r)
          Modal.getOrCreateInstance(document.getElementById('band-a-offer' + props.bandOffer.id)).hide()
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