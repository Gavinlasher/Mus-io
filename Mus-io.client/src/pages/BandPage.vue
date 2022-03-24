<template>
  <div class="container-fluid bg-gradient">
    <div class="row">
      <div class="col-12 p-4">
        <img
          :src="band.bannerImg"
          alt="a band cover image"
          class="img-fluid img-banner"
        />
      </div>
      <div class="col-12 ps-4 pb-3">
        <h1 class="text-light title">{{ band.name }}</h1>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-12 text-light ps-4 pb-3">{{ band.genre }}</div>
              <div class="col-12 text-light ps-4 pb-3">
                Base Asking Price: ${{ band.basePrice }}
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                <a :href="band.spotify"
                  ><h3><i class="mdi mdi-spotify"></i></h3>
                </a>
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                <a :href="band.soundCloud"
                  ><h3><i class="mdi mdi-soundcloud"></i></h3>
                </a>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button class="btn btn-primary">Click Me</button>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button class="btn btn-primary">Placeholder</button>
              </div>
            </div>
          </div>
          <div class="col-9 text-light">
            <h3 class="ps-4 pb-3">About</h3>
            <p class="ps-4 pb-3">
              {{ band.bio }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 spacer" style="height: 15vh"></div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      band: computed(() => AppState.activeBand)
    }
  }
}
</script>


<style lang="scss" scoped>
.img-banner {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}
.title {
  font-size: 40pt;
}
</style>
7