<template>
  <div class="container-fluid bg-gradient">
    <div class="row justify-content-center p-1">
      <div class="p-5"></div>
      <div class="p-3"></div>
      <form @submit.prevent="search" class="d-flex justify-content-center">
        <input
          placeholder="Search......."
          class="bg-primary border-primary rounded-pill p-1 col-6"
          v-model="query"
        />
      </form>
    </div>
    <div class="mt-5 justify-content-between mx-5 row">
      <div
        @click="getAllPerformers"
        class="
          p-3
          col-lg-4 col-md-4 col-sm-12
          rounded-pill
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
          col-lg-4 col-md-4 col-sm-12
          rounded-pill
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
    <div class="row justify-content-center p-3 mt-5">
      <div
        class="col-md-3 bg-dark card p-0 m-3 shadow hoverable rounded"
        @click="goTo(b.id)"
        v-for="b in bands"
        :key="b.id"
      >
        <PerformerCard :band="b" />
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
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
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
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>
