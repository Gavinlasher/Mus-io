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
    @submit.prevent="createPerformer"
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
      <label for="" class="form-label">SoundCloud: </label>
      <input
        v-model="editable.soundCloud"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="SoundCloud....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Base Price: </label>
      <input
        v-model="editable.basePrice"
        required
        type="number"
        min="0"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Base Price....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Spotify: </label>
      <input
        v-model="editable.spotifyPlaylist"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Playlist Link....."
      />
    </div>
    <label for="" class="form-label">Choose Genre: </label>
    <div class="btn-group m-2">
      <select required name="" id="" class="px-2" v-model="editable.genre">
        <option value="rock">
          <a class="dropdown-item" href="#">Rock</a>
        </option>
        <option value="country">
          <a class="dropdown-item" href="#">Country</a>
        </option>
        <option value="pop">
          <a class="dropdown-item" href="#">Pop</a>
        </option>
        <option value="rap">
          <a class="dropdown-item" href="#">Rap</a>
        </option>
        <option value="electronic">
          <a class="dropdown-item" href="#">Electronic</a>
        </option>
      </select>
    </div>
    <!-- <div class="col-md-4 mb-2">
      <label for="" class="form-label">Writer: </label>
      <input
        v-model="editable.writer"
        required
        type="date"
        min="2022-03-23"
        class="form-control"
        aria-describedby="helpId"
        placeholder="w....."
      />
    </div> -->
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
      <button class="btn btn-primary">Create</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap"
import { bandsService } from "../services/BandsService"
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    const route = useRoute()
    return {
      editable,
      async createPerformer() {
        try {
          await bandsService.createBand(editable.value)
          Pop.toast('Performer Created!', 'sucess')
          editable.value = {}
          Modal.getOrCreateInstance(document.getElementById('create-performer')).hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>