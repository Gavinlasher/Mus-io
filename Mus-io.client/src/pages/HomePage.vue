<template>
  <div class="container-fluid bg-gradient p-5">
    <div class="row bg-primary p-1 rounded-pill">
      <div class="col-12">Filter</div>
    </div>
    <div class="mt-5 justify-content-around row">
      <div
        class="
          p-3
          col-4
          rounded-pill
          text-center
          shadow
          fs-4
          hoverable
          bg-success
        "
      >
        Performers
      </div>
      <div
        class="
          p-3
          col-4
          rounded-pill
          text-center
          shadow
          fs-4
          hoverable
          bg-success
        "
      >
        Venues
      </div>
    </div>
    <div class="row justify-content-center p-0 mt-5">
      <PerformerCard />
      <VenueCard />
      <PerformerCard />
      <VenueCard />
      <PerformerCard />
      <VenueCard />
      <PerformerCard />
      <VenueCard />
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    return {}
  }
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
