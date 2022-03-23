<template>
  <div class="container-fluid bg-gradient">
    <div class="row justify-content-around">
      <div class="col-5">
        <Band />
      </div>
    </div>
    <div class="row justify-content-around mt-2">
      <div class="col-5">
        <Venue />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { bandsService } from "../services/BandsService"
import { venuesService } from "../services/VenuesService"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await bandsService.getAll()
        await venuesService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })

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
</style>
