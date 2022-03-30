import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  bands: [],
  venues: [],
  offers: [],
  activeBand: {},
  activeVenue: {},
  activeOffer: {},
  recievedOffers: {},
  recievedVenueOffers: {},
  myOffers: [],
  accepted: []

})
