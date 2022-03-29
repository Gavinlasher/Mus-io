<template>
  <div>
    <h4 class="text-info">{{ band.name }}</h4>

    <div class="row">
      <div class="col-10" v-for="r in recieved" :key="r.id">
        <h5>{{ r.body }}</h5>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" class="btn btn-danger">Decline</button>
          <button type="button" class="btn btn-success">Accept</button>
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
        logger.log("this is props", props.band)
        await bandsService.getOffersBand(props.band.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {
      recieved: computed(() => AppState.recievedOffers[props.band.id])
    }
  }
}
</script>


<style lang="scss" scoped>
</style>