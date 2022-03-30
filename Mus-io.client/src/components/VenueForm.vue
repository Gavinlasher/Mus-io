<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="editVenue"
  >
    <h2>Edit Venue</h2>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Banner Picture: </label>
      <input
        v-model="editable.bannerImg"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Bio: </label>
      <input
        v-model="editable.bio"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Location: </label>
      <input
        v-model="editable.location"
        type="number"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Capacity: </label>
      <input
        v-model="editable.capacity"
        type="number"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Spotify: </label>
      <input
        v-model="editable.spotify"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">Edit Venue Information</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { venuesService } from '../services/VenuesService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async editVenue() {
        try {
          await venuesService.editVenue(editable.value, AppState.activeVenue.id)
          Pop.toast("Venue Edited!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>