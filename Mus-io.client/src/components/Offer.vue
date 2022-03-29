<template>
  <div>
    {{ offer.name }}
  </div>
</template>


<script>
import { onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop"
export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async () => {
      try {
        await bandsService.getBandById(props.offer.id)
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