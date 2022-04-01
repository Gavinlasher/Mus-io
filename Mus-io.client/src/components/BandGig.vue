<template>
  <!-- TODO PUT A BORDER AROUND THIS -->
  <div>
    <h2 v-if="gigs">{{ band.name }}</h2>
    <div v-for="g in gigs" :key="g.id">
      <p>Performer - {{ band.name }}</p>
      <p>Playing at - {{ g.venue.name }}</p>
      <p>Date - {{ g.startDate }}</p>
      <button
        data-bs-toggle="modal"
        :data-bs-target="'#edit-band-gig' + g.id"
        class="btn btn-outline-primary"
      >
        Edit
      </button>
      <Modal :id="'edit-band-gig' + g.id">
        <template #title>Gig - {{ band.name }} </template>
        <template #body>
          <p>Performer - {{ band.name }}</p>
          <p>Playing at - {{ g.venue.name }}</p>
          <p>Date - {{ g.startDate }}</p>
        </template>
      </Modal>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { gigsService } from '../services/GigsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
export default {
  props: {
    band: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    onMounted(async () => {
      await gigsService.getGigsByBand(props.band.id)
    })
    return {
      async deleteGig(id) {
        try {
          if (await Pop.confirm()) {
            await gigsService.deleteGig(id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async editGig(id) {
        try {
          if (await Pop.confirm()) {
            await gigsService.editGig(id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      gigs: computed(() => AppState.gigs[props.band.id])

    }
  }
}
</script>


<style lang="scss" scoped>
</style>