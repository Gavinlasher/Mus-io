<template>
  <div class="container-fluid bg-gradient">
    <div class="row">
      <div class="col-12 p-4">
        <img
          :src="band.bannerImg"
          alt="a band cover image"
          class="img-fluid img-banner"
        />
      </div>
      <div class="col-md-12 text-light" @click="goTo(band.creator.id)">
        <img
          class="img-fluid pp"
          :src="band.creator.picture"
          alt=""
          srcset=""
        />
        <h5>
          {{ band.creator.name }}
        </h5>
      </div>
      <div class="col-12 ps-4 pb-3">
        <h1 class="text-light title">{{ band.name }}</h1>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-12 text-light ps-4 pb-3">{{ band.genre }}</div>
              <div class="col-12 text-light ps-4 pb-3">
                Base Asking Price: ${{ band.basePrice }}
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                <a :href="band.spotify"
                  ><h3><i class="mdi mdi-spotify"></i></h3>
                </a>
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                <a :href="band.soundCloud"
                  ><h3><i class="mdi mdi-soundcloud"></i></h3>
                </a>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button
                  class="btn btn-primary rounded-pill hoverable"
                  data-bs-toggle="modal"
                  data-bs-target="#create-offer"
                  v-if="myVenues"
                >
                  Send Offer
                </button>
              </div>
              <!-- NOTE - V if account == creatorId -->
              <div class="col-12 ps-4 pb-3" v-if="band.creatorId == account.id">
                <button
                  class="btn btn-primary rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-band"
                >
                  Edit Band Info
                </button>
              </div>
            </div>
          </div>
          <div class="col-9 text-light">
            <h3 class="ps-4 pb-3">About</h3>
            <p class="ps-4 pb-3">
              {{ band.bio }}
            </p>
            <iframe
              v-if="band.name == 'BLACKPINK'"
              width="100%"
              height="300"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/277341570&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <div
              style="
                font-size: 10px;
                color: #cccccc;
                line-break: anywhere;
                word-break: normal;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-family: Interstate, Lucida Grande, Lucida Sans Unicode,
                  Lucida Sans, Garuda, Verdana, Tahoma, sans-serif;
                font-weight: 100;
              "
            >
              <a
                href="https://soundcloud.com/genrse"
                title="Genna"
                target="_blank"
                style="color: #cccccc; text-decoration: none"
              ></a>
              <a
                href="https://soundcloud.com/genrse/blackpink-whistle"
                title="BLACKPINK - WHISTLE"
                target="_blank"
                style="color: #cccccc; text-decoration: none"
              ></a>
            </div>
            <iframe
              v-if="band.name == 'BTS'"
              width="100%"
              height="300"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/605006934&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <div
              style="
                font-size: 10px;
                color: #cccccc;
                line-break: anywhere;
                word-break: normal;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-family: Interstate, Lucida Grande, Lucida Sans Unicode,
                  Lucida Sans, Garuda, Verdana, Tahoma, sans-serif;
                font-weight: 100;
              "
            >
              <a
                href="https://soundcloud.com/l2sharebts2"
                title="L2ShareBTS♫2"
                target="_blank"
                style="color: #cccccc; text-decoration: none"
              ></a>
              <a
                href="https://soundcloud.com/l2sharebts2/boy-with-luv"
                title="Boy with Luv"
                target="_blank"
                style="color: #cccccc; text-decoration: none"
              ></a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 spacer" style="height: 15vh"></div>
    </div>
  </div>
  <Modal id="create-offer">
    <template #title> Create Offer</template>
    <template #body><OfferForm /> </template>
  </Modal>
  <Modal id="edit-band">
    <template #title> Edit Band</template>
    <template #body><EditBand /></template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Modal from "../components/Modal.vue"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { bandsService } from "../services/BandsService"
import { useRoute, useRouter } from "vue-router"
import { venuesService } from "../services/VenuesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profilesService } from '../services/ProfilesService'




export default {
  name: 'app',

  setup() {





    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      if (route.name == "Band") {
        await venuesService.getAll()
        await bandsService.getBandById(route.params.id)
      }
    })
    return {
      account: computed(() => AppState.account),
      band: computed(() => AppState.activeBand),
      myVenues: computed(() => AppState.venues.find(v => v.creatorId == AppState.account.id)),
      async goTo(id) {
        try {
          await profilesService.getProfile(id)
          router.push({
            name: 'Profile',
            params: { id: AppState.profile.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      }
    }
  }
}
</script>




<style lang="scss" scoped>
.img-banner {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}
.title {
  font-size: 40pt;
}
.pp {
  height: 20vh;
  width: 20vh;
  border: 1px solid whitesmoke;
  border-radius: 50%;
}
</style>
7