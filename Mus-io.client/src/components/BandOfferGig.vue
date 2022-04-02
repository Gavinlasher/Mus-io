<template>
  <div class="row" v-if="offers?.length > 0">
    <h4 class="text-light">{{ band.name }}</h4>
    <div class="col-2" v-for="r in offers" :key="r.id">
      <img
        :src="r.venue.bannerImg"
        alt=""
        class="img-fluid offer-pp selectable"
        data-bs-toggle="modal"
        :data-bs-target="'#band-offer' + r.id"
        v-if="r.status == 'pending'"
      />
      <img
        :src="r.venue.bannerImg"
        alt=""
        class="img-fluid offer-pp selectable"
        data-bs-toggle="modal"
        :data-bs-target="'#band-a-offer' + r.id"
        v-if="r.status == 'accepted'"
      />
      <Modal :id="'band-offer' + r.id">
        <template #title> {{ r.venue.name }} </template>
        <template #body><VenueOfferDetails :venueOffer="r" /></template>
      </Modal>
      <Modal :id="'band-a-offer' + r.id">
        <template #title> {{ r.venue.name }} </template>
        <template #body><CreateVenueGig :venueOffer="r" /></template>
      </Modal>
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
import { Modal } from "bootstrap"
export default {
  props: {
    band: {
      type: Object,
      required: true
    },
    filter: {
      type: String,
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
      offers: computed(() => AppState.recievedOffers[props.band.id]?.filter(r => r.status == props.filter)),
      async decline(r) {
        try {
          r.status = 'declined'
          Modal.getOrCreateInstance(document.getElementById('band-a-offer' + r.id)).hide()
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
          Modal.getOrCreateInstance(document.getElementById('band-a-offer' + r.id)).hide()
          await offersService.acceptBandOffer(r)
        } catch (error) {
          Pop.toast(error.message, 'error')
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