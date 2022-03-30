import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/venue/:id',
    name: 'Venue',
    component: loadPage('VenuePage'),

  },
  {
    path: '/band/:id',
    name: 'Band',
    component: loadPage('BandPage'),

  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authSettled
  },
  {
    path: '/offer/:id',
    name: 'Offer',
    component: loadPage('OfferPage'),
    beforeEnter: authSettled
  },
  {
    path: '/teemo',
    name: 'Gigs',
    component: loadPage('GigsPage'),
    // beforeEnter: authSettled
  }

]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
