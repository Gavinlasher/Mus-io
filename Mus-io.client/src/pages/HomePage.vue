<template>
  <div class="container-fluid parallax">
    <div class="row justify-content-center p-1">
      <div class="p-5"></div>
      <form @submit.prevent="search" class="d-flex justify-content-center mt-3">
        <input
          placeholder="Search......."
          class="bg-primary border-primary rounded-pill p-1 col-md-6 col-12"
          v-model="query"
        />
      </form>
    </div>

    <div class="row justify-content-around mt-4">
      <button @click="filter('country')" class="col-3 btn btn-primary">
        Country
      </button>
      <button @click="filter('rock')" class="col-2 btn btn-primary">
        Rock
      </button>
      <button @click="filter('pop')" class="col-2 btn btn-primary">Pop</button>
      <button @click="filter('rap')" class="col-2 btn btn-primary">Rap</button>
      <button @click="filter('electronic')" class="col-2 btn btn-primary">
        Elec
      </button>
    </div>
    <div class="mt-5 justify-content-around mx-5 row">
      <div
        @click="getAllPerformers"
        class="
          p-3
          col-lg-3 col-md-3 col-sm-12
          rounded
          text-center
          shadow
          fs-4
          hoverable
          bg-success
          main-font
          button
          mt-2
        "
      >
        Performers
      </div>
      <div
        @click="getAllVenues"
        class="
          p-3
          col-lg-3 col-md-3 col-sm-12
          rounded
          text-center
          shadow
          fs-4
          hoverable
          bg-success
          main-font
          button
          mt-2
        "
      >
        Venues
      </div>
    </div>
    <div class="row justify-content-center p-3 mt-3">
      <div v-if="bands.length > 0" class="d-flex justify-content-center p-3">
        <h2 class="text-light col-10 border-bottom text-center fs-1 main-font">
          Performers
        </h2>
      </div>
      <div
        class="col-md-3 bg-dark card p-0 m-3 shadow hoverable rounded"
        @click="goTo(b.id)"
        v-for="b in bands"
        :key="b.id"
      >
        <PerformerCard :band="b" />
      </div>
      <div v-if="venues.length > 0" class="d-flex justify-content-center p-3">
        <h2 class="text-light col-10 border-bottom text-center fs-1 main-font">
          Venues
        </h2>
      </div>
      <div
        class="col-md-3 bg-dark p-0 card m-3 shadow hoverable rounded"
        @click="goTo2(v.id)"
        v-for="v in venues"
        :key="v.id"
      >
        <VenueCard :venue="v" />
      </div>
    </div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
    <div class="p-5"></div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { bandsService } from "../services/BandsService"
import { venuesService } from "../services/VenuesService"
import { AppState } from "../AppState"
import { useRouter } from "vue-router"


export default {

  setup() {
    const query = ref("");
    const router = useRouter();
    watchEffect(async () => {
      try {
        await bandsService.getAll()
        await venuesService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {
      query,
      bands: computed(() => AppState.bands),
      venues: computed(() => AppState.venues),
      async search() {
        try {
          await bandsService.getAll('?search=' + query.value)
          await venuesService.getAll('?search=' + query.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async goTo(id) {
        try {
          await bandsService.getBandById(id)
          router.push({
            name: 'Band',
            params: { id: AppState.activeBand.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
      async goTo2(id) {
        try {
          await venuesService.getVenueById(id)
          router.push({
            name: 'Venue',
            params: { id: AppState.activeVenue.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
      async getAllVenues() {
        try {
          await venuesService.getAll()
          AppState.bands = []
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message)
        }
      },
      async getAllPerformers() {
        try {
          await bandsService.getAll()
          AppState.venues = []
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message)
        }
      },
      async filter(genre) {
        try {
          logger.log("genre is...", genre)
          await bandsService.filter('?genre=' + genre)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
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
  transition: 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}

.main-font {
  font-family: "Chakra Petch", sans-serif;
}
.parallax {
  /* The image used */
  background-image: url("");

  /* Set a specific height */
  min-height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>
