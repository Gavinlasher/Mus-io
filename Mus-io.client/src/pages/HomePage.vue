<template>
  <div class="container-fluid bg-gradient p-3">
    <div class="row justify-content-center p-1">
      <input
        placeholder="Search......."
        class="bg-primary border-primary rounded-pill p-1 col-10"
      />
    </div>
    <div class="mt-5 justify-content-around row">
      <div
        class="
          p-3
          col-4
          rounded-pill
          text-center
          shadow
          fs-4
          hoverable
          bg-success
        "
      >
        Performers
      </div>
      <div
        class="
          p-3
          col-4
          rounded-pill
          text-center
          shadow
          fs-4
          hoverable
          bg-success
        "
      >
        Venues
      </div>
    </div>
    <div class="row justify-content-center p-0 mt-5">
      <div
        class="col-3 p-1 my-1 mx-1 bg-grey shadow hoverable rounded"
        @click="goTo()"
      >
        <PerformerCard />
        <!-- <VenueCard /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { bandsService } from "../services/BandsService"

export default {
  setup() {
    watchEffect(async () => {
      try {
        await bandsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {}
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.hoverable:hover {
  transform: scale(1.03);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
  cursor: pointer;
  user-select: none;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>
