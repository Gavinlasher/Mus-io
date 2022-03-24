<template>
  <button
    class="btn btn-primary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample"
    aria-controls="offcanvasExample"
  >
    See Band Offers
  </button>

  <div
    class="offcanvas offcanvas-start"
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
    <div class="offcanvas-body">
      <div>
        <slot name="requests"><!--title slot--></slot>

        <!-- <h2>This is bands</h2>
        <slot name="bands"></slot> -->
      </div>
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
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>