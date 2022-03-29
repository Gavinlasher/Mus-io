<template>
  <div class="col-12 align-items-stretch">
    <h1 class="ms-2 text-start col-12 main-font p-1">{{ venue.name }}</h1>
    <h5 class="ms-4 text-start col-12 mt-2 main-font">{{ venue.location }}</h5>
    <div class="d-flex align-items-stretch align-items-end">
      <img
        class="img-fluid rounded-bottom shadow align-items-stretch mt-3"
        :src="venue.bannerImg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    venue: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap");
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
img {
  width: 50vh;
  height: 40vh;
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  text-overflow: hidden;
  height: 10vh;
  font-family: "Roboto", sans-serif;
}
.main-font {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>