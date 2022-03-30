<template>
  <div>
    <h4 class="text-info">{{ venue.name }}</h4>

    <div class="row">
      <div class="col-10" v-for="r in recieved" :key="r.id">
        <h5>{{ r.body }}</h5>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button @click="declineVenue(r)" type="button" class="btn btn-danger">
            Decline
          </button>
          <button @click="acceptVenue(r)" type="button" class="btn btn-success">
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { venuesService } from "../services/VenuesService"
import { AppState } from "../AppState"
import { offersService } from "../services/OffersService"
export default {
  props: {
    venue: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    onMounted(async () => {
      try {
        await venuesService.getOffersVenue(props.venue.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {
      recieved: computed(() => AppState.recievedOffers[props.venue.id]?.filter(v => v.status == 'pending')),
      async declineVenue(r) {
        try {
          logger.log(r)
          r.status = 'declined'
          await offersService.declineVenueOffer(r)
        } catch (error) {
          logger.error(error)
        }
      },
      async acceptVenue(r) {
        try {
          r.status = 'accepted'
          await offersService.acceptVenueOffer(r)
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