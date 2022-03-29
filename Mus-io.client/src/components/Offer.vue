<template>
  <div>
    {{ band.name }}
    {{ band.body }}
  </div>
</template>


<script>
import { onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { bandsService } from "../services/BandsService"
import { logger } from "../utils/Logger"
export default {
  props: {
    band: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async () => {
      try {
        logger.log("this is props", props.band)
        await bandsService.getOffersBand(props.band.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>