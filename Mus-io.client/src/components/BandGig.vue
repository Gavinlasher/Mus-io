<template>
  <div class="bg-light mt-2 rounded shadow p-2" style="max-width: 25vh">
    <h2 v-if="gigs?.length > 0">{{ band.name }}</h2>
    <div v-for="g in gigs" :key="g.id">
      <p>Performer - {{ band.name }}</p>
      <p>Playing at - {{ g.venue.name }}</p>
      <p>Date - {{ g.startDate }}</p>
      <button
        data-bs-toggle="modal"
        :data-bs-target="'#edit-band-gig' + g.id"
        class="btn btn-info mb-1"
      >
        Edit
      </button>
      <Modal :id="'edit-band-gig' + g.id">
        <template #title>Gig - {{ g.venue.name }} </template>
        <template #body>
          <label for="bands" class="">Change Band:</label>
          <select v-model="editable.bandId" class="ms-5" required>
            <option v-for="b in myBands" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>
          <button class="btn btn-info ms-3" @click="editGig(g.id)">Edit</button>
          <button class="btn btn-info ms-3" @click="deleteGig(g.id)">
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
import { onMounted } from '@vue/runtime-core'
import { gigsService } from '../services/GigsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { Modal } from "bootstrap"
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
    const editable = ref({})
    return {
      editable,
      async deleteGig(id) {
        try {
          Modal.getOrCreateInstance(document.getElementById('edit-band-gig' + id)).hide()
          if (await Pop.confirm()) {
            await gigsService.deleteGig(id, props.band.id)
          }

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async editGig(id) {
        try {
          Modal.getOrCreateInstance(document.getElementById('edit-band-gig' + id)).hide()
          await gigsService.editGig(id, props.band.id, editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      myBands: computed(() => AppState.bands.filter(b => b.creatorId == AppState.account.id)),
      gigs: computed(() => AppState.gigs[props.band.id]),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>