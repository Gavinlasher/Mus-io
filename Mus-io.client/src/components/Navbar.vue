<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark px-0">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <span class="mx-1"> </span>
      <div class="d-flex flex-column align-items-center">
        <h2
          class="
            text-success
            glow
            main-font
            text-success
            px-md-4
            my-0
            mx-md-3
            p-2
            fa fa-apple
            border border-secondary
          "
          id="apple"
        >
          <b>Mus.io</b>
        </h2>
      </div>
    </router-link>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Gigs' }">
      <span class="mx-1"> </span>
      <div class="d-flex flex-column align-items-center">
        <h2
          class="
            text-success
            glow
            main-font
            text-success
            px-md-4
            my-0
            mx-md-3
            p-2
            fa fa-apple
            border border-secondary
          "
          id="apple"
        >
          <b>Gigs</b>
        </h2>
      </div>
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      class="collapse navbar-collapse gx-0 row justify-content-end"
      id="navbarText"
    >
      <div class="col-12 text-end">
        <span class=""><Login /></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar {
  width: 100vw;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.main-font {
  font-family: "Chakra Petch", sans-serif;
}
.glow:hover {
  filter: drop-shadow(2px 2px 2px #41b8b2);
  transition: 0.2s ease-in-out;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
#apple,
#twitter,
#github,
#facebook {
  font-size: 32pt;
  background-color: #18191f;
  color: #fff;
  border-radius: 6px;
  animation: animate 3s linear infinite;
  text-shadow: 0 0 50px #0072ff, 0 0 100px #0072ff, 0 0 150px #0072ff,
    0 0 200px #0072ff;
}
#twitter {
  animation-delay: 2s;
}
#facebook {
  animation-delay: 2s;
}
#github {
  animation-delay: 2s;
}

@keyframes animate {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
