<template>
  <div class="container-fluid">
    <div class="row justify-content-around">
      <Band />
    </div>
    <div class="row justify-content-around mt-2">
      <Venue />
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
export default {
  name: 'Home',
  // setup(){
  //   onMounted(async ()=> {
  //     try {

  //     } catch (error) {
  //       logger.error(error)
  //     }
  //   })
  // }
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
