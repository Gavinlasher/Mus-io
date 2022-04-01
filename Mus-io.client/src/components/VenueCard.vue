<template>
  <div @click="goTo2">
    <img
      class="img-fluid rounded-bottom shadow mt-3"
      :src="venue.bannerImg"
      @error="setAltImg"
      alt=""
    />
    <div class="col-12">
      <h1 class="mx-1 px-2 py-2 text-start col-12 main-font p-1">
        {{ venue.name }}
      </h1>
      <h5 class="mx-4 px-5 text-end col-12 mt-4 main-font">
        {{ venue.location }}
      </h5>
      <div class="d-flex align-items-end"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
import { venuesService } from "../services/VenuesService"
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    venue: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      setAltImg(event) {
        event.target.src = "https://picsum.photos/200"
      },
      async goTo2() {
        try {
          await venuesService.getVenueById(props.venue.id)
          router.push({
            name: 'Venue',
            params: { id: AppState.activeVenue.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap");
.hoverable:hover {
  transform: scale(1.05);
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
  height: 26vh;
}
h1 {
  text-overflow: hidden;
  height: 10vh;
  font-family: "Roboto", sans-serif;
}
.main-font {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>