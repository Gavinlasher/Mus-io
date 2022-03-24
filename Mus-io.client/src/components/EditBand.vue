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
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Banner Picture: </label>
      <input
        v-model="editable.bannerImg"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Bio: </label>
      <input
        v-model="editable.bio"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Genre: </label>
      <input
        v-model="editable.genre"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">SoundCloud: </label>
      <input
        v-model="editable.soundCloud"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Spotify: </label>
      <input
        v-model="editable.spotify"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Writer: </label>
      <input
        v-model="writerEditable"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="add to writer..."
      />
      <button @click="addToWriter(writerEditable)">add to writer</button>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">edit</button>
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
        } catch (error) {
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
</style>