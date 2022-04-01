<template>
  <div class="row" v-if="recieved?.length > 0">
    <h4 class="text-light">{{ venue.name }}</h4>
    <div class="col-2" v-for="r in recieved" :key="r.id">
      <img
        :src="r.band.bannerImg"
        alt=""
        class="img-fluid offer-pp selectable"
        data-bs-toggle="modal"
        :data-bs-target="'#venue-offer' + r.id"
        v-if="r.status == 'pending'"
      />
      <img
        :src="r.band.bannerImg"
        alt=""
        class="img-fluid offer-pp selectable"
        data-bs-toggle="modal"
        :data-bs-target="'#venue-a-offer' + r.id"
        v-if="r.status == 'accepted'"
      />
      <Modal :id="'venue-offer' + r.id">
        <template #title> {{ r.band.name }} </template>
        <template #body><BandOfferDetails :bandOffer="r" /></template>
      </Modal>
      <Modal :id="'venue-a-offer' + r.id">
        <template #title> {{ r.band.name }} </template>
        <template #body><CreateBandGig :bandOffer="r" /></template>
      </Modal>
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
    },
    filter: {
      type: String,
      required: true
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
      recieved: computed(() => AppState.recievedOffers[props.venue.id]?.filter(r => r.status == props.filter)),

      async declineVenue(r) {
        try {
          r.status = 'declined'
          await offersService.declineVenueOffer(r)
          Pop.toast("Offer Declined", 'info')
        } catch (error) {
          Pop.toast(error.message, 'error message')
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
.offer-pp {
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
}
</style>