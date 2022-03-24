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
    @submit.prevent="sendOffer()"
  >
    <div class="col-12 mb-3">
      <label for="">Choose Venue:</label>
      <select name="" id="" v-model="editable.venueId">
        <option :value="v.id" v-for="v in myVenues" :key="v.id">
          {{ v.name }}
        </option>
      </select>
    </div>
    <div class="col-12">
      <label for="" class="form-label">Offer: </label>

      <textarea
        v-model="editable.bio"
        required
        rows="7"
        type="text"
        class="form-control mb-3 mt-3"
        aria-describedby="helpId"
        placeholder="offer details..."
      />
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">Send Offer</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    const editable = ref({})
    return {
      myVenues: computed(() => AppState.venues.filter(v => v.creatorId == AppState.account.id)),
      editable
    }
  }
}
</script>


<style lang="scss" scoped>
</style>