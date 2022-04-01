<template>
  <h2 v-if="gigs">{{ venue.name }}</h2>
  <div v-for="g in gigs" :key="g.id">
    <p>Performer - {{ g.band.name }}</p>
    <p>Date - {{ g.startDate }}</p>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { gigsService } from '../services/GigsService'
import { logger } from '../utils/Logger'
export default {
  props: {
    venue: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    onMounted(async () => {
      await gigsService.getGigsByVenue(props.venue.id)
      logger.log('gigs are...', AppState.gigs)
    })
    return {
      gigs: computed(() => AppState.gigs[props.venue.id])
    }
  }
}
</script>


<style lang="scss" scoped>
</style>