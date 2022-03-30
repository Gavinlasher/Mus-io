<template>
  <div>
    <h4 class="text-info">
      {{ accept.body }}
    </h4>
  </div>
</template>


<script>
export default {
  props: {
    accept: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>