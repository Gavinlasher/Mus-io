<template>
  <div class="bg-light mt-2" style="max-width: 25vh">
    <h2 class="ps-2" v-if="gigs?.length > 0">{{ venue.name }}</h2>
    <div class="ps-2" v-for="g in gigs" :key="g.id">
      <p>Performer - {{ g.band.name }}</p>
      <p>Playing at - {{ venue.name }}</p>
      <p>Date - {{ g.startDate }}</p>
      <button
        data-bs-toggle="modal"
        :data-bs-target="'#edit-venue-gig' + g.id"
        class="btn btn-info mb-1"
      >
        Edit
      </button>
      <Modal :id="'edit-venue-gig' + g.id">
        <template #title> {{ venue.name }} </template>
        <template #body>
          <label for="venues" class="">Change Venue:</label>
          <select v-model="editable.venueId" class="ms-5" required>
            <option v-for="v in myVenues" :key="v.id" :value="v.id">
              {{ v.name }}
            </option>
          </select>
          <button class="btn btn-info ms-3" @click="editGig(g.id)">Edit</button>
          <button class="btn btn-danger ms-3" @click="deleteGig(g.id)">
            Delete
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { gigsService } from '../services/GigsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
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
    const editable = ref({})
    return {
      editable,
      async deleteGig(id) {
        try {
          if (await Pop.confirm()) {
            await gigsService.deleteGig(id, props.venue.id)
          }
          Modal.getOrCreateInstance(document.getElementById('edit-venue-gig' + id)).hide()

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async editGig(id) {
        try {
          await gigsService.editGig(id, props.venue.id, editable.value)
          Modal.getOrCreateInstance(document.getElementById('edit-venue-gig' + id)).hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.account.id)),
      gigs: computed(() => AppState.gigs[props.venue.id])
    }
  }
}
</script>


<style lang="scss" scoped>
</style>