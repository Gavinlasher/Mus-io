<template>
  <div class="container-fluid parallax">
    <div class="row d-flex justify-content-start">
      <div class="col-12 mt-3">
        <div class="border-bottom">
          <img
            :src="profile.picture"
            class="img-fluid cropped border border-dark ms-5"
            alt="Profile Picture of the User"
          />

          <h2 class="ms-5 mt-3 text-light">{{ profile.name }}</h2>
          <h6 class="ms-5 mt-3 text-light mb-3">
            <i class="mdi mdi-email"></i> {{ profile.email }}
          </h6>
        </div>
      </div>

      <div class="row p-3 d-flex justify-content-around mt-3">
        <button
          class="btn btn-success rounded-pill m-2 hoverable col-4 col-md-1"
          data-bs-toggle="modal"
          data-bs-target="#create-performer"
          v-if="account.id == profile.id"
        >
          Add New Performer
        </button>
        <button
          class="btn btn-success rounded-pill m-2 hoverable col-4 col-md-1"
          data-bs-toggle="modal"
          data-bs-target="#create-venue"
          v-if="account.id == profile.id"
        >
          Add New Venue
        </button>
        <button
          class="btn btn-success rounded-pill m-2 hoverable col-4 col-md-1"
          data-bs-toggle="modal"
          data-bs-target="#edit-account"
          v-if="account.id == profile.id"
        >
          Edit Account
        </button>
        <button
          class="btn btn-success rounded-pill m-2 hoverable col-4 col-md-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#request"
          aria-controls="offCanvasExample"
        >
          See Offers
        </button>
      </div>
    </div>
    <h1
      class="
        text-center
        border-bottom
        main-font
        text-light
        custom-text
        p-3
        mt-5
      "
      v-if="account.id == profile.id"
    >
      My Performers
    </h1>
    <h1 class="text-center text-light custom-text p-3" v-else>Performers</h1>
    <div class="row justify-content-center p-3 mt-5">
      <div
        class="col-md-3 bg-dark p-0 m-3 shadow rounded text-end"
        v-for="b in myBands"
        :key="b.id"
      >
        <button
          v-if="account.id == b.creatorId"
          @click="deleteBand(b.id)"
          type="button"
          title="Delete Comment"
          class="btn-close btn-close-white m-1"
          aria-label="Close"
        ></button>
        <PerformerCard :band="b" />
      </div>
    </div>
    <h1
      class="text-center border-bottom main-font text-light custom-text p-3"
      v-if="account.id == profile.id"
    >
      My Venues
    </h1>
    <h1 class="text-center main-font text-light custom-text p-3" v-else>
      Venues
    </h1>
    <div class="row justify-content-center p-3 mt-5">
      <div
        class="col-md-3 bg-dark p-0 shadow rounded text-end"
        v-for="v in myVenues"
        :key="v.id"
      >
        <button
          v-if="account.id == v.creatorId"
          @click="deleteVenue(v.id)"
          type="button"
          title="Delete Venue"
          class="btn-close btn-close-white m-1"
          aria-label="Close"
        ></button>
        <VenueCard :venue="v" />
      </div>
    </div>
    <Modal id="create-performer">
      <template #title> Create Performer </template>
      <template #body><CreatePerformer :bandData="band" /></template>
    </Modal>
    <Modal id="create-venue">
      <template #title> Create Venue </template>
      <template #body><CreateVenue :venueData="venue" /></template>
    </Modal>
    <Modal id="edit-account">
      <template #title> Edit Account </template>
      <template #body><EditAccount :accountData="profile" /></template>
    </Modal>
    <OffCanvas id="request">
      <template #requests>
        <div class="row">
          <h1>My Sent offers</h1>
          <div class="col-8" v-for="offer in offers" :key="offer.id">
            <h2 class="text-info">{{ offer.band.name }}</h2>
            <h3>{{ offer.body }}</h3>
          </div>
          <h1>My recieved offers</h1>
          <div class="col-8" v-for="b in myBands" :key="b.id">
            <Offer :band="b" />
          </div>
          <div class="col-8" v-for="v in myVenues" :key="v.id">
            <VenueReceived :venue="v" />
          </div>
          <h1>Messages from Accepted Offers</h1>
          <span v-for="a in acceptedOffers" :key="a.id">
            <Accepted :acceptedOffer="a" />
          </span>
        </div>
      </template>
    </OffCanvas>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { bandsService } from "../services/BandsService";
import { venuesService } from "../services/VenuesService";
import { offersService } from "../services/OffersService";
import { profilesService } from "../services/ProfilesService";
import { useRoute, useRouter } from "vue-router";
import Pop from "../utils/Pop";
export default {
  name: "Account",
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
      } catch (error) {
        logger.error(error);
      }
    });
    watchEffect(async () => {
      try {
        await bandsService.getAll();
        await offersService.getMyOffers();
        await venuesService.getAll();
      } catch (error) {
        logger.error(error);
      }
    });
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          AppState.profile = {};
          await profilesService.getProfile(route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      myBands: computed(() =>
        AppState.bands.filter((b) => b.creatorId == AppState.profile.id)
      ),
      myVenues: computed(() =>
        AppState.venues.filter((v) => v.creatorId == AppState.profile.id)
      ),
      offers: computed(() =>
        AppState.offers.filter((v) => v.status == "pending")
      ),
      offersBand: computed(() => AppState.activeBand),
      sentBand: computed(() =>
        AppState.offers.filter((o) => o.band.creatorId !== AppState.account.id)
      ),
      rOffers: computed(() =>
        AppState.bands.filter((b) => b.creatorId == AppState.profile.id)
      ),
      acceptedOffers: computed(() => {
        const recOffer = Object.values(AppState.recievedOffers)
          .flat()
          .filter((v) => v.status == "accepted");
        const sentOffer = AppState.offers.filter((v) => v.status == "accepted");
        return [...recOffer, ...sentOffer];
      }),
      async deleteBand(id) {
        try {
          if (await Pop.confirm()) {
            await bandsService.deleteBand(id)
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteVenue(id) {
        try {
          if (await Pop.confirm()) {
            await venuesService.deleteVenue(id)
          }
        } catch (error) {
          logger.error(error)
        }
      }


    }
  }
}
</script>

<style scoped>
img {
  height: 40vh;
  width: 40vh;
}

.cropped {
  border-radius: 50%;
  height: 30vh;
  max-width: 30vh;
  border: 2px solid rgba(135, 190, 202, 1);
}
.hoverable:hover {
  transform: scale(1.03);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
  cursor: pointer;
  user-select: none;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}

h2 {
  font-weight: bold;
}
.main-font,
div {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>
