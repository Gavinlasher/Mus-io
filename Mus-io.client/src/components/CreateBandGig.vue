<template>
  <div class="row">
    <div class="col-12">
      {{ bandOffer.body }}
    </div>
    <div class="col-12 mt-5">
      <label for="date">Start Date:</label>
      <input type="date" v-model="editable.startDate" />
    </div>

    <button class="btn btn-danger" @click="deleteOffer(bandOffer.id)">
      Delete
    </button>
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
import { offersService } from '../services/OffersService'
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
          Modal.getOrCreateInstance(document.getElementById('band-a-offer' + props.bandOffer.id)).hide()
          await gigsService.createGig(r)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteOffer(id) {
        try {
          if (await Pop.confirm()) {
            await offersService.deleteOffer(id)
          }
          Modal.getOrCreateInstance(document.getElementById('band-a-offer' + props.bandOffer.id)).hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')


        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>