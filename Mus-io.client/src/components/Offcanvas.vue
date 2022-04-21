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
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      if (AppState.activeBand.id) {
        try {
          await bandsService.getOffersBand(AppState.activeBand.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }

      }

    })
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>