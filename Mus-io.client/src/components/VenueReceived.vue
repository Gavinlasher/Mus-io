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
          <button @click="decline(r.id)" type="button" class="btn btn-danger">
            Decline
          </button>
          <button type="button" class="btn btn-success">Accept</button>
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
      recieved: computed(() => AppState.recievedOffers[props.venue.id]),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>