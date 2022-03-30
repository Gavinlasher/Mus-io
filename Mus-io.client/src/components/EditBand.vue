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
    @submit.prevent="editBand"
  >
    <h2>Edit Band</h2>
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
      <label for="" class="form-label">Genre: </label>
      <input
        v-model="editable.genre"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">SoundCloud: </label>
      <input
        v-model="editable.soundCloud"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Spotify Link: </label>
      <input
        v-model="editable.spotify"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Spotify Playlist: </label>
      <input
        v-model="editable.spotifyPlaylist"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="<your playlist link>"
      />
    </div>
    <div class="col-md-12 mb-2">
      <label for="" class="form-label">Writer: </label>
      <input
        v-model="writerEditable"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="add to writer..."
      />
      <div class="col-md-12 d-flex mb-5 justify-content-end">
        <button
          class="btn btn-primary mt-2"
          @click="addToWriter(writerEditable)"
        >
          <span> Add To Writer </span>
        </button>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">Edit Band Information</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { bandsService } from "../services/BandsService"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    let writerEditable = ref()
    watchEffect(() => {
      editable.value = AppState.activeBand;
    });
    // editable = AppState.activeBand

    return {
      editable,
      writerEditable,
      async editBand() {
        try {
          await bandsService.editBand(editable.value, AppState.activeBand.id)
          Modal.getOrCreateInstance(document.getElementById('edit-band')).hide()
        } catch (error) {
          Pop.toast("Band Edited!", 'sucess')
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
      addToWriter(string) {
        string.toString()
        logger.log(string)
        editable.value.writer.push(string)
        writerEditable = ''
      }
    }
  }
}
</script>


<style lang="scss" scoped>
span {
  font-size: 16px;
}
</style>