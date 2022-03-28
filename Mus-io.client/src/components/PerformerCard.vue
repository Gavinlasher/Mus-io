<template>
  <div class="col-12 align-items-stretch">
    <h1 class="ms-2 text-start col-12 p-1">{{ band.name }}</h1>
    
    <div>
      <img class="img-fluid rounded-bottom shadow mt-1" :src="band.bannerImg" alt="" />
    </div>
    <!-- <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#request"
      aria-controls="offcanvasExample"
      @click="setActive"
    >
      See Offers
    </button> -->
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { bandsService } from "../services/BandsService"
import { logger } from "../utils/Logger"
import { useRoute } from "vue-router"
export default {
  props: {
    band: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    // watchEffect(async () => {
    //   try {
    //     await bandsService.getOffersBand(props.band.id)
    //   } catch (error) {
    //     logger.error(error)
    //   }

    // })
    return {
      // offerBand: computed(() => AppState.offers)
      setActive() {
        bandsService.setActive(props.band)
      },
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap');
.hoverable:hover {
  transform: scale(1.03);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
  cursor: pointer;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
img {
  width: 50vh;
  height: 40vh;
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  text-overflow: hidden;
  height: 8vh;
  font-family: 'Roboto', sans-serif;
}
</style>