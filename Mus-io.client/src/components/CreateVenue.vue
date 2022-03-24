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
    @submit.prevent="createVenue"
  >
    <h2>Create Performer</h2>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">BannerImg: </label>
      <input
        v-model="editable.bannerImg"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Image Here....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Bio: </label>
      <input
        v-model="editable.bio"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Bio....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Budget: </label>
      <input
        v-model="editable.budget"
        required
        type="number"
        class="form-control"
        aria-describedby="helpId"
        placeholder="location....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Capacity: </label>
      <input
        v-model="editable.capacity"
        required
        type="number"
        class="form-control"
        aria-describedby="helpId"
        placeholder="capacity....."
      />
    </div>

    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Location: </label>
      <input
        v-model="editable.location"
        required
        type="text"
        min="2022-03-23"
        class="form-control"
        aria-describedby="helpId"
        placeholder="location....."
      />
    </div>
    <!-- <div class="col-md-4 mb-2">
      <label for="" class="form-label">type: </label>
      <input
        v-model="editable.type"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="type....."
      />
    </div> -->

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import { venuesService } from "../services/VenuesService"
import { Modal } from "bootstrap"
export default {
  props: {
    venueData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createVenue() {
        try {
          Modal.getOrCreateInstance(document.getElementById('create-venue')).hide()
          await venuesService.createVenue(editable.value)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>