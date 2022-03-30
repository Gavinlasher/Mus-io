<template>
  <div>
    <!-- <h4 class="text-info">
      {{ acceptedOffers }}
    </h4> -->
    <div
      class="col-8 m-4"
      v-for="accepted in acceptedOffers"
      :key="accepted.id"
    >
      <h5>{{ accepted.creator.name }}: {{ accepted.body }}</h5>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { venuesService } from "../services/VenuesService"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      acceptedOffers: computed(() => {
        return Object.values(AppState.recievedOffers).flat().filter(v => v.status == 'accepted')
      })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>