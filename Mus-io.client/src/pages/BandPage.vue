<template>
  <div class="container-fluid bg-gradient pic-hide">
    <div class="row">
      <div class="mt-5"></div>
      <div class="col-12 p-4 mt-5">
        <img
          :src="band.bannerImg"
          alt="a band cover image"
          class="img-fluid shadow img-banner main-font rounded"
        />
      </div>

      <div class="col-12 ps-4 pb-3">
        <h1 class="text-light title main-font">{{ band.name }}</h1>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-12 text-light ps-4 main-font pb-3">
                <h3>
                  {{ band.genre }}
                </h3>
              </div>
              <div class="col-12 main-font text-light ps-4 pb-3">
                Base Asking Price: ${{ band.basePrice }}
              </div>
              <div class="col-3 text-light ps-4 pb-3">
                <a :href="band.spotify"
                  ><h3>
                    <i
                      class="mdi mdi-spotify px-2 hoverable fa fa-twitter"
                      id="twitter"
                    ></i>
                  </h3>
                </a>
              </div>
              <div class="col-3 text-light hoverable ps-4 pb-3">
                <a :href="band.soundCloud"
                  ><h3>
                    <i
                      class="mdi mdi-soundcloud px-2 fa fa-apple"
                      id="apple"
                    ></i>
                  </h3>
                </a>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button
                  class="btn btn-primary rounded-pill hoverable"
                  data-bs-toggle="modal"
                  data-bs-target="#create-offer"
                >
                  Send Offer
                </button>
              </div>
              <!-- NOTE - V if account == creatorId -->
              <div class="col-12 ps-4 pb-3" v-if="band.creatorId == account.id">
                <button
                  class="btn btn-primary main-font rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-band"
                >
                  Edit Band Info
                </button>
              </div>
            </div>
          </div>
          <div class="col-9 text-light">
            <h3 class="ps-4 pb-2 border-bottom main-font">About</h3>
            <div class="div" v-if="band.creatorId !== account.id">
              <div v-html="editable.bio"></div>
            </div>
            <div id="app row bg-gradient" v-if="band.creatorId == account.id">
              <div
                class="
                  bg-gradient
                  d-flex
                  justify-content-end
                  rounded
                  col-12
                  text-light
                  p-1
                  mt-3
                "
              >
                <button class="btn hoverable btn-success mx-2" @click="save">
                  Save
                </button>
                <button
                  class="btn hoverable btn-success"
                  @click="showPreview = !showPreview"
                >
                  Preview
                </button>
              </div>
              <div v-if="!showPreview">
                <editor
                  v-model="editable.bio"
                  :init="{
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                       alignleft aligncenter alignright alignjustify | \
                       bullist numlist outdent indent | removeformat | help',
                  }"
                />
              </div>
              <div v-else v-html="editable.bio"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-5">
        <div class="mt-5"></div>
        <iframe
          style="border-radius: 12px"
          :src="`https://open.spotify.com/embed/playlist/${band.spotifyPlaylist}?utm_source=generator&theme=0`"
          width="100%"
          height="380"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <div class="col-12 spacer" style="height: 15vh"></div>
      <div
        class="col-md-4 text-light mb-5 ms-4 selectable"
        @click="goTo(band.creator.id)"
        title="band manager"
      >
        <div class="row">
          <div class="col-12">
            <h4 class="border-bottom main-font">Band Manager</h4>
          </div>
          <div class="col-12">
            <img
              class="img-fluid pp mt-4"
              :src="band.creator?.picture"
              alt=""
              srcset=""
              :title="band.creator?.name"
            />
          </div>
          <div class="col-12 mt-4">
            <h6>
              <i class="mdi mdi-email main-font"></i> {{ band.creator?.email }}
            </h6>
          </div>
        </div>
      </div>
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
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { bandsService } from "../services/BandsService"
import { useRoute, useRouter } from "vue-router"
import { venuesService } from "../services/VenuesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profilesService } from '../services/ProfilesService'
import Editor from "@tinymce/tinymce-vue";





export default {
  name: 'app',
  components: {
    editor: Editor,
  },
  setup() {
    const editable = ref({})
    const showPreview = ref(false);
    const route = useRoute()
    const router = useRouter()
    watchEffect(() => {
      editable.value.bio = AppState.activeBand.bio
    })
    watchEffect(async () => {
      if (route.name == "Band") {
        await venuesService.getAll()
        await bandsService.getBandById(route.params.id)
      }
    })
    return {
      editable,
      showPreview,
      account: computed(() => AppState.account),
      writer: computed(() => AppState.activeBand.writer),
      band: computed(() => AppState.activeBand),
      myVenues: computed(() => AppState.venues.find(v => v.creatorId == AppState.account.id)),
      async save() {
        try {
          logger.log(editable.value)
          await bandsService.editBand(editable.value, AppState.activeBand.id)
        } catch (error) {
          Pop.toast("Band Edited!", 'sucess')
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
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
.pic-hide {
  overflow: hidden;
}
.img-banner {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}
.title {
  font-size: 40pt;
}
.pp {
  height: 15vh;
  width: 15vh;
  border: 1px solid whitesmoke;
  border-radius: 50%;
}
.main-font {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");

#apple,
#twitter,
#github,
#facebook {
  font-size: 40pt;
  background-color: #18191f;
  color: #fff;
  box-shadow: 2px 2px 2px #00000080, 10px 1px 12px #00000080,
    2px 2px 10px #00000080, 2px 2px 3px #00000080, inset 2px 2px 10px #00000080,
    inset 2px 2px 10px #00000080, inset 2px 2px 10px #00000080,
    inset 2px 2px 10px #00000080;
  border-radius: 20px;
  animation: animate 3s linear infinite;
  text-shadow: 0 0 50px #0072ff, 0 0 100px #0072ff, 0 0 150px #0072ff,
    0 0 200px #0072ff;
}
#twitter {
  animation-delay: 0.3s;
}
#facebook {
  animation-delay: 0.7s;
}
#github {
  animation-delay: 0.1s;
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
