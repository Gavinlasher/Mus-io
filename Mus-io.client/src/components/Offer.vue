<template>
  <div>
    <h2 class="text-info">{{ band.name }}</h2>

    <div class="row mb-2">
      <div class="col-10 pb-2" v-for="r in recieved" :key="r.id">
        <h3>{{ r.creator.name }}: {{ r.body }}</h3>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button @click="decline(r)" type="button" class="btn btn-danger">
            Decline
          </button>
          <button @click="accept(r)" type="button" class="btn btn-success">
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { bandsService } from "../services/BandsService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { offersService } from "../services/OffersService"
export default {
  props: {
    band: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async () => {
      try {
        await bandsService.getOffersBand(props.band.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {
      recieved: computed(() => AppState.recievedOffers[props.band.id]?.filter(r => r.status == 'pending')),
      async decline(r) {
        try {
          if (await Pop.confirm()) {
            r.status = 'declined'
            await offersService.declineOffer(r)
          }
          Pop.toast('Offer Declined', 'info')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      },
      async accept(r) {
        try {
          r.status = 'accepted'
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