<template>
  <div class="col-12">
    <h1 class="ms-2 p-1">{{ band.name }}</h1>
    <h5 class="ms-4">{{ band.genre }}</h5>
    <img class="img-fluid rounded shadow mt-3" :src="band.bannerImg" alt="" />
  </div>
</template>

<script>

export default {
  props: {
    band: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {

    }
  }
}
</script>

<style>
.hoverable:hover {
  transform: scale(1.03);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
  cursor: pointer;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>