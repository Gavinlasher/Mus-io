<template>
  <div class="col-12 align-items-stretch">
    <h1 class="mx-3 text-start col-12 main-font p-1">{{ band.name }}</h1>
    <h5 class="mx-4 text-start col-12 mt-4 main-font">{{ band.genre }}</h5>
    <div class="d-flex align-items-stretch align-items-end">
      <img
        class="img-fluid rounded-bottom shadow align-items-stretch mt-3"
        :src="band.bannerImg"
        alt=""
      />
    </div>
  </div>
</template>

<script>

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

    }
  }
}
</script>

<style scoped>
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
  background-size: cover;
}
h1 {
  text-overflow: hidden;
  height: 8vh;
  font-family: "Roboto", sans-serif;
}
.main-font {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>