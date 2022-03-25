<template>
  <div
    class="offcanvas offcanvas-start text-dark"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">
        Offers for {{ account.name }}
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body text-dark">
      <slot name="requests"></slot>
      <!-- <div class="row">
        <div class="col-11" v-for="offer in offersBand" :key="offer.id">
          <h2>{{ offer.name }}</h2>
        </div>
      </div> -->
      <!-- <h2>This is bands</h2>
        <slot name="bands"></slot> -->

      <!-- <div>
        <slot id="sent" name="body"></slot>
      </div>
      <div>
        <slot id="messages" name="body"></slot>
      </div> -->
      <!-- <div class="dropdown mt-3">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
        >
          Dropdown button
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div> -->
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import { bandsService } from "../services/BandsService"
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      if (AppState.activeBand.id) {
        try {
          await bandsService.getOffersBand(AppState.activeBand.id)
        } catch (error) {
          logger.error(error)
        }

      }

    })
    return {
      account: computed(() => AppState.account),
      // offersBand: computed(() => AppState.offers)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>