<template>
  <div class="container-fluid">
    <div class="row">
      <div class="p-5"></div>
      <div class="col-2" v-for="o in offers" :key="o.id">
        <OfferPic :offer="o" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Calendar />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
export default {
  setup() {
    return {
      // offers: computed(() => )
    }
  }
}
</script>


<style lang="scss" scoped>
</style>